import Config

config :asyncapi, broker: Asyncapi.Broker.MQTT

config :logger,
  level: :info,
  truncate: 4096
