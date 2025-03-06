defmodule Asyncapi.Broker do
  @type asyncapi :: term
  @type state :: term

  @callback connect(asyncapi) :: {:ok, state}
  @callback publish(state, Asyncapi.Message.t()) :: :ok
end
