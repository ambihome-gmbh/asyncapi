import Config

config :asyncapi,
  broker: Asyncapi.Broker.Dummy,
  schemas: [
    stack_service: Path.expand("priv/schema/service_schema.json"),
    stack_user: Path.expand("priv/schema/user_schema.json")
  ]
