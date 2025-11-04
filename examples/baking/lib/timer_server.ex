defmodule TimeServer do
  def schedule_timeout(server \\ __MODULE__, target, config) do
    GenServer.cast(server, {:schedule_timeout, %{target: target, config: config}})
  end

  def schedule_cron(server \\ __MODULE__, target, config) do
    GenServer.cast(server, {:schedule_cron, %{target: target, config: config}})
  end
end
