defmodule BakingService do
  use MqttAsyncapi, schema: :service

  alias Asyncapi.Message
  import Asyncapi.Helpers

  def start_link(opts \\ []) do
    MqttAsyncapi.start_link(__MODULE__, opts)
  end

  @impl true
  def init(_opts) do
    {:ok, %{stack: []}}
  end

  @impl true
  def handle_message(%Message{op_id: "start_baking"}, state) do
    TimeServer.schedule_timeout(self(), %{
      after: 30,
      after_unit: :milliseconds,
      callback: :timeout
    })

    TimeServer.schedule_cron(self(), %{cron: "TODO", callback: :peek})
    noreply(state)
  end

  @impl true
  def handle_info(:timeout, state) do
    reply(%Message{op_id: "baking_done"}, state)
  end

  @impl true
  def handle_info(:peek, state) do
    reply(%Message{op_id: "baking_not_done"}, state)
  end
end
