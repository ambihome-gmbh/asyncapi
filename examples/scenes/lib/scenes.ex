defmodule CoboServices.Scenes do
  use MqttAsyncapi, schema: :scenes_service

  import Enum

  alias Asyncapi.Message
  alias ScenesApi.Payload

  def start_link(opts \\ []) do
    MqttAsyncapi.start_link(__MODULE__, opts)
  end

  @impl true
  def init(_) do
    {:ok, %{scenes: load_scenes(), snaps: load_snaps()}}
  end

  @impl true
  def handle_message(%Message{op_id: "get_all_info"}, state) do
    responses = map(state.scenes, fn {_, scene} -> info_state_message(scene) end)
    reply(responses, state)
  end

  @impl true
  def handle_message(%Message{op_id: "get_info"} = message, state) do
    response =
      case fetch_scene(state, message.params.scene_id) do
        {:error, error} -> error_message(message, error)
        {:ok, scene} -> info_state_message(scene)
      end

    reply(response, state)
  end

  @impl true
  def handle_message(%Message{op_id: "add"} = message, state) do
    create_or_update(state, message.payload)
  end

  @impl true
  def handle_message(%Message{op_id: "update"} = message, state) do
    create_or_update(state, message.payload, message.params.scene_id)
  end

  @impl true
  def handle_message(%Message{op_id: "call"} = message, state) do
    {responses, state} = call_scene(state, message, :snap_normal)
    reply(responses, state)
  end

  @impl true
  def handle_message(%Message{op_id: "undo"} = message, state) do
    {responses, state} = call_scene(state, message, :snap_undo)
    reply(responses, state)
  end

  @impl true
  def handle_message(%Message{op_id: "learn"} = message, state) do
    {responses, new_state} =
      with {:ok, scene} <- fetch_scene(state, message.params.scene_id),
           :ok <- validate_ok(scene.fixed == false, :attempt_to_learn_fixed_scene) do
        {[], learn(state, scene, :snap_normal)}
      else
        {:error, error} -> {[error_message(message, error)], state}
      end

    reply(responses, new_state)
  end

  @impl true
  def handle_message(%Message{op_id: "delete"} = message, state) do
    case pop_in(state, [:scenes, message.params.scene_id]) do
      {nil, _} ->
        dbg("attempt to delete unknown scene #{message.params.scene_id}")
        noreply(state)

      {deleted_scene, new_state} ->
        response = %Message{
          op_id: "info_deleted",
          params: %{scene_id: deleted_scene.id}
        }

        reply([response], new_state)
    end
  end

  # ---

  defp fetch_scene(state, scene_id) do
    case Map.get(state.scenes, scene_id) do
      nil -> {:error, :unknown_scene}
      scene -> {:ok, scene}
    end
  end

  defp call_scene(state, peer_message, snap_type) do
    case fetch_scene(state, peer_message.params.scene_id) do
      {:ok, scene} ->
        {
          create_grpwrite_requests(state.snaps[snap_type][scene.id]),
          learn(state, scene, :snap_undo)
        }

      {:error, error} ->
        {
          [error_message(peer_message, error)],
          state
        }
    end
  end

  defp create_or_update(state, payload, scene_id \\ Uniq.UUID.uuid6()) do
    scene = payload |> Map.from_struct() |> Map.put(:id, scene_id)

    new_state =
      state
      |> put_scene(scene)
      |> learn(scene, :snap_normal)
      |> learn(scene, :snap_undo)

    reply(info_state_message(scene), new_state)
  end

  defp get_snapshot(member_channels) do
    # TODO
    Map.new(member_channels, &{&1, 0})
  end

  defp get_fixed(scene) do
    # TODO
    Map.new(scene.members, &{&1, scene.fixed_type})
  end

  # --- msgs
  defp error_message(_peer_message, _error) do
    %Message{
      op_id: "error",
      payload: %Payload.Error{}
    }
  end

  defp info_state_message(scene) do
    %Message{
      op_id: "info_state",
      params: %{scene_id: scene.id},
      # TODO struct
      payload: scene
    }
  end

  defp create_grpwrite_requests(_snapshot) do
    # map(snapshot, fn {member, value} -> grpwrite_request(member, value) end)
    # TODO
    []
  end

  # -- TODO --> database

  defp put_scene(state, scene) do
    put_in(state, [:scenes, scene.id], scene)
  end

  defp learn(state, %{fixed: true} = scene, :snap_normal) do
    put_in(state, [:snaps, :snap_normal, scene.id], get_fixed(scene))
  end

  defp learn(state, scene, snap_type) do
    put_in(state, [:snaps, snap_type, scene.id], get_snapshot(scene.member_channels))
  end

  # -- TODO <- database
  defp load_scenes() do
    %{}
  end

  defp load_snaps() do
    %{
      snap_normal: %{},
      snap_undo: %{}
    }
  end

  # --

  defp validate_ok(true, _), do: :ok
  defp validate_ok(false, error), do: {:error, error}

  defp reply(%Message{} = response, state), do: {:reply, [response], state}
  defp reply([%Message{} | _] = responses, state), do: {:reply, responses, state}
  defp reply(unexpected, _), do: raise("expected message(s), got #{inspect(unexpected)}")
  defp noreply(state), do: {:noreply, state}
end
