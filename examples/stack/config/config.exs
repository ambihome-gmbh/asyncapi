import Config

config :asyncapi, schema_root: "priv/schema/bundled/"
config :asyncapi, broker: Asyncapi.Broker.Dummy
