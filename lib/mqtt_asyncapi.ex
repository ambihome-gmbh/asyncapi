defmodule MqttAsyncapi do
  import Enum
  alias Asyncapi.Message

  require Logger
  use GenServer

  @callback init(opts :: term) ::
              {:ok, state :: term} | {:error, term}
  @callback handle_message(Message.t(), state :: term) ::
              {:noreply, state :: term} | {:reply, [reply_message :: Message.t()], state :: term}
  @callback handle_info(term, state :: term) ::
              {:noreply, state :: term} | {:reply, [reply_message :: Message.t()], state :: term}

  @broker Application.compile_env(:asyncapi, :broker)

  defmacro __using__(opts) do
    quote do
      @behaviour MqttAsyncapi
      require Logger

      def get_schema_module(), do: unquote(Keyword.fetch!(opts, :schema_module))

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
    schema_module = user_module.get_schema_module()

    if not Code.ensure_loaded?(schema_module) do
      raise("schema module #{inspect(schema_module)} not loaded")
    end

    GenServer.start_link(
      __MODULE__,
      [
        {:user_module, user_module},
        {:schema_module, schema_module}
        | opts
      ],
      name: user_module
    )
  end

  # TODO naming!
  def send(op_id, payload, state) do
    publish(
      %Message{op_id: op_id, payload: payload},
      state
    )
  end

  # TODO naming!
  def sendp(op_id, payload, params, state) do
    publish(
      %Message{op_id: op_id, payload: payload, params: params},
      state
    )
  end

  # ---

  @impl GenServer
  def init(opts) do
    {user_module, opts} = Keyword.pop(opts, :user_module)
    {schema_module, opts} = Keyword.pop(opts, :schema_module)

    if not Code.ensure_loaded?(schema_module) do
      raise("schema module #{inspect(schema_module)} not loaded")
    end

    asyncapi = schema_module.get_asyncapi()

    # AH-1702/asyncapi-logging -> broker wrapper?
    Logger.debug("[#{inspect(user_module)}] connecting to #{opts[:host]}:#{opts[:port]}")

    {:ok, broker_state} = @broker.connect(asyncapi)

    # AH-1702/asyncapi-logging -> broker wrapper?
    Logger.info("[#{inspect(user_module)}] connected to #{opts[:host]}:#{opts[:port]}")

    {:ok, user_state} = user_module.init(opts)

    state = %{
      broker: broker_state,
      user_module: user_module,
      user_state: user_state,
      asyncapi: asyncapi
    }

    {:ok, state}
  end

  @impl GenServer
  def handle_info({:publish, mqtt_message}, state) do
    mqtt_message_decoded = Message.decode_mqtt_message(mqtt_message)
    # AH-1702/asyncapi-logging
    # Logger.debug("[#{inspect(state.user_module)}] recv #{inspect(mqtt_message_decoded)}")

    new_user_state =
      case Message.from_mqtt_message(mqtt_message_decoded, state.asyncapi) do
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
    mqtt_message_encoded = Message.encode_mqtt_message(mqtt_message)
    state.broker.module.publish(state.broker, mqtt_message_encoded)
  end
end
