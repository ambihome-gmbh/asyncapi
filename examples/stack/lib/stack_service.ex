defmodule StackService do
  use MqttAsyncapi, schema_module: StackSchema

  alias Asyncapi.Message
  import Asyncapi.Helpers
  alias StackSchema.MessagePayload, as: P

  def start_link(opts \\ []) do
    MqttAsyncapi.start_link(__MODULE__, opts)
  end

  @impl true
  def init(_opts) do
    raise("TODO: payload+params: string maps, folder structure like multistack, no message-structs")
    
    {:ok, %{stack: []}}
  end

  @impl true
  def handle_message(%Message{op_id: "push"} = message, state) do
    %{payload: %{value: value}} = message
    noreply(%{state | stack: [value | state.stack]})
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
      payload: %P.PopResponse{value: value}
    }

    reply(response, %{state | stack: new_stack})
  end

  def handle_info(unexpected, state) do
    dbg({:unexpected, unexpected})
    noreply(state)
  end
end
