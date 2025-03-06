defmodule Simple.ServiceA do
  use MqttAsyncapi,
    schema_path: "test/schema/simple/schema_a.json",
    broker: Asyncapi.Broker.Dummy

  alias MqttAsyncapi.Message

  def start_link(opts) do
    MqttAsyncapi.start_link(__MODULE__, opts)
  end

  @impl true
  def init(_), do: {:ok, %{}}

  @impl true
  def handle_message(%Message{operation_id: "P1"} = _message, state) do
    dbg("got P1")
    {:noreply, state}
  end

  def handle_message(%Message{operation_id: "P2"} = message, state) do
    some_prop = message.payload["some_prop"]
    {:reply, [%Message{operation_id: "S2", payload: %{"some_prop" => some_prop}}], state}
  end

  def handle_message(%Message{} = message, state) do
    dbg({:unhandled, :handle_message, message})
    {:noreply, state}
  end
end
