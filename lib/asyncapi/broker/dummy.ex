defmodule Asyncapi.Broker.Dummy do
  @moduledoc false
  @behaviour Asyncapi.Broker
  def connect(asyncapi, _name) do
    # AH-1702/asyncapi-logging
    # info = Map.get(asyncapi.schema.schema, "info")
    # dbg({:connecting, info, asyncapi.subscriptions})
    Enum.each(asyncapi.subscriptions, &DummyBroker.subscribe(&1))
    {:ok, %{module: __MODULE__}}
  end

  def publish(_protocol_state, mqtt_message) do
    DummyBroker.publish(mqtt_message.topic, mqtt_message.payload)
    :ok
  end

  def subscribe_all(_broker_state, _asyncapi, _user_module), do: :ok
end
