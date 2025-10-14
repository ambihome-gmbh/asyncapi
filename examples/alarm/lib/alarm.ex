defmodule AlarmService do
  use MqttAsyncapi, schema_module: AlarmSchema

  alias Asyncapi.Message
  import Asyncapi.Helpers

  def start_link(opts \\ []) do
    MqttAsyncapi.start_link(__MODULE__, opts)
  end

  @impl true
  def init(_opts) do
    # TODO
    # {alarm_type, _opts} = Keyword.pop(opts, :alarm_type)
    alarm_type = "alarm_incursion"

    {
      :ok,
      %{
        sm_state: :state_disarmed,
        perpetrators: [],
        ready_state: ["UNINITIALIZED"],
        alarm_type: alarm_type,
        alarm_sources: Project.get_alarm_sources(),
        alarm_condition: false,
        config: %{
          monitored: [],
          mails: [],
          timeout: 30,
          actions: ["SEND_MAILS"]
        }
      }
    }
  end

  @impl true
  def handle_message(%Message{params: %{"alarm_type" => alarm_type}}, state) when alarm_type != state.alarm_type do
    noreply(state)
  end

  @impl true
  # TODO Datapoints new
  def handle_message(%Message{op_id: "dp_write_ind"} = message, state) do
    %{"id" => id, "value" => value} = message.payload

    case Map.has_key?(state.alarm_sources, id) do
      true -> dispatch_event(:event_alarm_source_updated, put_in(state, [:alarm_sources, id, :value], value))
      false -> noreply(state)
    end
  end

  @impl true
  def handle_message(%Message{} = message, state) do
    case message.op_id do
      "arm" -> dispatch_event(:event_arm, state)
      "disarm" -> dispatch_event(:event_disarm, state)
      "get_state" -> reply(info_message(state), state)
      "set_config" -> configure(message.payload, state)
      _ -> noreply(state)
    end
  end

  @impl true
  def handle_info(:timeout, state) do
    dispatch_event(:event_timeout, state)
  end

  defp configure(config_payload, %{sm_state: :state_disarmed} = state) do
    config = Alarm.Config.from_payload(config_payload)
    # TODO ensure monitored has only alarm sources
    new_state = update_state(%{state | config: config})
    response = info_message(new_state)

    reply(response, new_state)
  end

  defp configure(_, state) do
    reply(error_message(state, :configure_while_armed), state)
  end

  defp get_ready_state(config, alarm_condition?, initialized?) do
    [
      if(length(config.actions) == 0, do: "NO_ACTION"),
      if(length(config.monitored) == 0, do: "MONITORED_EMPTY"),
      if(alarm_condition?, do: "ALARM_CONDITION"),
      if(!initialized?, do: "UNINITIALIZED")
    ]
    |> Enum.reject(&is_nil/1)
  end

  defp initialized?(monitored, alarm_sources) do
    alarm_sources
    |> Map.take(monitored)
    |> Map.values()
    |> Enum.all?(&(&1.value != nil))
  end

  defp alarm_condition?(monitored, alarm_sources) do
    alarm_sources
    |> Map.take(monitored)
    |> Map.values()
    |> Enum.any?(&(&1.value == &1.alarm_condition))
  end

  defp update_state(state) do
    initialized? = initialized?(state.config.monitored, state.alarm_sources)
    alarm_condition? = alarm_condition?(state.config.monitored, state.alarm_sources)
    ready_state = get_ready_state(state.config, alarm_condition?, initialized?)
    %{state | ready_state: ready_state, alarm_condition: alarm_condition?}
  end

  defp dispatch_event(event, state) do
    state = update_state(state)
    next_sm_state = Alarm.StateMachine.handle(state.sm_state, event, state)

    do_respond? =
      case {next_sm_state, state.sm_state, event} do
        {sm_state, sm_state, :event_alarm_source_updated} ->
          false

        {:state_alarm, _, _} ->
          dbg("ALARM")
          # TODO trigger scene, send mails, groupobj update
          true

        _ ->
          true
      end

    new_state = Map.put(state, :sm_state, next_sm_state)
    response = if do_respond?, do: info_message(new_state), else: []

    reply(response, new_state)
  end

  # ----
  defp info_message(state) do
    %Message{
      op_id: "state",
      params: %{"alarm_type" => state.alarm_type},
      payload: %{state | alarm_sources: Map.keys(state.alarm_sources)}
    }
  end

  defp error_message(_state, reason) do
    dbg("ERROR TODO")
    %Message{op_id: "error", payload: %{"reason" => reason}}
  end
end
