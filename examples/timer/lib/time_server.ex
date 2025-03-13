defmodule TimeServer do
  import Enum

  use GenServer

  def start_link(_) do
    GenServer.start_link(__MODULE__, %{}, name: __MODULE__)
  end

  def create_cron_from_timer_config(config, geo) do
    crontab = config_to_crontab(config, geo)
    GenServer.cast(__MODULE__, {:create_cron, %{crontab: crontab, id: config.id}})
  end

  def delete_cron(id) do
    GenServer.cast(__MODULE__, {:delete_cron, %{id: id}})
  end

  def utc_today() do
    GenServer.call(__MODULE__, :get_utc_today)
  end

  def get_day_of_year() do
    GenServer.call(__MODULE__, :get_day_of_year)
  end

  @impl true
  def init(state) do
    dbg(:init)
    {:ok, state}
  end

  @impl true
  def handle_call(:get_utc_today, _from, state) do
    dbg(:get_utc_today)
    {:reply, {:utc_today, %{utc_today: "DUMMY"}}, state}
  end

  @impl true
  def handle_call(:get_day_of_year, _from, state) do
    dbg(:get_day_of_year)
    day_of_year = Date.utc_today() |> Date.day_of_year()
    {:reply, {:day_of_year, %{day_of_year: day_of_year}}, state}
  end

  # def handle_cast({:schedule_timeout, parameters}, state) do
  #   _ = parameters
  #   raise("IMPL")
  #   {:noreply, state}
  # end

  # def handle_cast({:schedule_cron, parameters}, state) do
  #   _ = parameters
  #   raise("IMPL")
  #   {:noreply, state}
  # end

  def config_to_crontab(config, geo \\ nil)

  def config_to_crontab(%{type: "absolute_time"} = config, _geo) do
    %{
      weekdays: weekdays,
      time: time,
      random_offset: random_offset,
      random_type: random_type
    } = config

    get_crontab(time, random(random_offset, random_type), weekdays)
  end

  def config_to_crontab(%{type: "sun"} = config, sun_times) do
    %{
      weekdays: weekdays,
      sun_event: event,
      absolute_offset: offset,
      random_offset: random_offset,
      random_type: random_type
    } = config

    full_offset = offset + random(random_offset, random_type)
    get_crontab(sun_times[event], full_offset, weekdays)
  end

  def get_crontab(time_iso8601, offset, weekdays) do
    time = Time.from_iso8601!(time_iso8601)
    {time, dayshift} = time_add(time, offset)
    weekdays = weekdays |> map(&weekday_add(&1, dayshift)) |> sort() |> join(",")

    join([time.minute, time.hour, "*", "*", weekdays], " ")
  end

  def weekday_add(weekday, offset) do
    rem(weekday + offset + 7, 7)
  end

  def time_add(time, offset) do
    new_time = Time.add(time, offset, :minute)

    dayshift =
      case {Time.compare(new_time, time), offset > 0} do
        {:lt, true} -> +1
        {:gt, false} -> -1
        _ -> 0
      end

    {new_time, dayshift}
  end

  def random(0, _), do: 0
  def random(offset, "testmode_add"), do: +offset
  def random(offset, "testmode_sub"), do: -offset
  def random(offset, "uniform"), do: :rand.uniform() * offset
  def random(offset, "normal"), do: :rand.normal() * (offset / 3)
end
