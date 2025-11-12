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

  defp fetch!(map, key, error_msg) do
    case Map.fetch(map, key) do
      :error -> raise("#{error_msg}: #{inspect(key)} not in #{inspect(map)}")
      {:ok, value} -> value
    end
  end

  def start_service(service, schema, broker, opts \\ []) do
    asyncapi = schema.get_asyncapi()

    case broker do
      Asyncapi.Broker.Dummy ->
        start_supervised!(DummyBroker)

      Asyncapi.Broker.MQTT ->
        # TODO: maybe ensure broker is running!?
        :ok

      _ ->
        raise("unknown broker")
    end

    {:ok, broker_state} = broker.connect(asyncapi)
    service_opts = Keyword.get(opts, :service_opts, [])

    case start_supervised({service, service_opts}) do
      {:ok, service_pid} ->
        {:ok,
         state: %{asyncapi: asyncapi, broker: broker_state},
         service_pid: service_pid,
         service_opts: Map.new(service_opts)}

      {:error, reason} ->
        raise("Failed to start service #{inspect(service)}: #{inspect(reason)}")
    end
  end

  defmacro assert_sequence(context, sequence) do
    quote do
      require Logger

      context = unquote(context)

      # AH-1712/asyncapi-sanity-checker
      sequence =
        Asyncapi.SequenceParser.parse_multiline!(unquote(sequence), context.test)

      Logger.info("--> Running test case: #{context.test}")

      Enum.reduce(sequence, %{bindings: %{}, last_call_tag: nil}, fn step, acc ->
        Asyncapi.TestHelper.display_step(step)
        Process.sleep(1)

        # TODO bind first, in doc order. right now binds are done with matches below so cant deref a thing thats bound in the same step
        payload = Asyncapi.TestHelper.deref(step.payload, acc.bindings)
        params = Asyncapi.TestHelper.deref(step.params, acc.bindings)

        case step do
          %{from: "internal_" <> internal_key, to: "service", arrow: arrow} ->
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

            pid = Map.fetch!(context.service_opts, String.to_existing_atom(internal_key))

            assert nil == Internal.next(pid)

            if arrow == :async do
              Internal.send(pid, :async, context.service_pid, internal_message)
            else
              Internal.send(
                pid,
                :sync,
                {context.service_pid, acc.last_call_tag},
                internal_message
              )
            end

            %{acc | last_call_tag: nil}

          %{from: "service", to: "internal_" <> internal_key, arrow: arrow} ->
            assert step.params == %{}, "params not allowed for intenal messages"

            pid = Map.fetch!(context.service_opts, String.to_existing_atom(internal_key))

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

          %{to: "service", arrow: :async} ->
            Asyncapi.TestHelper.assert_no_unexpected_messages()

            assert Asyncapi.TestHelper.all_deref?(payload),
                   "Payload not fully dereferenced: #{inspect(payload)}"

            assert Asyncapi.TestHelper.all_deref?(params),
                   "Params not fully dereferenced: #{inspect(params)}"

            MqttAsyncapi.publish_(
              %Asyncapi.Message{op_id: step.operation, payload: payload, params: params},
              context.state
            )

            acc

          %{from: "service", arrow: :async} ->
            assert_receive({:publish, mqtt_message})

            assert {:ok, asyncapi_message} =
                     Asyncapi.Message.from_mqtt_message(
                       Asyncapi.Message.decode_mqtt_message(mqtt_message),
                       context.state.asyncapi
                     )

            if step.operation != asyncapi_message.op_id do
              dbg(asyncapi_message)
              assert step.operation == asyncapi_message.op_id
            end

            acc
            |> Asyncapi.TestHelper.match(asyncapi_message.params, params)
            |> Asyncapi.TestHelper.match(asyncapi_message.payload, payload)

          _ ->
            raise("Unsupported step: #{inspect(step)} -- sync when only async supported??")
        end
      end)

      Process.sleep(1)
      Asyncapi.TestHelper.assert_no_unexpected_messages()

      for {_key, pid} <- context.service_opts do
        assert nil == Internal.next(pid)
      end
    end
  end

  def assert_no_unexpected_messages() do
    assert {:messages, []} == :erlang.process_info(self(), :messages)
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
      case type do
        :reference ->
          {key, fetch!(bindings, value, "todo_err_msg_wrap_fetch_binding")}

        :binding ->
          {key, {type, value}}

        :list ->
          # AH-1728/asyncapi-deref-in-lists
          {key, map(value, fn {:literal, v} -> v end)}

        :map ->
          {key, deref(value, bindings)}

        _ ->
          {key, value}
      end
    end)
  end

  case Application.compile_env(:asyncapi, :broker) do
    nil ->
      raise("env(:asyncapi, :broker) not configured")

    Asyncapi.Broker.Dummy ->
      def start_broker, do: start_supervised!(DummyBroker)

    Asyncapi.Broker.MQTT ->
      # NOTE: ensure broker is running!
      def start_broker, do: nil
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
