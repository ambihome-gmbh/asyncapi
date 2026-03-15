defmodule Asyncapi.Broker.MQTT do
  @moduledoc "MQTT broker implementation using emqtt, with auto-reconnect."
  @behaviour Asyncapi.Broker

  require Logger

  def connect(asyncapi, user_module) do
    host =
      case Application.get_env(:asyncapi, :broker_host) do
        nil -> asyncapi.server.host
        override when is_binary(override) -> String.to_charlist(override)
        override when is_list(override) -> override
      end

    opts = [
      host: host,
      port: asyncapi.server.port,
      reconnect: :infinity,
      reconnect_timeout: 5
    ]

    # emqtt is linked via start_link. If connect fails, emqtt stops and
    # sends an EXIT that would kill us before we can return {:error, reason}.
    # Trap exits temporarily so we can handle the failure gracefully.
    Process.flag(:trap_exit, true)
    {:ok, mqtt_pid} = :emqtt.start_link(opts)

    case :emqtt.connect(mqtt_pid) do
      {:ok, _props} ->
        Process.flag(:trap_exit, false)
        broker_state = %{pid: mqtt_pid, opts: opts, module: __MODULE__}
        Logger.info("[#{inspect(user_module)}] connected to #{opts[:host]}:#{opts[:port]}")
        subscribe_all(broker_state, asyncapi, user_module)
        {:ok, broker_state}

      {:error, reason} ->
        # Flush the EXIT message from the dead emqtt process
        receive do
          {:EXIT, ^mqtt_pid, _} -> :ok
        after
          0 -> :ok
        end

        Process.flag(:trap_exit, false)
        Logger.error("[#{inspect(user_module)}] could not connect to #{opts[:host]}:#{opts[:port]}: #{inspect(reason)}")
        exit({:shutdown, reason})
    end
  end

  def publish(broker_state, mqtt_message) do
    case :emqtt.publish(broker_state.pid, mqtt_message.topic, mqtt_message.payload, mqtt_message.qos) do
      :ok -> :ok
      {:ok, _packet_id} -> :ok
      {:error, reason} -> {:error, :publish_failed, reason}
    end
  end

  def subscribe_all(broker_state, asyncapi, user_module) do
    Logger.info("[#{inspect(user_module)}] subscribing to #{length(asyncapi.subscriptions)} topics")
    Enum.each(asyncapi.subscriptions, &subscribe!(broker_state.pid, &1, 0, user_module))
    :ok
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
