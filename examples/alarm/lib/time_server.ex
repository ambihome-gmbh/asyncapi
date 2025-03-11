defmodule TimeServer do
  use GenServer

  def start_link(_) do
    GenServer.start_link(__MODULE__, %{}, name: __MODULE__)
  end

  def schedule_timeout(target, timeout, callback) do
    GenServer.cast(
      __MODULE__,
      {:schedule_timeout, %{target: target, timeout: timeout, callback: callback}}
    )
  end

  def init(state) do
    {:ok, state}
  end

  def handle_cast({:schedule_timeout, parameters}, state) do
    _ = parameters
    raise("IMPL")
    {:noreply, state}
  end

  def handle_cast({:schedule_cron, parameters}, state) do
    _ = parameters
    raise("IMPL")
    {:noreply, state}
  end
end

# {:error, :payload_validation_error,
#  [
#    {"Schema does not allow additional properties.", "#/config/monitored"},
#    {"Schema does not allow additional properties.", "#/config/actions"},
#    {"Schema does not allow additional properties.", "#/config/timeout"},
#    {"Schema does not allow additional properties.", "#/config/mails"},
#    {"Required properties timeout, mails, monitored, actions were not present.", "#/config"},
#    {"Value is not allowed in enum.", "#/sm_state"},
#    {"Type mismatch. Expected String but got Unknown.", "#/sm_state"}
#  ], "state",
#  %{
#    "alarm_condition" => false,
#    "alarm_sources" => ["ch1", "ch2"],
#    "alarm_type" => "alarm_incursion",
#    "config" => %{monitored: [], actions: ["SEND_MAILS"], timeout: 30, mails: []},
#    "perpetrators" => [],
#    "ready_state" => ["MONITORED_EMPTY"],
#    "sm_state" => :state_disarmed
#  }}
