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
