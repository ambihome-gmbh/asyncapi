defmodule StackService do
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
    {:ok, %{stack: []}}
  end

  @impl true
  def handle_message(%Message{operation_id: "push"} = message, state) do
    %{payload: %{value: value}} = message
    {:noreply, %{state | stack: [value | state.stack]}}
  end

  @impl true
  def handle_message(%Message{operation_id: "pop"}, state) do
    {value, new_stack} =
      case state.stack do
        [top | rest] -> {top, rest}
        [] -> {nil, []}
      end

    response = %Message{
      operation_id: "pop_response",
      payload: %{value: value}
    }

    {:reply, [response], %{state | stack: new_stack}}
  end

  @impl true
  def handle_info(_info, state) do
    {:noreply, state}
  end
end
