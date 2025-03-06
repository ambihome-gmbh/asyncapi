defmodule Asyncapi.TestHelper do
  require ExUnit.Assertions
  import Enum

  defmacro generate_tests(service, schema) do
    asyncapi = AsyncApi.load(schema)
    testcases = asyncapi.schema.schema["x-testcases"]

    quote unquote: false,
          bind_quoted: [
            service: service,
            asyncapi: Macro.escape(asyncapi),
            testcases: Macro.escape(testcases)
          ] do
      setup do
        asyncapi = unquote(Macro.escape(asyncapi))
        {:ok, protocol_state} = unquote(service).get_broker().connect(asyncapi)
        {:ok, _} = start_supervised(unquote(service))
        {:ok, state: %{asyncapi: asyncapi, protocol: protocol_state}}
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
                # Process.sleep(100)
                acc

              %{from: "service"} ->
                assert_receive({:publish, mqtt_message})

                assert {:ok, asyncapi_message} =
                         MqttAsyncapi.Message.from_mqtt_message(
                           mqtt_message,
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
end
