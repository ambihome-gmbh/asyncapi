defmodule Asyncapi.TestHelper do
  use ExUnit.Case
  import ExUnit.Assertions
  import Enum
  require Logger

  defmodule Internal do
    use GenServer

    def start_link(init_arg) do
      GenServer.start_link(__MODULE__, init_arg)
    end

    def next(server) do
      GenServer.call(server, {__MODULE__, :next}, :infinity)
    end

    def send(server, type, target, message) do
      GenServer.call(server, {__MODULE__, :send, type, target, message}, :infinity)
    end

    @impl true
    def init(_) do
      {:ok, :queue.new()}
    end

    @impl true
    def handle_call({__MODULE__, :next}, _from, state) do
      {reply, state} =
        case :queue.out(state) do
          {:empty, queue} -> {nil, queue}
          {{:value, item}, queue} -> {item, queue}
        end

      {:reply, reply, state}
    end

    def handle_call({__MODULE__, :send, type, target, message}, _from, state) do
      case type do
        :async -> send(target, message)
        :sync -> GenServer.reply(target, message)
      end

      {:reply, :ok, state}
    end

    def handle_call(msg, from, state) do
      {:noreply, :queue.in({:call, from, msg}, state)}
    end

    @impl true
    def handle_cast(msg, state) do
      {:noreply, :queue.in({:cast, msg}, state)}
    end
  end

  defmodule External do
    use GenServer

    def start_link(opts) do
      GenServer.start_link(__MODULE__, opts)
    end

    def next(server) do
      GenServer.call(server, {__MODULE__, :next}, :infinity)
    end

    def publish(server, message) do
      GenServer.call(server, {__MODULE__, :publish, message}, :infinity)
    end

    @impl true
    def init(opts) do
      broker = Keyword.fetch!(opts, :broker)
      asyncapi = Keyword.fetch!(opts, :asyncapi)
      {:ok, broker_state} = broker.connect(asyncapi)
      {:ok, %{broker: broker_state, asyncapi: asyncapi, queue: :queue.new()}}
    end

    @impl true
    def handle_call({__MODULE__, :next}, _from, state) do
      {reply, queue} =
        case :queue.out(state.queue) do
          {:empty, queue} -> {nil, queue}
          {{:value, item}, queue} -> {item, queue}
        end

      {:reply, reply, %{state | queue: queue}}
    end

    @impl true
    def handle_call({__MODULE__, :publish, message}, _from, state) do
      reply = MqttAsyncapi.publish_(message, state)
      {:reply, reply, state}
    end

    @impl true
    def handle_info({:publish, mqtt_message}, state) do
      {:noreply, %{state | queue: :queue.in({:mqtt_message, mqtt_message}, state.queue)}}
    end

    @impl true
    def handle_info(unexpected_message, state) do
      {:noreply, %{state | queue: :queue.in({:unexpected_message, unexpected_message}, state.queue)}}
    end
  end

  defp fetch!(map, key, error_msg) do
    case Map.fetch(map, key) do
      :error -> raise("#{error_msg}: #{inspect(key)} not in #{inspect(map)}")
      {:ok, value} -> value
    end
  end

  def init(service, opts \\ []) do
    service_opts = Keyword.get(opts, :service_opts, [])
    internal_pids = Keyword.get(opts, :internal_pids, %{})
    external_schemas = Keyword.get(opts, :external_schemas, %{})

    # @BM TODO warum uebergeben wir broker explizit (siehe unten alte start_service fn)?
    # Das funktioniert sowieso nur wenn der broker genutzt wird der in env konfiguriert ist, oder?
    broker =
      case Application.get_env(:asyncapi, :broker) do
        nil ->
          raise("env(:asyncapi, :broker) not configured")

        Asyncapi.Broker.Dummy ->
          start_supervised!(DummyBroker)
          Asyncapi.Broker.Dummy

        Asyncapi.Broker.MQTT ->
          # TODO ensure broker is running!
          Asyncapi.Broker.MQTT

        unexpected ->
          raise("unknown broker: #{inspect(unexpected)}")
      end

    external_asyncapis = for {k, s} <- external_schemas, into: %{}, do: {k, s.get_asyncapi()}

    external_pids =
      for {external_key, asyncapi} <- external_asyncapis, into: %{} do
        {:ok, pid} = Asyncapi.TestHelper.External.start_link(asyncapi: asyncapi, broker: broker)
        {external_key, pid}
      end

    case start_supervised({service, service_opts}) do
      {:ok, service_pid} ->
        {
          :ok,
          service_pid: service_pid,
          internal_pids: internal_pids,
          external_pids: external_pids,
          external_asyncapis: external_asyncapis
        }

      {:error, reason} ->
        raise("Failed to start service #{inspect(service)}: #{inspect(reason)}")
    end
  end

  defmacro assert_sequence(context, sequence) do
    quote do
      require Logger

      context = unquote(context)

      # AH-1712/asyncapi-sanity-checker
      sequence = Asyncapi.SequenceParser.parse_multiline!(unquote(sequence), context.test)

      resolve = fn name, pids, type, step_index ->
        case pids[name] do
          nil -> raise("step #{step_index}: unknown actor: #{type}_#{name}")
          pid -> {type, name, pid}
        end
      end

      sequence =
        for {step, step_index} <- with_index(sequence, 1) do
          dir_resolved =
            for {dir, actor} <- [from_: step.from, to_: step.to], into: %{} do
              resolved =
                case actor do
                  "service" -> :service
                  "internal_" <> name -> resolve.(name, context.internal_pids, :internal, step_index)
                  "external_" <> name -> resolve.(name, context.external_pids, :external, step_index)
                end

              {dir, resolved}
            end

          Map.merge(step, dir_resolved)
        end

      Logger.info("--> Running test case: #{context.test}")

      Enum.reduce(sequence, %{bindings: %{}, last_call_tag: nil}, fn step, acc ->
        Asyncapi.TestHelper.display_step(step)
        Process.sleep(1)

        # TODO bind first, in doc order. right now binds are done with matches below so cant deref a thing thats bound in the same step
        payload = Asyncapi.TestHelper.deref(step.payload, acc.bindings)
        params = Asyncapi.TestHelper.deref(step.params, acc.bindings)

        case step do
          %{from_: {:internal, _name, pid}, to_: :service, arrow: arrow} ->
            assert step.params == %{}, "params not allowed for internal messages"

            internal_message_tag = String.to_atom(step.operation)

            internal_message =
              case payload do
                %{"__bytearray__" => bytearray} ->
                  {internal_message_tag, :erlang.list_to_binary(bytearray)}

                %{} = payload when map_size(payload) == 0 ->
                  internal_message_tag

                _ ->
                  {internal_message_tag, payload}
              end

            assert nil == Internal.next(pid)

            if arrow == :async do
              Internal.send(pid, :async, context.service_pid, internal_message)
            else
              Internal.send(pid, :sync, {context.service_pid, acc.last_call_tag}, internal_message)
            end

            %{acc | last_call_tag: nil}

          %{from_: :service, to_: {:internal, _name, pid}, arrow: arrow} ->
            assert step.params == %{}, "params not allowed for intenal messages"

            msg = Internal.next(pid)

            {internal_message, call_tag} =
              if arrow == :async do
                assert {:cast, internal_message} = msg
                {internal_message, nil}
              else
                service_pid = context.service_pid
                assert {:call, {^service_pid, tag}, internal_message} = msg
                {internal_message, tag}
              end

            {internal_message_tag, internal_message_payload} =
              case internal_message do
                {operation, payload} -> {operation, payload}
                operation -> {operation, %{}}
              end

            assert is_atom(internal_message_tag),
                   "internal_message_tag not an atom: #{inspect(internal_message_tag)}"

            assert step.operation == "#{internal_message_tag}"

            acc
            |> Map.put(:last_call_tag, call_tag)
            |> Asyncapi.TestHelper.match(internal_message_payload, payload)

          %{from_: {:external, _name, pid}, to_: service, arrow: :async} ->
            Asyncapi.TestHelper.assert_no_unexpected_messages(context)

            # AH-1695/asyncapi-create-tests-for-asyncapi-lib
            assert Asyncapi.TestHelper.all_deref?(payload),
                   "Payload not fully dereferenced: #{inspect(payload)}"

            # AH-1695/asyncapi-create-tests-for-asyncapi-lib
            assert Asyncapi.TestHelper.all_deref?(params),
                   "Params not fully dereferenced: #{inspect(params)}"

            message = %Asyncapi.Message{op_id: step.operation, payload: payload, params: params}
            # AH-1695/asyncapi-create-tests-for-asyncapi-lib
            assert :ok = External.publish(pid, message)

            acc

          # AH-1861/asyncapi-multiple-external-receivers-for-one-message
          %{from_: :service, to_: {:external, name, pid}, arrow: :async} ->
            assert {:mqtt_message, mqtt_message} = External.next(pid)

            # AH-1695/asyncapi-create-tests-for-asyncapi-lib - to make this assertion fail we need to have service
            # send a valid message with different op_id than expected in the sequence (schemas do not match)
            assert {:ok, asyncapi_message} =
                     Asyncapi.Message.from_mqtt_message(
                       Asyncapi.Message.decode_mqtt_message(mqtt_message),
                       context.external_asyncapis[name]
                     )

            if step.operation != asyncapi_message.op_id do
              dbg(asyncapi_message)
              assert step.operation == asyncapi_message.op_id
            end

            acc
            |> Asyncapi.TestHelper.match(asyncapi_message.params, params)
            |> Asyncapi.TestHelper.match(asyncapi_message.payload, payload)

          %{from_: {:external, _}, to_: :service, arrow: :sync} ->
            raise("Unsupported step: #{inspect(step)} -- external sync")

          %{from_: :service, to_: {:external, _}, arrow: :sync} ->
            raise("Unsupported step: #{inspect(step)} -- external sync")

          _ ->
            raise("Unsupported step: #{inspect(step)}")
        end
      end)

      Asyncapi.TestHelper.assert_no_unexpected_messages(context)
    end
  end

  def assert_no_unexpected_messages(context) do
    Process.sleep(1)

    for {_key, pid} <- context.internal_pids, do: assert(nil == Internal.next(pid))
    for {_key, pid} <- context.external_pids, do: assert(nil == External.next(pid))
  end

  def display_step(step) do
    # TODO payload/params not yet deferenced, therefore cant really be displayed
    # "#{step.from}->#{step.to}: #{step.operation}[#{inspect(step.params)}]/#{inspect(step.payload)}"
    Logger.info("#{step.from}->#{step.to}: #{step.operation}")
  end

  def all_deref?(map_) do
    Enum.all?(
      map_,
      fn
        {_, {_, _}} -> false
        {_, _} -> true
      end
    )
  end

  @doc false
  def match(acc, received, %{"__bytearray__" => bytearray} = _step) do
    assert received == :erlang.list_to_binary(bytearray)
    acc
  end

  def match(acc, received, step) do
    bindings = acc.bindings

    new_bindings =
      reduce(step, bindings, fn {k, v}, acc ->
        case v do
          {:binding, binding_name} ->
            assert Map.has_key?(received, k),
                   "Binding not found: #{inspect(k)} in #{inspect(received)} --> #{inspect(binding_name)}"

            Map.put(acc, binding_name, fetch!(received, k, "todo_err_msg_wrap_fetch_put_binding"))

          _ ->
            assert v == fetch!(received, k, "key [#{k}]not found [#{inspect(received)}]")

            acc
        end
      end)

    %{acc | bindings: new_bindings}
  end

  @doc false

  def deref({:literal, value}, _bindings) do
    value
  end

  def deref(map_, bindings) do
    Map.new(map_, fn {key, {type, value}} ->
      # AH-1728/asyncapi-deref-in-lists
      case type do
        :reference -> {key, fetch!(bindings, value, "todo_err_msg_wrap_fetch_binding")}
        :binding -> {key, {type, value}}
        :list -> {key, map(value, fn {:literal, v} -> v end)}
        :map -> {key, deref(value, bindings)}
        _ -> {key, value}
      end
    end)
  end
