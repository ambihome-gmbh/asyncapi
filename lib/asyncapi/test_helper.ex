defmodule Asyncapi.TestHelper do
  use ExUnit.Case
  import Enum
  require Logger

  defp fetch!(map, key, error_msg) do
    case Map.fetch(map, key) do
      :error -> raise("#{error_msg}: #{inspect(key)} not in #{inspect(map)}")
      {:ok, value} -> value
    end
  end

  defmacro generate_tests(service_, schema_module_, opts_) do
    schema_module = Macro.expand(schema_module_, __CALLER__)

    if not Code.ensure_loaded?(schema_module) do
      raise("schema module #{inspect(schema_module)} not loaded.")
    end

    opts = Macro.expand(opts_, __CALLER__)
    # testcases_ast = Keyword.fetch!(opts, :testcases)
    # testcases_expanded = Macro.prewalk(testcases_, &Macro.expand(&1, __CALLER__))
    # testcases_expanded = Macro.prewalk(testcases_ast, fn node ->
    #   Macro.expand(node, __CALLER__)
    # end)
    # dbg(__CALLER__, limit: :infinity)
    # {testcases, _} = Code.eval_quoted(testcases_ast, [], __CALLER__)

    testcases =
      case Keyword.fetch(opts, :testcases_module) do
        {:ok, mod_ast} ->
          testcases_module = Macro.expand(mod_ast, __CALLER__)

          Code.ensure_loaded?(testcases_module) ||
            raise "module #{inspect(testcases_module)} not loaded"

          testcases_module.all()

        :error ->
          raise("testcases module missing")
      end

    testcases_parsed =
      Enum.map(testcases, fn %{name: name, sequence: seq} ->
        %{name: name, sequence: Asyncapi.SequenceParser.parse_multiline!(seq, name)}
      end)

    tests =
      for %{name: name, sequence: seq} <- testcases_parsed do
        quote do
          test unquote(name), context do
            sequence = unquote(Macro.escape(seq))

            Logger.info("--> Running test case: #{unquote(name)}")

            Enum.reduce(sequence, %{bindings: %{}, last_call_tag: nil}, fn step, acc ->
              Asyncapi.TestHelper.display_step(step)
              Process.sleep(1)

              # TODO bind first, in doc order. right now binds are done with matches below so cant deref a thing thats bound in the same step
              payload = Asyncapi.TestHelper.deref(step.payload, acc.bindings)
              params = Asyncapi.TestHelper.deref(step.params, acc.bindings)

              case step do
                %{from: "internal", to: "service", arrow: arrow} ->
                  Asyncapi.TestHelper.check_for_unexpected_messages()
                  assert step.params == %{}, "params not allowed for intenal messages"

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

                  if arrow == :async do
                    send(context.service_pid, internal_message)
                  else
                    GenServer.reply({context.service_pid, acc.last_call_tag}, internal_message)
                  end

                  %{acc | last_call_tag: nil}

                %{from: "service", to: "internal", arrow: arrow} ->
                  assert step.params == %{}, "params not allowed for intenal messages"

                  {internal_message, call_tag} =
                    if arrow == :async do
                      assert_receive({:"$gen_cast", internal_message})
                      {internal_message, nil}
                    else
                      service_pid = context.service_pid
                      assert_receive({:"$gen_call", {^service_pid, tag}, internal_message})
                      {internal_message, tag}
                    end

                  {internal_message_tag, internal_message_payload} =
                    case internal_message do
                      {operation, payload} -> {operation, payload}
                      operation -> {operation, %{}}
                    end

                  assert step.operation == "#{internal_message_tag}"

                  acc
                  |> Map.put(:last_call_tag, call_tag)
                  |> Asyncapi.TestHelper.match(internal_message_payload, payload)

                %{to: "service", arrow: :async} ->
                  Asyncapi.TestHelper.check_for_unexpected_messages()

                  assert Asyncapi.TestHelper.all_deref?(payload),
                         "Payload not fully dereferenced: #{inspect(payload)}"

                  assert Asyncapi.TestHelper.all_deref?(params),
                         "Params not fully dereferenced: #{inspect(params)}"

                  MqttAsyncapi.sendp(step.operation, payload, params, context.state)

                  acc

                %{from: "service", arrow: :async} ->
                  assert_receive({:publish, mqtt_message})

                  assert {:ok, asyncapi_message} =
                           Asyncapi.Message.from_mqtt_message(
                             Asyncapi.Message.decode_mqtt_message(mqtt_message),
                             context.state.asyncapi
                           )

                  assert step.operation == asyncapi_message.op_id

                  acc
                  |> Asyncapi.TestHelper.match(asyncapi_message.params, params)
                  |> Asyncapi.TestHelper.match(asyncapi_message.payload, payload)

                _ ->
                  raise("Unsupported step: #{inspect(step)} -- sync when only async supported??")
              end
            end)

            Process.sleep(1)
            assert {:messages, []} == :erlang.process_info(self(), :messages)
          end
        end
      end

    quote location: :keep do
      require Logger

      setup do
        service = unquote(service_)
        asyncapi = unquote(schema_module).get_asyncapi()

        opts = unquote(opts_)
        broker = Keyword.fetch!(opts, :broker)
        service_args = Keyword.get(opts, :service_args, [])

        {:ok, broker_state} = broker.connect(asyncapi)

        case start_supervised({service, service_args}) do
          {:ok, service_pid} ->
            {:ok, state: %{asyncapi: asyncapi, broker: broker_state}, service_pid: service_pid}

          {:error, reason} ->
            raise("Failed to start service #{inspect(service)}: #{inspect(reason)}")
        end
      end

      unquote_splicing(tests)
    end
  end

  @compile {:no_warn_undefined, ExUnit.Assertions}

  def check_for_unexpected_messages() do
    case :erlang.process_info(self(), :messages) do
      {:messages, []} -> nil
      {:messages, messages} -> dbg({:unexpected_messages_todo, messages})
    end
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
    ExUnit.Assertions.assert(received == :erlang.list_to_binary(bytearray))
    acc
  end

  def match(acc, received, step) do
    bindings = acc.bindings

    new_bindings =
      reduce(step, bindings, fn {k, v}, acc ->
        case v do
          {:binding, binding_name} ->
            ExUnit.Assertions.assert(
              Map.has_key?(received, k),
              "Binding not found: #{inspect(k)} in #{inspect(received)} --> #{inspect(binding_name)}"
            )

            Map.put(acc, binding_name, fetch!(received, k, "todo_err_msg_wrap_fetch_put_binding"))

          _ ->
            ExUnit.Assertions.assert(
              v == fetch!(received, k, "key [#{k}]not found [#{inspect(received)}]")
            )

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
          # TODO why no deref here?
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
