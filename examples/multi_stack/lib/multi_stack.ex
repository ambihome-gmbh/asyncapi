defmodule MultiStackService do
  schema_path = Application.compile_env(:asyncapi, :schemas) |> Keyword.get(:multistack_service)

  use MqttAsyncapi,
    schema_path: unquote(schema_path),
    broker: unquote(Application.compile_env(:asyncapi, :broker))

  alias Asyncapi.Message
  alias MultiStackApi.Payload

  def start_link(opts \\ []) do
    MqttAsyncapi.start_link(__MODULE__, opts)
  end

  @impl true
  def init(_opts) do
    {:ok, %{stacks: %{}}}
  end

  @impl true
  def handle_message(%Message{operation_id: "create"} = message, state) do
    %{payload: %{"name" => name}} = message

    stack_id = Uniq.UUID.uuid6()

    response = %Message{
      operation_id: "create_response",
      payload: %Payload.CreateResponse{name: name, id: stack_id}
    }

    reply(
      [response],
      %{state | stacks: Map.put(state.stacks, stack_id, %{name: name, data: []})}
    )
  end

  @impl true
  def handle_message(%Message{operation_id: "push"} = message, state) do
    %{
      payload: %Payload.Push{value: value},
      parameters: %{"stack_id" => stack_id}
    } = message

    noreply(%{state | stacks: update_in(state.stacks, [stack_id, :data], &[value | &1])})
  end

  @impl true
  def handle_message(%Message{operation_id: "pop"} = message, state) do
    %{parameters: %{"stack_id" => stack_id}} = message

    # TODO crashes if no stack with stack_id
    {value, new_stack} =
      case state.stacks[stack_id].data do
        [top | rest] -> {top, rest}
        [] -> {nil, []}
      end

    response = %Message{
      operation_id: "pop_response",
      payload: %Payload.PopResponse{value: value},
      parameters: %{"stack_id" => stack_id}
    }

    reply(
      [response],
      %{state | stacks: put_in(state.stacks, [stack_id, :data], new_stack)}
    )
  end

  @impl true
  def handle_info(_info, state) do
    noreply(state)
  end

  defp reply(responses, state), do: {:reply, responses, state}
  defp noreply(state), do: {:noreply, state}
end
