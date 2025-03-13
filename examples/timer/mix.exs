defmodule Timer.MixProject do
  use Mix.Project

  def project do
    [
      app: :timer,
      version: "0.1.0",
      elixir: "~> 1.18",
      start_permanent: Mix.env() == :prod,
      deps: deps()
    ]
  end

  def application do
    []
  end

  defp deps do
    [
     
      {:uniq, "~> 0.6"},
      {:asyncapi, path: "../.."}
    ]
  end
end
