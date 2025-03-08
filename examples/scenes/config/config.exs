import Config

config :asyncapi,
  broker: Asyncapi.Broker.Dummy,
  schemas: [
    state_container_service: Path.expand("priv/schema/bundled/state_container_service.json"),
    service: Path.expand("priv/schema/bundled/scenes_service.json"),
    user: Path.expand("priv/schema/bundled/scenes_user.json")
  ]
