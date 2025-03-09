import Config

config :asyncapi,
  broker: Asyncapi.Broker.Dummy,
  schemas: [
    datapoints_service: Path.expand("priv/schema/bundled/datapoints_service.json"),
    scenes_service: Path.expand("priv/schema/bundled/scenes_service.json"),
    test_user: Path.expand("priv/schema/bundled/test_user.json")
  ]
