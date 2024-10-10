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

      def get_schema_path(), do: unquote(Keyword.get(opts, :schema_path))

      def child_spec(opts) do
        %{id: __MODULE__, start: {__MODULE__, :start_link, [opts]}}
      end

      @impl true
      def handle_info(_term, state) do
        {:noreply, state}
      end

      defoverridable handle_info: 2
    end
  end

  def start_link(user_module, opts) do
    schema_path = user_module.get_schema_path()

    GenServer.start_link(
      __MODULE__,
      [{:user_module, user_module}, {:asyncapi_schema_path, schema_path} | opts],
      name: __MODULE__
    )
  end

  @impl GenServer
  def init(opts) do
    {user_module, opts} = Keyword.pop(opts, :user_module)
    {asyncapi_schema_path, opts} = Keyword.pop(opts, :asyncapi_schema_path)

    asyncapi = AsyncApi.load(asyncapi_schema_path)

    server = asyncapi.schema.schema["servers"]["production"]

    host = to_charlist(server["host"])
    port = String.to_integer(get_in(server, ["variables", "port", "default"]))

    opts = [{:host, host}, {:port, port} | opts]

    dbg(opts)

    Logger.debug("[MqttAsyncapi] connecting to #{opts[:host]}:#{opts[:port]}")

    {:ok, pid} = :emqtt.start_link(opts)
    {:ok, _props} = :emqtt.connect(pid)

    Logger.debug("[MqttAsyncapi] connected")

    {:ok, user_state} = user_module.init(opts)

    state = %{
      mqtt: %{pid: pid, opts: opts},
      user_module: user_module,
      user_state: user_state,
      asyncapi: asyncapi
    }

    each(asyncapi.subscriptions, &subscribe!(state.mqtt.pid, &1, 0))

    {:ok, state}
  end

  @impl GenServer
  def handle_info({:publish, mqtt_message}, state) do
    Logger.debug("[MqttAsyncapi] recv #{inspect(mqtt_message)}")

    new_user_state =
      case Message.from_mqtt_message(mqtt_message, state.asyncapi) do
        {:ok, message} ->
          case state.user_module.handle_message(message, state.user_state) do
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

  defp publish(%Message{} = message, state) do
    mqtt_message = Message.to_mqtt_message!(message, state.asyncapi)

    dbg(mqtt_message)

    publish_(state.mqtt.pid, mqtt_message.payload, mqtt_message.topic)
  end

  defp publish_(pid, message, topic, qos \\ 0) do
    :emqtt.publish(pid, topic, message, qos)
  end

  defp subscribe!(pid, topic, qos) do
    case :emqtt.subscribe(pid, {topic, qos}) do
      {:ok, _props, [reason]} when reason in [0x00, 0x01, 0x02] ->
        Logger.debug("[MqttAsyncapi] subscribed: #{topic}")
        :ok

      {:ok, _props, reasons} ->
        raise("[MqttAsyncapi] subscribe to #{topic} failed: #{inspect(reasons)}")
    end
  end
end
