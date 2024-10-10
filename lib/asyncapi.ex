defmodule AsyncApi do
  import Enum

  alias ExJsonSchema.Validator

  def load(schema_path) do
    schema_path |> File.read!() |> Jason.decode!() |> ExJsonSchema.Schema.resolve()
  end

  def validate_message(schema, channel_regexs, %{payload: payload} = message)
      when is_binary(payload) do
    case Jason.decode(payload) do
      {:ok, payload} -> validate_message(schema, channel_regexs, %{message | payload: payload})
      {:error, _} = error -> error
    end
  end

  def validate_message(schema, channel_regexs, message) do
    case find(channel_regexs, &Regex.match?(&1.re, message.topic)) do
      %{key: channel_key, re: re} ->
        channel = schema.schema["channels"][channel_key]

        parameter_values = Regex.named_captures(re, message.topic)

        parameter_validations =
          for {name, value} <- parameter_values do
            parameter_schema = resolve_schema(schema, channel["parameters"][name], ["schema"])
            validation = Validator.validate_fragment(schema, parameter_schema, value)
            {"parameter: '#{name}'", validation}
          end

        message_schema = resolve_schema(schema, channel[message.direction]["message"])
        payload_schema = resolve_schema(schema, message_schema["payload"])

        if payload_schema do
          payload_validation =
            Validator.validate_fragment(schema, payload_schema, message.payload)

          validation_errors =
            (parameter_validations ++ [{"payload", payload_validation}])
            |> reject(fn {_, validation_result} -> validation_result == :ok end)
            |> Map.new()

          if validation_errors == %{} do
            {
              :ok,
              %MqttAsyncapi.Message{
                name: message_schema["name"],
                parameters: parameter_values,
                payload: message.payload,
                direction: message.direction
              }
            }
          else
            {:error, validation_errors}
          end
        else
          {:error, :action_unsupported_for_topic}
        end

      nil ->
        {:error, :unknown}
    end
  end

  def get_channel_regexs(channels) do
    for {channel_key, _} <- channels do
      re = Regex.replace(~r/\{([^}]*)\}/, channel_key, "(?<\\1>[a-zA-Z0-9_-]+)")
      %{key: channel_key, re: Regex.compile!("^#{re}$")}
    end
  end

  def get_message_names_to_channel(schema, direction) do
    for {channel_key, channel} <- schema["channels"],
        name = channel[direction]["message"]["name"],
        into: %{} do
      {name, channel_key}
    end
  end

  def get_subscriptions(schema, direction) do
    for {channel_key, channel} <- schema["channels"],
        _ = channel[direction] do
      Regex.replace(~r/\{([^}]*)\}/, channel_key, "+")
    end
  end

  def get_action(:send, :application), do: "subscribe"
  def get_action(:receive, :application), do: "publish"
  def get_action(:send, :client), do: "publish"
  def get_action(:receive, :client), do: "subscribe"

  # TODO sollte in lib vorhanden sein
  def resolve_schema(schema, schema_or_ref, path \\ []) do
    case {schema_or_ref, path} do
      {%{"$ref" => ref}, _} -> ExJsonSchema.Schema.get_fragment!(schema, ref ++ path)
      {schema, []} -> schema
      {schema, path} -> get_in(schema, path)
    end
  end
end
