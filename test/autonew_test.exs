defmodule AutoNewTest do
  use ExUnit.Case
  import Enum

  alias MqttAsyncapi.Message

  # TODO -> protocol's test-helper module
  # def start_broker(), do: {"nanomq\n", 0} = System.cmd("docker", ["start", "nanomq"])
  # def stop_broker(), do: System.cmd("docker", ["stop", "nanomq"])

  @asyncapi AsyncApi.load("test/schema/complex/user_schema.json")
  @testcases @asyncapi.schema.schema["x-testcases"]

  setup do
    # TODO -> protocol's test-helper module
    # start_broker()
    # on_exit(&stop_broker/0)

    # TODO -> protocol's test-helper module
    start_supervised({Registry, keys: :duplicate, name: DummyBroker.Registry})

    service_module = Module.concat(@asyncapi.schema.schema["info"]["x-service-module"])
    opts = [host: @asyncapi.server.host, port: @asyncapi.server.port]
    {:ok, protocol_state} = Protocol.Dummy.connect(@asyncapi.subscriptions, opts)
    {:ok, _} = start_supervised({service_module, []})

    {
      :ok,
      state: %{
        asyncapi: @asyncapi,
        protocol: protocol_state
      }
    }
  end

  for testcase <- @testcases do
    parsed_sequence =
      testcase["sequence"]
      |> map(&Asyncapi.Parser.step/1)
      |> map(&Asyncapi.Parser.resolve_step/1)

    @tag :auto
    test testcase["name"], context do
      sequence = unquote(Macro.escape(parsed_sequence))

      reduce(sequence, %{}, fn step, acc ->
        {payload, acc} = deref(step.payload, acc)
        {parameters, acc} = deref(step.parameters, acc)

        case step do
          %{to: "service"} ->
            MqttAsyncapi.sendp(step.operation, payload, parameters, context.state)
            # Process.sleep(100)
            acc

          %{from: "service"} ->
            assert_receive({:publish, mqtt_message})

            assert {:ok, asyncapi_message} =
                     Message.from_mqtt_message(mqtt_message, context.state.asyncapi)

            acc
            |> match(asyncapi_message.parameters, parameters)
            |> match(asyncapi_message.payload, payload)
        end
      end)
    end
  end

  defp match(bindings, received, step) do
    reduce(step, bindings, fn {k, v}, acc ->
      case v do
        {:binding, binding_name} ->
          assert Map.has_key?(received, k), "Binding not found: #{k} --> #{binding_name}"
          Map.put(acc, binding_name, Map.fetch!(received, k))

        _ ->
          assert v == Map.fetch!(received, k)

          acc
      end
    end)
  end

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
end
