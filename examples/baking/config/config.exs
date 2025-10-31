import Config

config :logger, :console, format: "[$level] $message\n"
config :asyncapi, schema_root: "priv/schema/bundled/"
config :asyncapi, broker: Asyncapi.Broker.Dummy
