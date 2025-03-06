import Config

config :asyncapi,
  broker: Asyncapi.Broker.Dummy,
  schemas: [
    multistack_service: Path.expand("priv/schema/service_schema.json"),
    multistack_user: Path.expand("priv/schema/user_schema.json")
  ]
