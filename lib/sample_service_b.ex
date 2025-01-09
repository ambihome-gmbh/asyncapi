defmodule SampleServiceB do
  use MqttAsyncapi, schema_path: "priv/schema/simple/schema_b.json"

  alias MqttAsyncapi.Message

  def start_link(opts) do
    MqttAsyncapi.start_link(__MODULE__, opts)
  end

  @impl true
  def init(_), do: {:ok, %{}}

  @impl true
  def handle_message(%Message{operation_id: "S2"} = message, state) do
    send(:mqtt_test, {"test-sequence-done", message.payload["some_prop"]})
    {:noreply, state}
  end

  def handle_message(%Message{} = message, state) do
    dbg({:unhandled, :handle_message, message})
    {:noreply, state}
  end

  @impl true
  def handle_info({"run-test-sequence", data}, state) do
    {:reply, [%Message{operation_id: "P2", payload: %{"some_prop" => data}}], state}
  end

  @impl true
  def handle_info(info, state) do
    dbg({:unhandled, :handle_info, info})
    {:noreply, state}
  end
end
