defmodule Project do
  def get_alarm_sources() do
    source_ids = ["ch1", "ch2"]
    values = Datapoints.get_all_values(source_ids)

    for {channel_id, value} <- values, into: %{} do
      {
        channel_id,
        %{
          alarm_condition: get_alarm_condition(channel_id),
          value: value
        }
      }
    end
  end

  def get_alarm_condition(_), do: "1"
end