end

defmodule DummyBroker do
  import Enum

  def child_spec(init_arg) do
    %{
      id: __MODULE__,
      start: {__MODULE__, :start_link, [init_arg]}
    }
  end

  def start_link() do
    Registry.start_link(keys: :duplicate, name: DummyBroker.Registry)
  end

  def start_link(_) do
    start_link()
  end

  def subscribe(topic) do
    Registry.register(DummyBroker.Registry, topic_to_tuple(topic), nil)
  end

  def publish(topic, payload) do
    recipients = Registry.select(DummyBroker.Registry, build_match_spec(topic))

    recipients
    |> uniq
    |> each(&send(&1, {:publish, %{topic: topic, payload: payload}}))
  end

  @pid_var_id 1
  defp build_match_spec(topic) do
    topic_segments = String.split(topic, "/")
    arity = length(topic_segments)

    head =
      {
        (@pid_var_id + 1)..(arity + @pid_var_id) |> map(&var/1) |> List.to_tuple(),
        var(@pid_var_id),
        :_
      }

    guards =
      for {seg, i} <- with_index(topic_segments, @pid_var_id + 1) do
        {:orelse, {:==, var(i), seg}, {:==, var(i), :any}}
      end

    [{head, guards, [var(@pid_var_id)]}]
  end

  defp topic_to_tuple(topic) do
    topic
    |> String.split("/")
    |> map(fn
      "+" -> :any
      seg -> seg
    end)
    |> List.to_tuple()
  end

  defp var(i), do: String.to_atom("$#{i}")
end
