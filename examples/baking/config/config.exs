import Config

config :asyncapi,
  broker: Asyncapi.Broker.Dummy,
  schemas: [
    service: Path.expand("priv/schema/bundled/service_schema.json"),
    user: Path.expand("priv/schema/bundled/user_schema.json")
  ]
