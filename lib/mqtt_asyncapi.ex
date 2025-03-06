defmodule MqttAsyncapi do
  import Enum
  alias MqttAsyncapi.Message

  require Logger
  use GenServer

  @callback init(opts :: term) ::
              state :: term
  @callback handle_message(Message.t(), state :: term) ::
              {:noreply, state :: term} | {:reply, [reply_message :: Message.t()], state :: term}
  @callback handle_info(term, state :: term) ::
              {:noreply, state :: term} | {:reply, [reply_message :: Message.t()], state :: term}

  defmacro __using__(opts) do
    quote do
      @behaviour MqttAsyncapi
      require Logger

      def get_schema_path(), do: unquote(Keyword.get(opts, :schema_path))

      def child_spec(opts) do
        %{id: __MODULE__, start: {__MODULE__, :start_link, [opts]}}
      end

      @impl true
      def handle_info(info, state) do
        Logger.warning("unhandled: handle_info: #{inspect(info)}")
        {:noreply, state}
      end

      defoverridable handle_info: 2
    end
  end

  # --- API

  def start_link(user_module, opts) do
    schema_path = user_module.get_schema_path()

    # TODO? name aus user mitgeben? jetzt immer __MODULE__
    GenServer.start_link(
      __MODULE__,
      [{:user_module, user_module}, {:asyncapi_schema_path, schema_path} | opts],
      name: user_module
    )
  end

  def send(operation_id, payload, state) do
    publish(
      %Message{operation_id: operation_id, payload: payload},
      %{asyncapi: state.asyncapi, mqtt: state.mqtt}
    )
  end

  def sendp(operation_id, payload, parameters, state) do
    publish(
      %Message{operation_id: operation_id, payload: payload, parameters: parameters},
      %{asyncapi: state.asyncapi, mqtt: state.mqtt}
    )
  end

  # ---

  @impl GenServer
  def init(opts) do
    {user_module, opts} = Keyword.pop(opts, :user_module)
    {asyncapi_schema_path, opts} = Keyword.pop(opts, :asyncapi_schema_path)

    asyncapi = AsyncApi.load(asyncapi_schema_path)

    opts = [{:host, asyncapi.server.host}, {:port, asyncapi.server.port} | opts]

    Logger.debug("[#{inspect(user_module)}] connecting to #{opts[:host]}:#{opts[:port]}")

    {:ok, mqtt_pid} = mqtt_connect(asyncapi.subscriptions, opts)

    Logger.info("[#{inspect(user_module)}] connected to #{opts[:host]}:#{opts[:port]}")

    {:ok, user_state} = user_module.init(opts)

    state = %{
      mqtt: %{pid: mqtt_pid, opts: opts},
      user_module: user_module,
      user_state: user_state,
      asyncapi: asyncapi
    }

    # each(asyncapi.subscriptions, &subscribe!(state.mqtt.pid, &1, 0, state))

    {:ok, state}
  end

  def mqtt_connect(subscriptions, opts) do
    {:ok, mqtt_pid} = :emqtt.start_link(opts)
    {:ok, _props} = :emqtt.connect(mqtt_pid)
    each(subscriptions, &subscribe!(mqtt_pid, &1, 0))
    {:ok, mqtt_pid}
  end

  @impl GenServer
  def handle_info({:publish, mqtt_message}, state) do
    Logger.debug("[#{inspect(state.user_module)}] recv #{inspect(mqtt_message)}")

    new_user_state =
      case Message.from_mqtt_message(mqtt_message, state.asyncapi) do
        {:ok, message} ->
          message
          |> state.user_module.handle_message(state.user_state)
          |> process_reply(state)

        {:error, reason} ->
          dbg(reason)
          state.user_state
      end

    {:noreply, %{state | user_state: new_user_state}}
  end

  def handle_info({:disconnected, :shutdown, :ssl_closed}, state) do
    Logger.warning("[#{inspect(state.user_module)}] disconnected: ssl_closed")
    {:noreply, state}
  end

  def handle_info(message, state) do
    new_user_state =
      message
      |> state.user_module.handle_info(state.user_state)
      |> process_reply(state)

    {:noreply, %{state | user_state: new_user_state}}
  end

  # ------

  defp process_reply({:noreply, new_user_state}, _state), do: new_user_state

  defp process_reply({:reply, responses, new_user_state}, state) do
    each(responses, &publish(&1, state))
    new_user_state
  end

  defp publish(%Message{} = message, state) do
    mqtt_message = Message.to_mqtt_message!(message, state.asyncapi)

    publish_(state.mqtt.pid, mqtt_message)
  end

  defp publish_(pid, mqtt_message) do
    # TODO mqtt_message.retain?
    :emqtt.publish(pid, mqtt_message.topic, mqtt_message.payload, mqtt_message.qos)
  end

  defp subscribe!(pid, topic, qos, user_module \\ "TODO") do
    case :emqtt.subscribe(pid, {topic, qos}) do
      {:ok, _props, [reason]} when reason in [0x00, 0x01, 0x02] ->
        Logger.debug("[#{inspect(user_module)}] subscribed: #{topic}")
        :ok

      {:ok, _props, reasons} ->
        raise("[#{inspect(user_module)}] subscribe to #{topic} failed: #{inspect(reasons)}")
    end
  end
end
