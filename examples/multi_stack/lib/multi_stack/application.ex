defmodule MultiStack.Application do
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [MultiStack.Service]

    opts = [strategy: :one_for_one, name: Panex.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
