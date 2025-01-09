import Config

config :ex_json_schema,
       :remote_schema_resolver,
       fn path ->
         "#{:code.priv_dir(:asyncapi)}/schema/simple/#{path}" |> File.read!() |> Jason.decode!()
       end

config :logger, level: :info
config :logger, :console, format: "$time $metadata[$level] $message\n"
