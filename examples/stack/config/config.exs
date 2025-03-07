import Config

config :asyncapi,
  broker: Asyncapi.Broker.Dummy,
  schemas: [
    stack_service: Path.expand("priv/schema/bundled/service_schema.json"),
    stack_user: Path.expand("priv/schema/bundled/user_schema.json")
  ]
