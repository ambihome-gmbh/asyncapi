defmodule MqttAsyncapi.Message do
  import Enum

  @type t :: %__MODULE__{}
  defstruct operation_id: nil,
            parameters: %{},
            payload: %{},
            retain: false,
            qos: 0

  def from_mqtt_message(mqtt_message, asyncapi) do
    # dbg(mqtt_message)
    %{schema: schema, operations: operations} = asyncapi
    %{topic: topic, payload: payload} = mqtt_message

    with {:ok, operation} <- AsyncApi.find_operation(topic, operations),
         parameters = Regex.named_captures(operation.regex, topic),
         :ok <- AsyncApi.validate_parameters(parameters, operation, schema),
         {:ok, payload} <- Jason.decode(payload),
         :ok <- AsyncApi.validate_payload(payload, operation, schema) do
      {
        :ok,
        %__MODULE__{
          operation_id: operation.id,
          parameters: parameters,
          payload: payload
        }
      }
    end
  end

  def to_mqtt_message!(%__MODULE__{} = message, asyncapi) do
    %{schema: schema, operations: operations} = asyncapi
    %{operation_id: operation_id, parameters: parameters, payload: payload} = message

    with {:ok, operation} <- fetch_operation(operations, operation_id),
         :ok <- AsyncApi.check_for_missing_or_unexpected_parameters(parameters, operation),
         :ok <- AsyncApi.validate_parameters(parameters, operation, schema),
         :ok <- AsyncApi.validate_payload(payload, operation, schema) do
      %{
        topic: interpolate_parameters(operation.address, parameters),
        payload: Jason.encode!(message.payload),
        qos: message.qos,
        retain: message.retain
      }
    else
      error -> raise(inspect(error))
    end
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
end
