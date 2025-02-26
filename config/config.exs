import Config

config :logger, level: :info
config :logger, :console, format: "$time $metadata[$level] $message\n"

case config_env() do
  :test ->
    config :ex_json_schema,
           :remote_schema_resolver,
           fn path ->
             "test/schema/#{path}" |> File.read!() |> Jason.decode!()
           end

  _ ->
    config :ex_json_schema,
           :remote_schema_resolver,
           fn path ->
             "#{:code.priv_dir(:asyncapi)}/schema/#{path}" |> File.read!() |> Jason.decode!()
           end
end
