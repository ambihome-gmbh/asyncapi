defmodule Protocol.MQTT do
  def connect(subscriptions, opts) do
    {:ok, mqtt_pid} = :emqtt.start_link(opts)
    {:ok, _props} = :emqtt.connect(mqtt_pid)
    Enum.each(subscriptions, &subscribe!(mqtt_pid, &1, 0))
    {:ok, %{pid: mqtt_pid, opts: opts, module: __MODULE__}}
  end

  def publish(protocol_state, mqtt_message) do
    # TODO mqtt_message.retain?
    :emqtt.publish(protocol_state.pid, mqtt_message.topic, mqtt_message.payload, mqtt_message.qos)
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

defmodule Protocol.Dummy do
  def connect(subscriptions, _opts \\ nil) do
    Enum.each(subscriptions, &DummyBroker.subscribe(&1))
    {:ok, %{module: __MODULE__}}
  end

  def publish(_protocol_state, mqtt_message) do
    DummyBroker.publish(mqtt_message.topic, mqtt_message.payload)
  end
end

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
      def get_protocol(), do: unquote(Keyword.get(opts, :protocol, "Dummy"))

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
    protocol = user_module.get_protocol()

    # TODO? name aus user mitgeben? jetzt immer __MODULE__
    GenServer.start_link(
      __MODULE__,
      [
        {:user_module, user_module},
        {:asyncapi_schema_path, schema_path},
        {:protocol, Module.concat(["Protocol", protocol])}
        | opts
      ],
      name: user_module
    )
  end

  def send(operation_id, payload, state) do
    publish(
      %Message{operation_id: operation_id, payload: payload},
      state
    )
  end

  def sendp(operation_id, payload, parameters, state) do
    publish(
      %Message{operation_id: operation_id, payload: payload, parameters: parameters},
      state
    )
  end

  # ---

  @impl GenServer
  def init(opts) do
    {user_module, opts} = Keyword.pop(opts, :user_module)
    {asyncapi_schema_path, opts} = Keyword.pop(opts, :asyncapi_schema_path)
    {protocol, opts} = Keyword.pop(opts, :protocol)

    asyncapi = AsyncApi.load(asyncapi_schema_path)

    opts = [{:host, asyncapi.server.host}, {:port, asyncapi.server.port} | opts]

    # TODO -> protocol wrapper
    # Logger.debug("[#{inspect(user_module)}] connecting to #{opts[:host]}:#{opts[:port]}")

    {:ok, protocol_state} = apply(protocol, :connect, [asyncapi.subscriptions, opts])

    # TODO -> protocol wrapper
    # Logger.info("[#{inspect(user_module)}] connected to #{opts[:host]}:#{opts[:port]}")

    {:ok, user_state} = user_module.init(opts)

    state = %{
      protocol: protocol_state,
      user_module: user_module,
      user_state: user_state,
      asyncapi: asyncapi
    }

    {:ok, state}
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
    apply(state.protocol.module, :publish, [state.protocol, mqtt_message])
  end
end
