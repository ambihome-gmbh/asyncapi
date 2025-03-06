defmodule StackDummyTest do
  use ExUnit.Case, async: false

  alias MqttAsyncapi.Message

  setup do
    # TODO -> protocol's test-helper module
    start_supervised({Registry, keys: :duplicate, name: DummyBroker.Registry})

    asyncapi = AsyncApi.load("test/schema/stack/user_schema.json")

    # TODO maybe directly give asyncapi to protocol/connect
    opts = [host: asyncapi.server.host, port: asyncapi.server.port]
    {:ok, protocol_state} = Protocol.Dummy.connect(asyncapi.subscriptions, opts)

    {
      :ok,
      state: %{
        asyncapi: asyncapi,
        protocol: protocol_state
      }
    }
  end

  test "push pop", context do
    {:ok, _} = start_supervised({Stack.StackService, []})

    MqttAsyncapi.send("push", %{"value" => 4712}, context.state)
    MqttAsyncapi.send("pop", %{}, context.state)

    assert_receive({:publish, mqtt_message})

    assert {
             :ok,
             %MqttAsyncapi.Message{
               operation_id: "pop_response",
               payload: %{"value" => 4712}
             }
           } = Message.from_mqtt_message(mqtt_message, context.state.asyncapi)
  end
end
