defmodule Stack2Test do
  use ExUnit.Case

  alias MqttAsyncapi.Message

  def start_broker(), do: {"nanomq\n", 0} = System.cmd("docker", ["start", "nanomq"])
  def stop_broker(), do: System.cmd("docker", ["stop", "nanomq"])

  setup do
    start_broker()
    on_exit(&stop_broker/0)

    asyncapi = AsyncApi.load("test/schema/stack/user_schema.json")
    opts = [host: asyncapi.server.host, port: asyncapi.server.port]
    {:ok, mqtt_pid} = MqttAsyncapi.mqtt_connect(asyncapi.subscriptions, opts)

    {
      :ok,
      state: %{
        asyncapi: asyncapi,
        mqtt: %{pid: mqtt_pid, opts: opts}
      }
    }
  end

  test "push pop", context do
    {:ok, _} = start_supervised({Stack.StackService, []})

    MqttAsyncapi.send("push", %{"value" => 4712}, context.state)
    MqttAsyncapi.send("pop", %{}, context.state)

    :timer.sleep(100)

    assert_receive({:publish, mqtt_message})

    assert {
             :ok,
             %MqttAsyncapi.Message{
               operation_id: "pop_response",
               payload: %{"value" => 4712}
             }
           } = Message.from_mqtt_message(mqtt_message, context.state.asyncapi)
  end

  test "pop from empty", context do
    {:ok, _} = start_supervised({Stack.StackService, []})

    MqttAsyncapi.send("pop", %{}, context.state)

    :timer.sleep(100)

    assert_receive({:publish, mqtt_message})

    assert {
             :ok,
             %MqttAsyncapi.Message{
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
