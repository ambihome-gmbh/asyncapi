import Config

config :ex_json_schema,
       :remote_schema_resolver,
       fn url -> url |> File.read!() |> Jason.decode!() end
