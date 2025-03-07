defmodule Asyncapi.TestHelper do
  # require ExUnit.Assertions
  use ExUnit.Case
  import Enum

  defmacro generate_tests(service, schema) do
    asyncapi = Asyncapi.load(schema)
    testcases = asyncapi.schema.schema["x-testcases"]

    quote unquote: false,
          bind_quoted: [
            service: service,
            asyncapi: Macro.escape(asyncapi),
            testcases: Macro.escape(testcases)
          ] do
      setup do
        asyncapi = unquote(Macro.escape(asyncapi))
        {:ok, broker_state} = unquote(service).get_broker().connect(asyncapi)
        {:ok, _} = start_supervised(unquote(service))
        {:ok, state: %{asyncapi: asyncapi, broker: broker_state}}
      end

      for testcase <- testcases do
        parsed_sequence = Enum.map(testcase["sequence"], &Asyncapi.Parser.parse_step/1)

        @tag :auto
        test testcase["name"], context do
          sequence = unquote(Macro.escape(parsed_sequence))

          Enum.reduce(sequence, %{}, fn step, acc ->
            {payload, acc} = Asyncapi.TestHelper.deref(step.payload, acc)
            {parameters, acc} = Asyncapi.TestHelper.deref(step.parameters, acc)

            case step do
              %{to: "service"} ->
                MqttAsyncapi.sendp(step.operation, payload, parameters, context.state)
                # TODO sleep wenn richtiger broker genutzt!?
                acc

              %{from: "service"} ->
                assert_receive({:publish, mqtt_message})

                assert {:ok, asyncapi_message} =
                         Asyncapi.Message.from_mqtt_message(
                           Asyncapi.Message.decode_mqtt_message(mqtt_message),
                           context.state.asyncapi
                         )

                acc
                |> Asyncapi.TestHelper.match(asyncapi_message.parameters, parameters)
                |> Asyncapi.TestHelper.match(asyncapi_message.payload, payload)
            end
          end)
        end
      end
    end
  end

  @compile {:no_warn_undefined, ExUnit.Assertions}

  @doc false
  def match(bindings, received, step) do
    reduce(step, bindings, fn {k, v}, acc ->
      case v do
        {:binding, binding_name} ->
          ExUnit.Assertions.assert(
            Map.has_key?(received, k),
            "Binding not found: #{k} --> #{binding_name}"
          )

          Map.put(acc, binding_name, Map.fetch!(received, k))

        _ ->
          ExUnit.Assertions.assert(v == Map.fetch!(received, k))

          acc
      end
    end)
  end

  @doc false
  def deref(map_, bindings) do
    {map_, bindings} =
      map_reduce(map_, bindings, fn {key, {type, value}}, acc ->
        case type do
          :reference -> {{key, Map.fetch!(bindings, value)}, acc}
          :binding -> {{key, {type, value}}, acc}
          _ -> {{key, value}, acc}
        end
      end)

    {Map.new(map_), bindings}
  end

  case Application.compile_env(:asyncapi, :broker) do
    Asyncapi.Broker.Dummy ->
      def start_broker, do: start_supervised!(DummyBroker)

    Asyncapi.Broker.MQTT ->
      def start_broker do
        do_start_broker()
        on_exit(&do_stop_broker/0)
      end

      defp do_start_broker(), do: {"nanomq\n", 0} = System.cmd("docker", ["start", "nanomq"])
      defp do_stop_broker(), do: System.cmd("docker", ["stop", "nanomq"])
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
