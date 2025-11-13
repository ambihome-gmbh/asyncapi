
defmodule Asyncapi.Broker.Dummy do
  @behaviour Asyncapi.Broker
  def connect(asyncapi) do
    # dbg(asyncapi.subscriptions)
    Enum.each(asyncapi.subscriptions, &DummyBroker.subscribe(&1))
    {:ok, %{module: __MODULE__}}
  end

  def publish(_protocol_state, mqtt_message) do
    DummyBroker.publish(mqtt_message.topic, mqtt_message.payload)
    :ok
  end
end
