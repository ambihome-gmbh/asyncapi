defmodule Asyncapi.Helpers do
  def reply(%Asyncapi.Message{} = response, state), do: {:reply, [response], state}
  def reply([%Asyncapi.Message{} | _] = responses, state), do: {:reply, responses, state}
  def reply([], state), do: {:noreply, state}
  def reply(unexpected, _), do: raise("expected message(s), got #{inspect(unexpected)}")
  def noreply(state), do: {:noreply, state}
end
