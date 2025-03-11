import Config

config :asyncapi,
  schemas: [
    service: Application.app_dir(:baking, "schema/service_schema.json"),
    user: Application.app_dir(:baking, "schema/user_schema.json")
  ]
