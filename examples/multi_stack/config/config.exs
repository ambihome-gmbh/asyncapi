import Config

config :logger, :console, format: "[$level] $message\n"
config :asyncapi, schema_root: "priv/schema/bundled/"

import_config "#{config_env()}.exs"
