defmodule Timer do
  use MqttAsyncapi, schema: :tim_service

  alias Asyncapi.Message
  import Asyncapi.Helpers
  alias TimerApi.Payload

  def start_link(opts \\ []) do
    MqttAsyncapi.start_link(__MODULE__, opts)
  end

  @sun_times_dummy %{
    "morning_astronomical_twilight" => "00:00:00Z",
    "morning_nautical_twilight" => "00:00:00Z",
    "morning_civil_twilight" => "00:00:00Z",
    "sunrise" => "00:00:00Z",
    "midday" => "00:00:00Z",
    "sunset" => "00:00:00Z",
    "evening_civil_twilight" => "00:00:00Z",
    "evening_nautical_twilight" => "00:00:00Z",
    "evening_astronomical_twilight" => "00:00:00Z"
  }

  @temp_dummy_geo for(d <- 1..366, into: %{}, do: {d, @sun_times_dummy})

  @impl true
  def init(_opts) do
    {:ok, %{timers: %{}, geo: @temp_dummy_geo}}
  end

  @impl true
  def handle_message(%Message{} = message, state) do
    case message.op_id do
      "create" -> create_or_update(state, message.payload)
      "update" -> create_or_update(state, message.payload, message.params.timer_id)
      "activate" -> set_flag(state, message.params.timer_id, :active, true)
      "deactivate" -> set_flag(state, message.params.timer_id, :active, false)
      "delete" -> set_flag(state, message.params.timer_id, :deleted, true)
      _ -> noreply(state)
    end
  end

  @impl true
  def handle_info({:timeout, %{id: timer_id}}, state) do
    fire(state, timer_id)
  end

  # ---

  defp fire(state, timer_id) do
    case fetch_timer(state, timer_id) do
      {:error, _} ->
        raise "internal error: timer not found"

      {:ok, timer} ->
        response = %Message{
          op_id: "dp_write_req",
          payload: %Payload.DpWrite{id: timer.channel, value: timer.value}
        }

        maybe_create_cron(state, timer)

        reply(response, state)
    end
  end

  defp create_or_update(state, payload, timer_id \\ Uniq.UUID.uuid6()) do
    timer = payload |> Map.from_struct() |> Map.put(:id, timer_id)
    update_(state, timer)
  end

  defp set_flag(state, timer_id, flag, set?) do
    case fetch_timer(state, timer_id) do
      {:error, msg} -> error(state, msg)
      {:ok, timer} -> update_(state, Map.put(timer, flag, set?))
    end
  end

  defp update_(state, timer) do
    new_state =
      state
      |> put_timer(timer)
      |> delete_pending_cron(timer)
      |> maybe_create_cron(timer)

    reply(info_state_message(timer), new_state)
  end

  defp fetch_timer(state, timer_id) do
    case Map.get(state.timers, timer_id) do
      nil -> {:error, :unknown_timer}
      %{deleted: true} -> {:error, :attempt_to_access_deleted_timer}
      timer -> {:ok, timer}
    end
  end

  defp error(state, msg) do
    reply(%Message{op_id: "error", payload: %{message: msg}}, state)
  end

  defp delete_pending_cron(state, timer) do
    TimeServer.delete_cron(timer.id)
    state
  end

  defp maybe_create_cron(state, %{active: false}), do: state
  defp maybe_create_cron(state, %{deleted: true}), do: state
  defp maybe_create_cron(state, timer), do: create_cron(state, timer)

  defp create_cron(state, timer) do
    # TODO signatur fuer call sollte anders sein
    {:day_of_year, %{day_of_year: day_of_year}} = TimeServer.get_day_of_year()
    geo_today = Map.fetch!(state.geo, day_of_year)
    TimeServer.create_cron_from_timer_config(timer, geo_today)
    state
  end

  # -- TODO --> database
  defp put_timer(state, timer) do
    put_in(state, [:timers, timer.id], timer)
  end

  # get_all_states
  # get_state

  defp info_state_message(timer) do
    %Message{op_id: "state", params: %{timer_id: timer.id}, payload: timer}
  end
end
