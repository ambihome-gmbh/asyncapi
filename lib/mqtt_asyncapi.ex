defmodule MqttAsyncapi do
  import Enum
  alias MqttAsyncapi.Message

  @callback init(opts :: term) ::
              state :: term
  @callback handle_message(Message.t(), state :: term) ::
              {:noreply, state :: term} | {:reply, [reply_message :: Message.t()], state :: term}
  @callback handle_info(term, state :: term) ::
              {:noreply, state :: term} | {:reply, [reply_message :: Message.t()], state :: term}

  use GenServer

  require Logger

  def start_link(opts) do
    GenServer.start_link(__MODULE__, opts, name: __MODULE__)
  end

  # def publish(msg, topic, qos), do: GenServer.cast(__MODULE__, {:publish, msg, topic, qos})
  # def subscribe(topic, qos), do: GenServer.cast(__MODULE__, {:subscribe, topic, qos})
  # def unsubscribe(topic), do: GenServer.cast(__MODULE__, {:unsubscribe, topic})
  # def disconnect, do: GenServer.cast(__MODULE__, :disconnect)

  @impl GenServer
  def init(opts) do
    Logger.debug("[MqttAsyncapi] connecting to #{opts[:host]}:#{opts[:port]}")

    {user_module, opts} = Keyword.pop(opts, :user_module)
    {asyncapi_schema_path, opts} = Keyword.pop(opts, :asyncapi_schema_path)
    {asyncapi_role, opts} = Keyword.pop(opts, :asyncapi_role)

    {:ok, pid} = :emqtt.start_link(opts)
    {:ok, _props} = :emqtt.connect(pid)

    Logger.debug("[MqttAsyncapi] connected")

    {:ok, user_state} = user_module.init(opts)

    schema = AsyncApi.load(asyncapi_schema_path)
    channel_regexs = AsyncApi.get_channel_regexs(schema.schema["channels"])
    # TODO asyncapi_role for direction
    message_names_to_channel = AsyncApi.get_message_names_to_channel(schema.schema, "subscribe")

    state = %{
      pid: pid,
      opts: opts,
      user_module: user_module,
      user_state: user_state,
      channel_regexs: channel_regexs,
      schema: schema,
      asyncapi_role: asyncapi_role,
      message_names_to_channel: message_names_to_channel
    }

    # TODO asyncapi_role for direction
    subscriptions = AsyncApi.get_subscriptions(schema.schema, "publish")
    each(subscriptions, &subscribe!(state, &1, 0))

    {:ok, state}
  end

  # @impl GenServer
  # def handle_cast({:publish, message, topic, qos}, state) do
  #   publish(state, message, topic, qos)
  #   {:noreply, state}
  # end

  # def handle_cast({:subscribe, topic, qos}, state) do
  #   subscribe(state, topic, qos)
  #   {:noreply, state}
  # end

  # def handle_cast({:unsubscribe, topic}, state) do
  #   unsubscribe(state, topic)
  #   {:noreply, state}
  # end

  # def handle_cast(:disconnect, state) do
  #   disconnect(state)
  #   {:noreply, state}
  # end

  @impl GenServer
  def handle_info({:publish, packet}, state) do
    %{payload: payload, topic: topic} = packet

    Logger.debug("[MqttAsyncapi] recv #{topic}/#{inspect(payload)}")

    mqtt_message = %{
      topic: topic,
      payload: payload,
      direction: AsyncApi.get_action(:receive, state.asyncapi_role)
    }

    new_user_state =
      case AsyncApi.validate_message(state.schema, state.channel_regexs, mqtt_message) do
        {:ok, valid_message} ->
          case state.user_module.handle_message(valid_message, state.user_state) do
            {:noreply, new_user_state} ->
              new_user_state

            {:reply, responses, new_user_state} ->
              each(responses, &publish(&1, state))
              new_user_state
          end

        {:error, reason} ->
          dbg(reason)
          state.user_state
      end

    {:noreply, %{state | user_state: new_user_state}}
  end

  def handle_info({:disconnected, :shutdown, :ssl_closed}, state) do
    Logger.warning("[MqttAsyncapi] disconnected: ssl_closed")
    {:noreply, state}
  end

  def handle_info(message, state) do
    Logger.warning("[MqttAsyncapi] unhandled: #{inspect(message)}")
    {:noreply, state}
  end

  # ------

  # def handle_disconnect({reason, properties}, _arg) do
  #   Logger.warning("[MqttAsyncapi] disconnected: #{reason}/#{inspect(properties)}")
  #   :ok
  # end

  # def handle_message(topic, message, _arg) do
  #   Logger.warning("[MqttAsyncapi] unhandled: #{inspect({topic, message})}")
  #   :ok
  # end

  # def handle_puback(_ack, _arg) do
  #   :ok
  # end

  # def handle_publish(message, _arg) do
  #   Logger.debug("[MqttAsyncapi] publish: #{inspect(message)}")
  #   :ok
  # end

  # ------

  defp publish(%MqttAsyncapi.Message{} = message, state) do
    message = %{message | direction: AsyncApi.get_action(:send, state.asyncapi_role)}

    mqtt_message =
      MqttAsyncapi.Message.to_mqtt_message(message, state.schema, state.message_names_to_channel)

    dbg(mqtt_message)

    publish_(state, mqtt_message.payload, mqtt_message.topic)
  end

  defp publish_(state, message, topic, qos \\ 0) do
    :emqtt.publish(state.pid, topic, message, qos)
  end

  defp subscribe!(state, topic, qos) do
    case :emqtt.subscribe(state.pid, {topic, qos}) do
      {:ok, _props, [reason]} when reason in [0x00, 0x01, 0x02] ->
        Logger.debug("[MqttAsyncapi] subscribed: #{topic}")
        :ok

      {:ok, _props, reasons} ->
        raise("[MqttAsyncapi] subscribe to #{topic} failed: #{inspect(reasons)}")
    end
  end

  # defp unsubscribe(state, topic) do
  #   case :emqtt.unsubscribe(state.pid, topic) do
  #     {:ok, _props, [0x00]} ->
  #       Logger.debug("[MqttAsyncapi] unsubscribed: #{topic}")
  #       :ok

  #     {:ok, _props, reason_codes} ->
  #       Logger.error("[MqttAsyncapi] unsubscribe #{topic} failed: #{inspect(reason_codes)}")
  #       :error
  #   end
  # end

  # defp disconnect(state) do
  #   :ok = :emqtt.disconnect(state.pid)
  # end
end
