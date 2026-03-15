defmodule MultiStack.Application do
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children =
      if Application.get_env(:multi_stack, :start_service, true) do
        [MultiStack]
      else
        []
      end

    opts = [strategy: :one_for_one, name: MultiStack.Supervisor]
    Supervisor.start_link(children, opts)
  end
end
