defmodule StackService do
  # TO-DO-4
  schema_path = Application.compile_env(:asyncapi, :schemas) |> Keyword.get(:stack_service)

  use MqttAsyncapi,
    schema_path: unquote(schema_path),
    broker: unquote(Application.compile_env(:asyncapi, :broker))

  alias Asyncapi.Message

  def start_link(opts \\ []) do
    MqttAsyncapi.start_link(__MODULE__, opts)
  end

  @impl true
  def init(_opts) do
    # dbg({:init, __MODULE__, self()})
    {:ok, %{stack: []}}
  end

  @impl true
  def handle_message(%Message{op_id: "push"} = message, state) do
    %{payload: %{value: value}} = message
    {:noreply, %{state | stack: [value | state.stack]}}
  end

  @impl true
  def handle_message(%Message{op_id: "pop"}, state) do
    {value, new_stack} =
      case state.stack do
        [top | rest] -> {top, rest}
        [] -> {nil, []}
      end

    response = %Message{
      op_id: "pop_response",
      payload: %{value: value}
    }

    {:reply, [response], %{state | stack: new_stack}}
  end

  @impl true
  def handle_info({"test_internal", payload, params}, state) do
    dbg({"RECV-info: test_internal", payload, params})
    {:noreply, state}
  end

  def handle_info(unexpected, state) do
    dbg({:unexpected, unexpected})
    {:noreply, state}
  end
end
