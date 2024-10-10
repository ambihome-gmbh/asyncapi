defmodule MqttAsyncapi.Message do
  import Enum

  @type t :: %__MODULE__{}
  defstruct name: nil,
            parameters: %{},
            payload: %{},
            direction: nil

  def to_mqtt_message(%__MODULE__{} = message, schema, message_names_to_channel) do
    %{name: name} = message
    channel_key = message_names_to_channel[name]
    channel = schema.schema["channels"][channel_key]

    message_schema = AsyncApi.resolve_schema(schema, channel[message.direction]["message"])
    payload_schema = AsyncApi.resolve_schema(schema, message_schema["payload"])

    # dbg({channel_key, channel, message_schema, payload_schema})

    if payload_schema do
      payload_validation =
        ExJsonSchema.Validator.validate_fragment(schema, payload_schema, message.payload)

      case payload_validation do
        :ok ->
          %{
            topic: interpolate_parameters(channel_key, message.parameters),
            payload: Jason.encode!(message.payload)
          }

        error ->
          raise(inspect(error))
      end
    else
      dbg("!!!! NO PAYLOAD SCHEMA !!!!")

      %{topic: "ERROR_MAAPI", payload: "NO PAYLOAD SCHEMA"}
    end
  end

  def interpolate_parameters(channel_key, parameters) do
    reduce(parameters, channel_key, fn {p, v}, topic -> String.replace(topic, "{#{p}}", v) end)
  end
end
