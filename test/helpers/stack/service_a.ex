defmodule Stack.ServiceA do
  use MqttAsyncapi, schema_path: "test/schema/stack/schema_a.json"

  def start_link(opts \\ []) do
    MqttAsyncapi.start_link(__MODULE__, opts)
  end

  @impl true
  def init(_opts) do
    {:ok, %{stack: []}}
  end

  @impl true
  def handle_message(%MqttAsyncapi.Message{operation_id: "push", payload: %{"value" => value}}, state) do
    new_stack = [value | state.stack]
    {:noreply, %{state | stack: new_stack}}
  end

  @impl true
  def handle_message(%MqttAsyncapi.Message{operation_id: "pop"}, state) do
    case state.stack do
      [top | rest] ->
        response = %MqttAsyncapi.Message{
          operation_id: "pop_response",
          payload: %{"value" => top}
        }
        {:reply, [response], %{state | stack: rest}}

      [] ->
        {:noreply, state}
    end
  end

  @impl true
  def handle_message(%MqttAsyncapi.Message{operation_id: "top"}, state) do
    case state.stack do
      [top | _] ->
        response = %MqttAsyncapi.Message{
          operation_id: "top_response",
          payload: %{"value" => top}
        }
        {:reply, [response], state}

      [] ->
        {:noreply, state}
    end
  end

  @impl true
  def handle_info({:trigger, "pop_response", value}, state) do
    response = %MqttAsyncapi.Message{
      operation_id: "pop_response",
      payload: %{"value" => value}
    }
    {:reply, [response], state}
  end

  @impl true
  def handle_info({:trigger, "top_response", value}, state) do
    response = %MqttAsyncapi.Message{
      operation_id: "top_response",
      payload: %{"value" => value}
    }
    {:reply, [response], state}
  end

  @impl true
  def handle_info(_info, state) do
    {:noreply, state}
  end
end
