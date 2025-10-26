import Config

config :logger, level: :info
config :logger, :console, format: "$time $metadata[$level] $message\n"

config :asyncapi, schema_root: "test/schema/"

case config_env() do
  :test -> config :asyncapi, broker: Asyncapi.Broker.Dummy
  _ -> nil
end
