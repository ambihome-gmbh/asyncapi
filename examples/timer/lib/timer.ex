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
      "update" -> create_or_update(state, message.payload, message.params.id)
      "activate" -> update_active_flag(state, message.params.timer_id, true)
      "deactivate" -> update_active_flag(state, message.params.timer_id, false)
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

        create_cron_if_active(state, timer)
        reply(response, state)
    end
  end

  defp create_or_update(state, payload, timer_id \\ Uniq.UUID.uuid6()) do
    timer = payload |> Map.from_struct() |> Map.put(:id, timer_id)
    update_(state, timer)
  end

  defp update_active_flag(state, timer_id, active?) do
    case fetch_timer(state, timer_id) do
      {:error, _} -> raise "todo impl error msg"
      {:ok, timer} -> update_(state, %{timer | active: active?})
    end
  end

  defp update_(state, timer) do
    new_state =
      state
      |> put_timer(timer)
      |> delete_pending_cron(timer)
      |> create_cron_if_active(timer)

    reply(info_state_message(timer), new_state)
  end

  defp fetch_timer(state, timer_id) do
    case Map.get(state.timers, timer_id) do
      nil -> {:error, :unknown_timer}
      timer -> {:ok, timer}
    end
  end

  defp delete_pending_cron(state, timer) do
    TimeServer.delete_cron(timer.id)
    state
  end

  defp create_cron_if_active(state, %{active: false}) do
    state
  end

  defp create_cron_if_active(state, timer) do
    day_of_year = Date.utc_today() |> Date.day_of_year()
    geo_today = state.geo[day_of_year]
    TimeServer.create_cron_from_timer_config(timer, geo_today)
    state
  end

  # -- TODO --> database
  defp put_timer(state, timer) do
    put_in(state, [:timers, timer.id], timer)
  end

  # get_all_states
  # get_state

  # delete

  defp info_state_message(timer) do
    %Message{
      op_id: "state",
      params: %{timer_id: timer.id},
      # TODO struct
      payload: timer
    }
  end
end
