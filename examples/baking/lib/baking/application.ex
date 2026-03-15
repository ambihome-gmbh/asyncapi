defmodule Baking.Application do
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children =
      if Application.get_env(:baking, :start_service, true) do
        [{TimeServer, []}, Baking]
      else
        []
      end

    opts = [strategy: :one_for_one, name: Baking.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
