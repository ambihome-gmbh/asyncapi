defmodule TimeToCrontabTest do
  use ExUnit.Case

  import Enum
  import TimeServer

  @sun_times %{
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

  test "time_add" do
    assert {~T[00:30:00], +1} == time_add(~T[23:30:00], +60)
    assert {~T[14:30:00], +0} == time_add(~T[13:30:00], +60)
    assert {~T[12:30:00], +0} == time_add(~T[13:30:00], -60)
    assert {~T[23:30:00], -1} == time_add(~T[00:30:00], -60)
  end

  test "weekday_add" do
    assert 0 == weekday_add(0, 0)
    assert 1 == weekday_add(0, 1)
    assert 6 == weekday_add(0, -1)
    assert 0 == weekday_add(6, 1)
    assert 5 == weekday_add(6, -1)
  end

  test "get_crontab" do
    assert "30 23 * * 1,6" == get_crontab("00:30:00Z", -60, [0, 2])
    assert "30 14 * * 0,2" == get_crontab("13:30:00Z", +60, [0, 2])
    assert "30 0 * * 0,2" == get_crontab("23:30:00Z", +60, [1, 6])
  end

  test "random" do
    # NOTE: use plot.py to plot the distribution
    map(0..1_000, fn _ -> random(1, "normal") end)
    |> Jason.encode!()
    |> then(fn data -> File.write("random.json", data) end)
  end

  test "config to crontab" do
    config_abs = %{
      "weekdays" => [0, 1, 2, 5, 6],
      "type" => "absolute_time",
      "time" => "00:30:00Z",
      "random_offset" => 60,
      "random_type" => "testmode_sub"
    }

    config_sun = %{
      "weekdays" => [0, 1, 2, 5, 6],
      "type" => "sun",
      "sun_event" => "sunset",
      "absolute_offset" => -60,
      "random_offset" => 30,
      "random_type" => "testmode_add"
    }

    assert "30 23 * * 0,1,4,5,6" == config_to_crontab(config_abs)
    assert "30 23 * * 0,1,4,5,6" == config_to_crontab(config_sun, @sun_times)
  end
end
