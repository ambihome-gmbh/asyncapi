defmodule Stack2Test do
  use ExUnit.Case

  alias Asyncapi.Message

  setup do
    TestHelper.start_broker()

    asyncapi = Asyncapi.load("test/schema/stack/user_schema.json")
    {:ok, broker_state} = Stack.StackService.get_broker().connect(asyncapi)
    {:ok, _} = start_supervised({Stack.StackService, []})

    {
      :ok,
      state: %{
        asyncapi: asyncapi,
        broker: broker_state
      }
    }
  end

  @tag :stack
  test "push pop", context do
    MqttAsyncapi.send("push", %{"value" => 4712}, context.state)
    MqttAsyncapi.send("pop", %{}, context.state)

    :timer.sleep(100)

    assert_receive({:publish, mqtt_message})

    assert {
             :ok,
             %Asyncapi.Message{
               operation_id: "pop_response",
               payload: %{"value" => 4712}
             }
           } = Message.from_mqtt_message(mqtt_message, context.state.asyncapi)
  end

  test "pop from empty", context do
    MqttAsyncapi.send("pop", %{}, context.state)

    :timer.sleep(100)

    assert_receive({:publish, mqtt_message})

    assert {
             :ok,
             %Asyncapi.Message{
               operation_id: "pop_response",
               payload: %{"value" => nil}
             }
           } = Message.from_mqtt_message(mqtt_message, context.state.asyncapi)
  end

  test "attempt to push non-integer", context do
    assert assert_raise RuntimeError, ~r/{:error, \[\{"Type mismatch\./, fn ->
             MqttAsyncapi.send("push", %{"value" => nil}, context.state)
           end
  end
end
