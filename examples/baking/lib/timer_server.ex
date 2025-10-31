defmodule TimeServer do
  def schedule_timeout(target, config) do
    GenServer.cast(__MODULE__, {:schedule_timeout, %{target: target, config: config}})
  end

  def schedule_cron(target, config) do
    GenServer.cast(__MODULE__, {:schedule_cron, %{target: target, config: config}})
  end
end
