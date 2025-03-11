defmodule Timers.MixProject do
  use Mix.Project

  def project do
    [
      app: :baking,
      version: "0.1.0",
      elixir: "~> 1.18",
      start_permanent: false,
      deps: deps()
    ]
  end

  def application do
    []
  end

  defp deps do
    [{:asyncapi, path: "../.."}]
  end
end
