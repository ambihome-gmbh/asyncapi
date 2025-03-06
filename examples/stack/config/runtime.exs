import Config

config :asyncapi,
  schemas: [
    stack_service: Application.app_dir(:stack, "schema/service_schema.json"),
    stack_user: Application.app_dir(:stack, "schema/user_schema.json")
  ]
