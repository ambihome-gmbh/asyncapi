defmodule Asyncapi.Helpers do
  def reply(%Asyncapi.Message{} = response, state), do: {:reply, [response], state}
  def reply([%Asyncapi.Message{} | _] = responses, state), do: {:reply, responses, state}
  # TODO ist das sinnvoll?
  #   -> ist jetzt so weil manchmal liste von msg generiert wird und die leer sein kann.
  #   -> wo? -> alarm service tests fail with this change
  # . scene service:
  # {responses, new_state} =
  #   with {:ok, scene} <- fetch_scene(state, scene_id),
  #        :ok <- validate_ok(scene["fixed"] == false, :attempt_to_learn_fixed_scene) do
  #     {[], learn(state, scene, :normal_snapshot)} <-- used here
  #   else
  #     {:error, error} -> {[error_message(message, error)], state}
  #   end
  #   reply(responses, new_state)

  # !!! das hat mich gerade gebissen, ein Test hat info-state erwartet nach learn und nach einem Blick auf den code dachte ich, dass das auch returned wird!

  def reply([], state), do: {:noreply, state}
  # def reply([], _state), do: raise("expected a nonempty list of messages")
  def reply(unexpected, _), do: raise("expected message(s), got #{inspect(unexpected)}")
  def noreply(state), do: {:noreply, state}
end
