defmodule Stack.ServiceB do
  use MqttAsyncapi, schema_path: "test/schema/stack/schema_b.json"

  def start_link(opts \\ []) do
    MqttAsyncapi.start_link(__MODULE__, opts)
  end

  @impl true
  def init(opts) do
    pid = Keyword.fetch!(opts, :pid)
    {:ok, %{pid: pid}}
  end

  @impl true
  def handle_message(%MqttAsyncapi.Message{operation_id: "pop_response", payload: %{"value" => value}}, state) do
    send(state.pid, {:pop_response, value})
    {:noreply, state}
  end

  @impl true
  def handle_message(%MqttAsyncapi.Message{operation_id: "top_response", payload: %{"value" => value}}, state) do
    send(state.pid, {:top_response, value})
    {:noreply, state}
  end

  @impl true
  def handle_info({:trigger, "push", value}, state) do
    message = %MqttAsyncapi.Message{
      operation_id: "push",
      payload: %{"value" => value}
    }
    {:reply, [message], state}
  end

  @impl true
  def handle_info({:trigger, "pop"}, state) do
    message = %MqttAsyncapi.Message{
      operation_id: "pop",
      payload: %{}
    }
    {:reply, [message], state}
  end

  @impl true
  def handle_info({:trigger, "top"}, state) do
    message = %MqttAsyncapi.Message{
      operation_id: "top",
      payload: %{}
    }
    {:reply, [message], state}
  end

  @impl true
  def handle_info(_info, state) do
    {:noreply, state}
  end
end
