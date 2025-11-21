defmodule Baking.Application do
  use Application

  @impl true
  def start(_type, _args) do
    children = [
      {TimeServer, []},
      Baking
    ]

    opts = [strategy: :one_for_one, name: Baking.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
