defmodule Asyncapi.Broker.MQTT do
  def connect(asyncapi) do
    opts = [host: asyncapi.server.host, port: asyncapi.server.port]
    {:ok, mqtt_pid} = :emqtt.start_link(opts)
    {:ok, _props} = :emqtt.connect(mqtt_pid)
    Enum.each(asyncapi.subscriptions, &subscribe!(mqtt_pid, &1, 0))
    {:ok, %{pid: mqtt_pid, opts: opts, module: __MODULE__}}
  end

  def publish(protocol_state, mqtt_message) do
    # TODO mqtt_message.retain?
    :emqtt.publish(protocol_state.pid, mqtt_message.topic, mqtt_message.payload, mqtt_message.qos)
    :ok
  end

  defp subscribe!(pid, topic, qos, user_module \\ "TODO") do
    case :emqtt.subscribe(pid, {topic, qos}) do
      {:ok, _props, [reason]} when reason in [0x00, 0x01, 0x02] ->
        # Logger.debug("[#{inspect(user_module)}] subscribed: #{topic}")
        :ok

      {:ok, _props, reasons} ->
        raise("[#{inspect(user_module)}] subscribe to #{topic} failed: #{inspect(reasons)}")
    end
  end
end
