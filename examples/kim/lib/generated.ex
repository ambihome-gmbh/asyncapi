defmodule TEST.Service do
  use MqttAsyncapi, schema_module: TEST.Schema

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
  def handle_message(%Message{op_id: "function-req"} = message, state) do
    %{
      params: %{
        "instance_id" => instance_id
      }
    } = message

    %{payload: %{}} = message
    noreply(state)
  end

  @impl true
  def handle_message(%Message{op_id: "functionpoint-req"} = message, state) do
    %{
      params: %{
        "instance_id" => instance_id
      }
    } = message

    %{payload: %{}} = message
    noreply(state)
  end

  @impl true
  def handle_message(%Message{op_id: "functionpoint-write-req"} = message, state) do
    %{
      params: %{
        "instance_id" => instance_id
      }
    } = message

    %{payload: %{}} = message
    noreply(state)
  end

  @impl true
  def handle_message(%Message{op_id: "functionpoints-req"} = message, state) do
    %{payload: %{}} = message
    noreply(state)
  end

  @impl true
  def handle_message(%Message{op_id: "functions-req"} = message, state) do
    %{payload: %{}} = message
    noreply(state)
  end

  @impl true
  def handle_message(%Message{op_id: "location-req"} = message, state) do
    %{
      params: %{
        "instance_id" => instance_id
      }
    } = message

    %{payload: %{}} = message
    noreply(state)
  end

  @impl true
  def handle_message(%Message{op_id: "locations-req"} = message, state) do
    %{payload: %{}} = message
    noreply(state)
  end

  @impl true
  def handle_info(_info, state) do
    noreply(state)
  end
end
