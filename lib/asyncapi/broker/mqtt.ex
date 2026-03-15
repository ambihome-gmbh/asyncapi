defmodule Asyncapi.Broker.MQTT do
  @behaviour Asyncapi.Broker

  require Logger

  def connect(asyncapi, user_module) do
    host =
      case Application.get_env(:asyncapi, :broker_host) do
        nil -> asyncapi.server.host
        override when is_binary(override) -> String.to_charlist(override)
        override when is_list(override) -> override
      end

    opts = [host: host, port: asyncapi.server.port]
    {:ok, mqtt_pid} = :emqtt.start_link(opts)
    {:ok, _props} = :emqtt.connect(mqtt_pid)
    # AH-1702/asyncapi-logging
    Logger.info("[#{inspect(user_module)}] connected to #{opts[:host]}:#{opts[:port]}")
    Enum.each(asyncapi.subscriptions, &subscribe!(mqtt_pid, &1, 0, user_module))
    {:ok, %{pid: mqtt_pid, opts: opts, module: __MODULE__}}
  end

  def publish(broker_state, mqtt_message) do
    case :emqtt.publish(broker_state.pid, mqtt_message.topic, mqtt_message.payload, mqtt_message.qos) do
      :ok -> :ok
      {:ok, _packet_id} -> :ok
      {:error, reason} -> {:error, :publish_failed, reason}
    end
  end

  defp subscribe!(pid, topic, qos, user_module) do
    case :emqtt.subscribe(pid, {topic, qos}) do
      {:ok, _props, [reason]} when reason in [0x00, 0x01, 0x02] ->
        # AH-1702/asyncapi-logging
        Logger.debug("[#{inspect(user_module)}] subscribed: #{topic}")
        :ok

      {:ok, _props, reasons} ->
        raise("[#{inspect(user_module)}] subscribe to #{topic} failed: #{inspect(reasons)}")
    end
  end
end
