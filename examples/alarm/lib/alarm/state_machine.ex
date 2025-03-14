defmodule Alarm.StateMachine do
  def handle(:state_disarmed, event, state) do
    case {event, state.ready_state == []} do
      {:event_arm, true} ->
        TimeServer.schedule_timeout(self(), state.config.timeout, :alarm_timeout)
        :state_wait_arm

      _ ->
        :state_disarmed
    end
  end

  def handle(:state_wait_arm, event, state) do
    case {event, state.alarm_condition} do
      {:event_timeout, false} ->
        :state_armed

      {:event_timeout, true} ->
        TimeServer.schedule_timeout(self(), state.config.timeout, :alarm_timeout)
        :state_wait_alarm

      {:event_disarm, _} ->
        :state_disarmed

      _ ->
        :state_wait_arm
    end
  end

  def handle(:state_armed, event, state) do
    case {event, state.alarm_condition} do
      {:event_alarm_source_updated, true} ->
        TimeServer.schedule_timeout(self(), state.config.timeout, :alarm_timeout)
        :state_wait_alarm

      {:event_disarm, _} ->
        :state_disarmed

      _ ->
        :state_armed
    end
  end

  def handle(:state_wait_alarm, event, state) do
    case {event, state.alarm_condition} do
      {:event_timeout, true} -> :state_alarm
      {:event_disarm, _} -> :state_disarmed
      {_, false} -> :state_armed
      _ -> :state_wait_alarm
    end
  end

  def handle(:state_alarm, event, _state) do
    case event do
      :event_disarm -> :state_disarmed
      _ -> :state_alarm
    end
  end
end
