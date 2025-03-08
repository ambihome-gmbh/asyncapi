defmodule MultiStack.MixProject do
  use Mix.Project

  def project do
    [
      app: :multi_stack,
      version: "0.1.0",
      elixir: "~> 1.18",
      start_permanent: Mix.env() == :prod,
      deps: deps()
    ]
  end

  def application do
    [
      extra_applications: [:logger]
    ]
  end

  defp deps do
    [
      {:uniq, "~> 0.6"},
      {:asyncapi, path: "../.."}
    ]
  end
end
