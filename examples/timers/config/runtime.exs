import Config

config :asyncapi,
  schemas: [
    service: Application.app_dir(:timers, "schema/service_schema.json"),
    user: Application.app_dir(:timers, "schema/user_schema.json")
  ]
