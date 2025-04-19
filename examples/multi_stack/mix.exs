defmodule MultiStack.MixProject do
  use Mix.Project

  def project do
    [
      app: :multi_stack,
      version: "0.1.0",
      elixir: "~> 1.18",
      start_permanent: Mix.env() == :dev,
      deps: deps(),
      elixirc_paths: elixirc_paths(Mix.env())
    ]
  end

  def application do
    [
      extra_applications: [:logger],
      mod: mod(Mix.env())
    ]
  end

  defp deps do
    [
      {:uniq, "~> 0.6"},
      {:asyncapi, path: "../.."}
    ]
  end

  # TODO @BM - ist das OK?
  defp mod(:dev), do: {MultiStackApplication, []}
  defp mod(_), do: []

  defp elixirc_paths(:test), do: ["lib", "test/multi_stack/support"]
  defp elixirc_paths(_), do: ["lib"]
end
