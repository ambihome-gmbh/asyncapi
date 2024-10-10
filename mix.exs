defmodule Asyncapi.MixProject do
  use Mix.Project

  def project do
    [
      app: :asyncapi,
      version: "0.1.0",
      elixir: "~> 1.17",
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
      {:jason, "~> 1.4"},
      {:ex_json_schema, "~> 0.10.2"},
      {:emqtt,
       git: "https://github.com/emqx/emqtt.git",
       tag: "1.13.1",
       system_env: [{"BUILD_WITHOUT_QUIC", "1"}]}
    ]
  end
end
