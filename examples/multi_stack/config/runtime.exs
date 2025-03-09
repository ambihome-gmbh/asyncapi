import Config

config :asyncapi,
  schemas: [
    multistack_service: Application.app_dir(:multi_stack, "schema/service_schema.json"),
    multistack_user: Application.app_dir(:multi_stack, "schema/user_schema.json"),
  ]
