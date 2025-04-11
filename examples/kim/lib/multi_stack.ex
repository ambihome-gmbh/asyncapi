defmodule MultiStackService do
  use MqttAsyncapi, schema_module: MultiStackSchema

  alias Asyncapi.Message
  alias MultiStackSchema.MessagePayload, as: P
  import Asyncapi.Helpers

  def start_link(opts \\ []) do
    MqttAsyncapi.start_link(__MODULE__, opts)
  end

  @impl true
  def init(_opts) do
    {:ok, %{stacks: %{}}}
  end

  @impl true
  def handle_message(%Message{op_id: "create"} = message, state) do
    %{payload: %{name: name}} = message

    stack_id = Uniq.UUID.uuid6()

    response = %Message{
      op_id: "create_response",
      payload: %P.CreateResponse{name: name, id: stack_id}
    }

    reply(
      response,
      %{state | stacks: Map.put(state.stacks, stack_id, %{name: name, data: []})}
    )
  end

  @impl true
  def handle_message(%Message{op_id: "push"} = message, state) do
    %{
      payload: %P.Push{value: value},
      params: %{stack_id: stack_id}
    } = message

    noreply(%{state | stacks: update_in(state.stacks, [stack_id, :data], &[value | &1])})
  end

  @impl true
  def handle_message(%Message{op_id: "pop"} = message, state) do
    %{params: %{stack_id: stack_id}} = message

    # NOTE: crashes if no stack with stack_id
    {value, new_stack} =
      case state.stacks[stack_id].data do
        [top | rest] -> {top, rest}
        [] -> {nil, []}
      end

    response = %Message{
      op_id: "pop_response",
      payload: %P.PopResponse{value: value},
      params: %{stack_id: stack_id}
    }

    reply(
      response,
      %{state | stacks: put_in(state.stacks, [stack_id, :data], new_stack)}
    )
  end

  @impl true
  def handle_info(_info, state) do
    noreply(state)
  end
end
