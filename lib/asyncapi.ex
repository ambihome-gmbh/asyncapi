defmodule Asyncapi do
  import Enum
  alias ExJsonSchema.Validator

  defstruct [:schema, :subscriptions, :operations, :server]

  def find_operation(topic, operations) do
    operations
    |> Map.values()
    |> find(&Regex.match?(&1.regex, topic))
    |> case do
      nil -> {:error, :no_matching_operation}
      operation -> {:ok, operation}
    end
  end

  def check_for_missing_or_unexpected_parameters(parameter_values, operation) do
    expected = Map.keys(operation.parameter_schemas)
    actual = Map.keys(parameter_values)

    case {expected -- actual, actual -- expected} do
      {[], []} -> :ok
      {[_ | _] = missing, _} -> {:error, {:missing_parameters, missing}}
      {[], unexpected} -> {:error, {:unexpected_parameters, unexpected}}
    end
  end

  def validate_parameters(parameter_values, operation, schema) do
    parameter_validation_errors =
      for {name, value} <- parameter_values,
          validation_result = validate_parameter(name, value, operation, schema),
          :ok != validation_result do
        "parameter: '#{name}' - #{inspect(validation_result)}"
      end

    if parameter_validation_errors == [] do
      :ok
    else
      {:error, :parameter_validation_error, parameter_validation_errors}
    end
  end

  defp validate_parameter(name, value, operation, schema) do
    parameter_schema = operation.parameter_schemas[name]
    Validator.validate_fragment(schema, parameter_schema, value)
  end

  def validate_payload(payload, operation, schema) do
    case Validator.validate_fragment(schema, operation.payload_schema, payload) do
      :ok -> :ok
      {:error, msg} -> {:error, :payload_validation_error, msg, payload}
    end
  end

  def load(schema_path) do
    schema = schema_path |> File.read!() |> Jason.decode!() |> ExJsonSchema.Schema.resolve()

    operations =
      for {op_id, operation} <- schema.schema["operations"], into: %{} do
        channel = operation["channel"] |> resolve_schema(schema) |> load_channel(schema)
        {op_id, Map.merge(channel, %{id: op_id, action: operation["action"]})}
      end

    subscriptions =
      operations
      |> Map.values()
      |> filter(&(&1.action == "receive"))
      |> map(&Regex.replace(~r/\{([^}]*)\}/, &1.address, "+"))

    server = resolve_schema(schema.schema["servers"]["production"], schema)
    "mqtt" = server["protocol"]
    host = to_charlist(server["host"])
    port = server |> get_in(["variables", "port", "default"]) |> String.to_integer()

    %__MODULE__{
      server: %{host: host, port: port},
      schema: schema,
      subscriptions: subscriptions,
      operations: operations
    }
  end

  defp load_channel(channel, schema) do
    # NOTE: asyncapi allows multiple message, but we support only exactly one
    [{_, message}] = to_list(channel["messages"])

    module_name_parts = [
      Recase.to_pascal(schema.schema["info"]["title"]),
      "Payload",
      Recase.to_pascal(message["name"])
    ]

    payload_schema = message |> resolve_schema(schema) |> Map.get("payload")

    parameter_schemas =
      for {parameter_name, parameter} <- Map.get(channel, "parameters", []), into: %{} do
        schema =
          case resolve_schema(parameter, schema)["enum"] do
            nil -> %{"type" => "string"}
            enum -> %{"type" => "string", "enum" => enum}
          end

        {parameter_name, schema}
      end

    regex = Regex.replace(~r/\{([^}]*)\}/, channel["address"], "(?<\\1>[a-zA-Z0-9_-]+)")

    %{
      payload_module_name: Module.concat(module_name_parts),
      address: channel["address"],
      payload_schema: payload_schema,
      parameter_schemas: parameter_schemas,
      regex: Regex.compile!("^#{regex}$")
    }
  end

  # NOTE: while ex_json_schema will automatically resolve refs when validating,
  #   we need this to directly access some parts of the schema
  defp resolve_schema(fragment_or_ref, schema) do
    case fragment_or_ref do
      %{"$ref" => ref} -> ExJsonSchema.Schema.get_fragment!(schema, ref)
      fragment -> fragment
    end
  end
end
