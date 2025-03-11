defmodule TimeServer do
  use GenServer

  # def start_link(_) do
  #   GenServer.start_link(__MODULE__, %{}, name: __MODULE__)
  # end

  def schedule_timeout(target, config) do
    GenServer.cast(__MODULE__, {:schedule_timeout, %{target: target, config: config}})
  end

  def schedule_cron(target, config) do
    GenServer.cast(__MODULE__, {:schedule_cron, %{target: target, config: config}})
  end

  # TODO
  # def cancel_timeout(target) do
  #   GenServer.cast(__MODULE__, {:cancel_timeout, %{target: target}})
  # end

  # def init(state) do
  #   {:ok, state}
  # end

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
end
