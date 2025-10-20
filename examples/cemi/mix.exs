defmodule Cemi.MixProject do
  use Mix.Project

  def project do
    [
      app: :cemi,
      version: "0.1.0",
      elixir: "~> 1.17",
      start_permanent: Mix.env() == :prod,
      deps: deps(),
      elixirc_paths: elixirc_paths(Mix.env())
    ]
  end

  def application do
    []
  end

  defp deps do
    [
      {:uniq, "~> 0.6"},
      {:asyncapi, path: "../.."},
      {:knx_cemi, path: "../../../__knx/knx_cemi"}
    ]
  end

  defp elixirc_paths(:test), do: ["lib", "test/support"]
  defp elixirc_paths(_), do: ["lib"]
end
