import Config

config :asyncapi,
  broker: Asyncapi.Broker.Dummy,
  schemas: [
    datapoints_service: Path.expand("priv/schema/bundled/datapoints_service.json"),
    alarm_service: Path.expand("priv/schema/bundled/alarm_service.json"),
    test_user: Path.expand("priv/schema/bundled/test_user.json")
  ]
