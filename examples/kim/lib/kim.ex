defmodule KimService do
  use MqttAsyncapi, schema_module: KimSchema

  alias Asyncapi.Message
  import Asyncapi.Helpers

  def start_link(opts \\ []) do
    MqttAsyncapi.start_link(__MODULE__, opts)
  end

  @impl true
  def init(_opts) do
    {:ok, %{}}
  end

  @impl true
  def handle_message(%Message{op_id: "functionpoint-req"} = message, state) do
    noreply(state)
  end

  @impl true
  def handle_info(_info, state) do
    noreply(state)
  end
end
