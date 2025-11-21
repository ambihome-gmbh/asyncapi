defmodule Asyncapi do
  import Enum
  alias ExJsonSchema.Validator

  defstruct [:schema, :subscriptions, :operations, :server]

  def find_operation(topic, operations) do
    matching_operations =
      operations
      |> Map.values()
      |> filter(&Regex.match?(&1.regex, topic))

    case matching_operations do
      [] ->
        {:error, :no_matching_operation}

      [operation] ->
        {:ok, operation}

      [_, _ | _] = ambiguous_operations ->
        operations_ids = map(ambiguous_operations, & &1.id)
        {:error, {:ambiguous_operation, operations_ids, topic}}
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
    result = Validator.validate_fragment(schema, parameter_schema, value)
    result
  end

  def validate_payload(payload, operation, schema) do
    # AH-1698/asyncapi-struct-generator
    # HACK
    payload = payload |> Jason.encode!() |> Jason.decode!()

    case Validator.validate_fragment(schema, operation.payload_schema, payload) do
      :ok ->
        :ok

      {:error, msg} ->
        {:error, :payload_validation_error, msg, operation.id, payload}
    end
  end

  def load(schema_path, schema_module) do
    schema = schema_path |> File.read!() |> Jason.decode!() |> ExJsonSchema.Schema.resolve()

    operations =
      for {op_id, operation} <- schema.schema["operations"], into: %{} do
        channel =
          operation["channel"] |> resolve_schema(schema) |> load_channel(schema, schema_module)

        {op_id, Map.merge(channel, %{id: op_id, action: operation["action"]})}
      end

    subscriptions =
      operations
      |> Map.values()
      |> filter(&(&1.action == "receive"))
      |> map(&Regex.replace(~r/\{([^}]*)\}/, &1.address, "+"))

    if not (!!schema.schema["servers"]["production"]),
      do: raise("need a server/production. TODO meta-schema.")

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

  defp load_channel(channel, schema, schema_module) do
    messages =
      case channel["messages"] do
        nil ->
          raise("channel #{inspect(channel)} of #{schema_module} must have messages. TODO meta-schema.")

        messages ->
          to_list(messages)
      end

    if length(messages) != 1,
      do: raise("only exactly one message per channel is supported for now. TODO meta-schema.")

    [{message_key, message}] = messages

    message_name =
      case message["name"] do
        nil -> message_key
        name -> name
      end

    module_name_parts = [schema_module, "MessagePayload", Recase.to_pascal(message_name)]

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
