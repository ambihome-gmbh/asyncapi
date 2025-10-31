defmodule Baking.MixProject do
  use Mix.Project

  def project do
    [
      app: :baking,
      version: "0.1.0",
      elixir: "~> 1.17",
      start_permanent: Mix.env() == :dev,
      deps: deps(),
      elixirc_paths: elixirc_paths(Mix.env())
    ]
  end

  def application do
    []
  end

  defp deps do
    [
      {:asyncapi, path: "../.."}
    ]
  end

  defp elixirc_paths(:test), do: ["lib", "test/support"]
  defp elixirc_paths(_), do: ["lib"]
end
