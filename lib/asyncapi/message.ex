defmodule Asyncapi.Message do
  import Enum

  @type t :: %__MODULE__{}
  defstruct operation_id: nil,
            parameters: %{},
            payload: %{},
            retain: false,
            qos: 0

  def from_mqtt_message(mqtt_message, asyncapi) do
    %{schema: schema, operations: operations} = asyncapi
    %{topic: topic, payload: payload} = mqtt_message

    with {:ok, operation} <- Asyncapi.find_operation(topic, operations),
         parameters = Regex.named_captures(operation.regex, topic),
         :ok <- Asyncapi.validate_parameters(parameters, operation, schema),
         :ok <- Asyncapi.validate_payload(payload, operation, schema) do
      {
        :ok,
        %__MODULE__{
          operation_id: operation.id,
          parameters: to_atom_map(parameters),
          payload: struct(operation.payload_module_name, to_atom_map(payload))
        }
      }
    else
      # TODO handling of invalid messages from outside, cant just raise
      error -> error
    end
  end

  def to_mqtt_message!(%__MODULE__{} = message, asyncapi) do
    %{schema: schema, operations: operations} = asyncapi
    %{operation_id: operation_id, parameters: parameters, payload: payload} = message

    payload =
      case payload do
        %{__struct__: _} -> Map.from_struct(payload)
        _ -> payload
      end

    payload = to_string_map(payload)
    parameters = to_string_map(parameters)

    with {:ok, operation} <- fetch_operation(operations, operation_id),
         :ok <- Asyncapi.check_for_missing_or_unexpected_parameters(parameters, operation),
         :ok <- Asyncapi.validate_parameters(parameters, operation, schema),
         :ok <- Asyncapi.validate_payload(payload, operation, schema) do
      %{
        topic: interpolate_parameters(operation.address, parameters),
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

  defp fetch_operation(operations, operation_id) do
    case Map.fetch(operations, operation_id) do
      :error -> {:error, :operation_not_found, operation_id}
      ok -> ok
    end
  end

  defp interpolate_parameters(address, parameters) do
    reduce(parameters, address, fn {p, v}, topic -> String.replace(topic, "{#{p}}", v) end)
  end

  defp to_atom_map(map_) do
    Map.new(map_, fn {k, v} -> {String.to_atom(k), v} end)
  end

  defp to_string_map(map_) do
    Map.new(map_, fn {k, v} -> {"#{k}", v} end)
  end
end
