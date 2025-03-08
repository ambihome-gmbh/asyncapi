import Config

config :asyncapi,
  broker: Asyncapi.Broker.Dummy,
  schemas: [
    multistack_service: Path.expand("priv/schema/bundled/service.json"),
    multistack_user: Path.expand("priv/schema/bundled/user.json")
  ]
