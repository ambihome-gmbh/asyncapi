defmodule MqttAsyncapi do

  alias Asyncapi.Message

  require Logger
  use GenServer

  @callback init(opts :: term) ::
              {:ok, state :: term} | {:error, term} | {:ok, state :: term, {:continue, term}}
  @callback handle_message(Message.t(), state :: term) ::
              {:noreply, state :: term} | {:reply, [reply_message :: Message.t()], state :: term}
  @callback handle_info(term, state :: term) ::
              {:noreply, state :: term} | {:reply, [reply_message :: Message.t()], state :: term}
  @callback handle_continue(arg :: term, state :: term()) ::
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
        raise("MISSING handle_info/2 in #{inspect(__MODULE__)}/info: #{inspect(info)}")
      end

      @impl true
      def handle_continue(info, state) do
        raise("MISSING handle_continue/2 in #{inspect(__MODULE__)}/info: #{inspect(info)}")
      end

      @impl true
      def handle_message(msg, state) do
        raise("MISSING handle_message/2 in #{inspect(__MODULE__)}/msg: #{inspect(msg)}")
      end

      defoverridable handle_message: 2, handle_info: 2, handle_continue: 2
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

  # publish exposed for test-helper only
  def publish_(message, state), do: publish(message, state)

  # ---

  @impl GenServer
  def init(opts) do
    {user_module, opts} = Keyword.pop(opts, :user_module)
    {schema_module, opts} = Keyword.pop(opts, :schema_module)

    if not Code.ensure_loaded?(schema_module) do
      raise("schema module #{inspect(schema_module)} not loaded")
    end

    asyncapi = schema_module.get_asyncapi()

    {:ok, broker_state} = @broker.connect(asyncapi, user_module)

    {:ok, user_state, continue} =
      case user_module.init(opts) do
        {:ok, user_state} ->
          {:ok, user_state, :no_continue}

        {:ok, user_state, {:continue, continue_arg}} ->
          {:ok, user_state, {:continue, continue_arg}}

        unexpected ->
          raise("invalid return from #{inspect(user_module)}.init/1: #{inspect(unexpected)}")
      end

    state = %{
      broker: broker_state,
      user_module: user_module,
      user_state: user_state,
      asyncapi: asyncapi
    }

    if continue != :no_continue do
      {:ok, state, continue}
    else
      {:ok, state}
    end
  end

  @impl GenServer
  def handle_info({:publish, mqtt_message}, state) do
    new_user_state =
      with {:ok, mqtt_message_decoded} <- Message.decode_mqtt_message(mqtt_message),
           {:ok, message} <- Message.from_mqtt_message(mqtt_message_decoded, state.asyncapi) do
        message
        |> state.user_module.handle_message(state.user_state)
        |> process_reply(state)
      else
        error ->
          Logger.warning("[#{inspect(state.user_module)}] incoming message error: #{inspect(error)}")
          state.user_state
      end

    {:noreply, %{state | user_state: new_user_state}}
  end

  def handle_info({:disconnected, reason_code, _properties}, state) do
    Logger.warning("[#{inspect(state.user_module)}] disconnected: #{inspect(reason_code)}")
    {:noreply, state}
  end

  def handle_info({:connected, _properties}, state) do
    Logger.info("[#{inspect(state.user_module)}] reconnected, subscribing...")
    subscribe_all(state)
    {:noreply, state}
  end

  def handle_info(message, state) do
    new_user_state =
      message
      |> state.user_module.handle_info(state.user_state)
      |> process_reply(state)

    {:noreply, %{state | user_state: new_user_state}}
  end

  @impl GenServer
  def handle_continue(continue_arg, state) do
    new_user_state =
      continue_arg
      |> state.user_module.handle_continue(state.user_state)
      |> process_reply(state)

    {:noreply, %{state | user_state: new_user_state}}
  end

  # ------

  defp process_reply({:noreply, new_user_state}, _state), do: new_user_state

  defp process_reply({:reply, responses, new_user_state}, state) do
    Enum.each(responses, &publish(&1, state))
    new_user_state
  end

  defp subscribe_all(state) do
    state.broker.module.subscribe_all(state.broker, state.asyncapi, state.user_module)
  end

  defp publish(%Message{} = message, state) do
    with {:ok, mqtt_message} <- Message.to_mqtt_message(message, state.asyncapi),
         mqtt_message_encoded <- Message.encode_mqtt_message(mqtt_message),
         :ok <- state.broker.module.publish(state.broker, mqtt_message_encoded) do
      :ok
    else
      error ->
        Logger.warning("[#{inspect(state.user_module)}] publish error: #{inspect(error)}")
        error
    end
  end
end
