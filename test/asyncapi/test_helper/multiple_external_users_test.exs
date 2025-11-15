defmodule Asyncapi.TestHelper.SingleInternalTest do
  use ExUnit.Case, async: true
  require Asyncapi.TestHelper, as: TestHelper

  # AH-1842/asyncapi-tests-inside-lib-should-not-copy-code-from-examples
  defmodule Stack.Schema do
    use Asyncapi.Schema, schema_path: "multi_user_stack/__build/service.json"
  end

  defmodule Stack.ProducerUserSchema do
    use Asyncapi.Schema, schema_path: "multi_user_stack/__build/producer.json"
  end

  defmodule Stack.ConsumerUserSchema do
    use Asyncapi.Schema, schema_path: "multi_user_stack/__build/consumer.json"
  end

  # AH-1842/asyncapi-tests-inside-lib-should-not-copy-code-from-examples
  defmodule Stack do
    use MqttAsyncapi, schema_module: Stack.Schema

    alias Asyncapi.Message
    import Asyncapi.Helpers

    def start_link(opts \\ []) do
      MqttAsyncapi.start_link(__MODULE__, opts)
    end

    @impl true
    def init(_opts) do
      {:ok, %{stack: []}}
    end

    @impl true
    def handle_message(%Message{op_id: "push"} = message, state) do
      %{payload: %{"value" => value}} = message
      noreply(%{state | stack: [value | state.stack]})
    end

    @impl true
    def handle_message(%Message{op_id: "pop"}, state) do
      {value, new_stack} =
        case state.stack do
          [top | rest] -> {top, rest}
          [] -> {nil, []}
        end

      response = %Message{
        op_id: "pop_response",
        payload: %{"value" => value}
      }

      reply(response, %{state | stack: new_stack})
    end

    def handle_info(unexpected, state) do
      dbg({:unexpected, unexpected})
      noreply(state)
    end
  end

  @moduletag capture_log: true

  test "can handle multiple external users", context do
    {:ok, additional} =
      TestHelper.init(
        Stack,
        external: %{
          producer_user: Stack.ProducerUserSchema,
          consumer_user: Stack.ConsumerUserSchema
        }
      )

    full_context = Enum.into(additional, context)

    TestHelper.assert_sequence(full_context, """

    """)
  end
end
