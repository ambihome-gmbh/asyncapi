defmodule SampleService do
  alias MqttAsyncapi.Message

  def init(_), do: {:ok, %{}}

  def handle_message(%Message{name: "P1-name"} = _message, state) do
    dbg("got P1")
    {:noreply, state}
  end

  def handle_message(%Message{name: "P2-name"} = message, state) do
    some_prop = message.payload["some_prop"]
    dbg("got P2, some_prop: #{some_prop}")
    {:reply, [%Message{name: "S2-name", payload: %{"some_prop" => some_prop}}], state}
  end

  def handle_message(%Message{} = message, state) do
    dbg({:unhandled, message})
    {:noreply, state}
  end
end
