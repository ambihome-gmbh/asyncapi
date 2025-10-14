defmodule Asyncapi.Message do
  import Enum

  @type t :: %__MODULE__{}
  defstruct op_id: nil,
            params: %{},
            payload: %{},
            retain: false,
            qos: 0

  def from_mqtt_message(mqtt_message, asyncapi) do
    %{schema: schema, operations: operations} = asyncapi
    %{topic: topic, payload: payload} = mqtt_message

    with {:ok, operation} <- Asyncapi.find_operation(topic, operations),
         params = Regex.named_captures(operation.regex, topic),
         :ok <- Asyncapi.validate_parameters(params, operation, schema),
         :ok <- Asyncapi.validate_payload(payload, operation, schema) do
      {
        :ok,
        %__MODULE__{
          op_id: operation.id,
          params: params,
          payload: payload
        }
      }
    else
      # TO-DO-1
      error -> error
    end
  end

  def to_mqtt_message!(%__MODULE__{} = message, asyncapi) do
    %{schema: schema, operations: operations} = asyncapi
    %{op_id: op_id, params: params, payload: payload} = message

    with {:ok, operation} <- fetch_operation(operations, op_id),
         :ok <- Asyncapi.check_for_missing_or_unexpected_parameters(params, operation),
         :ok <- Asyncapi.validate_parameters(params, operation, schema),
         :ok <- Asyncapi.validate_payload(payload, operation, schema) do
      # TODO recursively set defaults from schema!
      # dbg(operation.payload_schema)

      %{
        topic: interpolate_parameters(operation.address, params),
        payload: payload,
        qos: message.qos,
        retain: message.retain
      }
    else
      error -> raise(inspect(error))
    end
  end

  def decode_mqtt_message(mqtt_message) do
    %{mqtt_message | payload: Jason.decode!(mqtt_message.payload)}
  end

  def encode_mqtt_message(mqtt_message) do
    %{mqtt_message | payload: Jason.encode!(mqtt_message.payload)}
  end

  defp fetch_operation(operations, op_id) do
    case Map.fetch(operations, op_id) do
      :error -> {:error, :operation_not_found, op_id}
      ok -> ok
    end
  end

  defp interpolate_parameters(address, params) do
    reduce(params, address, fn {p, v}, topic -> String.replace(topic, "{#{p}}", v) end)
  end

  # defp to_string_map(map_) do
  #   Map.new(map_, fn {k, v} -> {"#{k}", v} end)
  # end
end
