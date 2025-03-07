import Config

config :logger, level: :info
config :logger, :console, format: "$time $metadata[$level] $message\n"

config :asyncapi, schemas: [test: "test/schema/schema.json"]

case config_env() do
  :test ->
    config :asyncapi, broker: Asyncapi.Broker.Dummy

  _ ->
    nil
end
