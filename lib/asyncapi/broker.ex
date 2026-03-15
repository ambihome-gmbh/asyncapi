defmodule Asyncapi.Broker do
  @moduledoc "Behaviour for message broker implementations (MQTT, Dummy)."
  @type asyncapi :: term
  @type state :: term
  @type mqtt_message :: %{topic: String.t(), payload: binary(), qos: non_neg_integer()}

  @callback connect(asyncapi, module()) :: {:ok, state}
  @callback publish(state, mqtt_message) :: :ok | {:error, term()}
  @callback subscribe_all(state, asyncapi, module()) :: :ok
end
