import Config

config :logger, level: :info
config :logger, :console, format: "$time $metadata[$level] $message\n"

config :asyncapi, schemas: [test: "test/schema/schema.json"]

case config_env() do
  :test ->
    # config :ex_json_schema,
    #        :remote_schema_resolver,
    #        fn path ->
    #          "test/schema/#{path}" |> File.read!() |> Jason.decode!()
    #        end

    config :asyncapi, broker: Asyncapi.Broker.Dummy

  _ ->
    nil
    # config :ex_json_schema,
    #        :remote_schema_resolver,
    #        fn path ->
    #          "#{:code.priv_dir(:asyncapi)}/schema/#{path}" |> File.read!() |> Jason.decode!()
    #        end
end
