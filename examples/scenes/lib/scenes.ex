defmodule ScenesService do
  use MqttAsyncapi, schema_module: ScenesSchema

  alias Asyncapi.Message
  import Asyncapi.Helpers

  import Enum

  def start_link(opts \\ []) do
    MqttAsyncapi.start_link(__MODULE__, opts)
  end

  @impl true
  def init(_) do
    IO.puts("scenes-service running.")
    {:ok, %{scenes: load_scenes(), snapshots: load_snaps()}}
  end

  @impl true
  def handle_message(%Message{op_id: "add"} = message, state) do
    create_or_update(state, message.payload)
  end

  @impl true
  def handle_message(%Message{op_id: "update"} = message, state) do
    %{params: %{"scene_id" => scene_id}} = message
    create_or_update(state, message.payload, scene_id)
  end

  @impl true
  def handle_message(%Message{op_id: "get_all_info"}, state) do
    # TODO! if there are no scenes, just nothing is sent.
    #   maybe it would be better to not send just arrays, but embed that into an object always.
    responses = map(state.scenes, fn {_, scene} -> info_state_message(scene) end)

    dbg({:get_all_info, responses})
    reply(responses, state)
  end

  @impl true
  def handle_message(%Message{op_id: "get_info"} = message, state) do
    %{params: %{"scene_id" => scene_id}} = message

    response =
      case fetch_scene(state, scene_id) do
        {:error, error} -> error_message(message, error)
        {:ok, scene} -> info_state_message(scene)
      end

    reply(response, state)
  end

  @impl true
  def handle_message(%Message{op_id: "call"} = message, state) do
    {responses, state} = call_scene(state, message, :normal_snapshot)
    reply(responses, state)
  end

  @impl true
  def handle_message(%Message{op_id: "undo"} = message, state) do
    {responses, state} = call_scene(state, message, :undo_snapshot)
    reply(responses, state)
  end

  @impl true
  def handle_message(%Message{op_id: "learn"} = message, state) do
    %{params: %{"scene_id" => scene_id}} = message

    {responses, new_state} =
      with {:ok, scene} <- fetch_scene(state, scene_id),
           :ok <- validate_ok(scene["fixed"] == false, :attempt_to_learn_fixed_scene) do
        {[], learn(state, scene, :normal_snapshot)}
      else
        {:error, error} -> {[error_message(message, error)], state}
      end

    reply(responses, new_state)
  end

  @impl true
  def handle_message(%Message{op_id: "delete"} = message, state) do
    %{params: %{"scene_id" => scene_id}} = message
    dbg({:delete, message})

    case pop_in(state, [:scenes, scene_id]) do
      {nil, _} ->
        dbg("TODO LOG: attempt to delete unknown scene #{scene_id}")
        noreply(state)

      {deleted_scene, new_state} ->
        response = %Message{
          op_id: "info_deleted",
          params: %{"scene_id" => deleted_scene["id"]}
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

  defp call_scene(state, peer_message, snapshot_type) do
    %{params: %{"scene_id" => scene_id}} = peer_message

    case fetch_scene(state, scene_id) do
      {:ok, scene} ->
        {
          Datapoints.create_fp_write_requests(state.snapshots[snapshot_type][scene["id"]]),
          learn(state, scene, :undo_snapshot)
        }

      {:error, error} ->
        raise("todo impl+test error message #{inspect(error)}")

        {
          [error_message(peer_message, error)],
          state
        }
    end
  end

  defp create_or_update(state, payload, scene_id \\ Uniq.UUID.uuid6()) do
    scene = Map.put(payload, "id", scene_id)

    new_state =
      state
      |> put_scene(scene)
      |> learn(scene, :normal_snapshot)
      |> learn(scene, :undo_snapshot)

    reply(info_state_message(scene), new_state)
  end

  # TODO fixed
  # defp get_fixed(scene) do
  #   raise("TODO IMPLEMENT")
  #   Map.new(scene["members"], &{&1, scene["fixed_type"]})
  # end

  # --- msgs
  defp error_message(_peer_message, _error) do
    # TODO
    %Message{
      op_id: "error",
      payload: %{}
    }
  end

  defp info_state_message(scene) do
    %Message{
      op_id: "info_state",
      params: %{"scene_id" => scene["id"]},
      payload: scene
    }
  end

  # -- TODO --> database

  defp put_scene(state, scene) do
    put_in(state, [:scenes, scene["id"]], scene)
  end

  # TODO fixed
  # defp learn(state, %{fixed: true} = scene, :normal_snapshot) do
  #   put_in(state, [:snapshots, :normal_snapshot, scene["id"]], get_fixed(scene))
  # end

  defp learn(state, scene, snapshot_type) do
    {:ok, snapshot} = Datapoints.get_status_for_channel_ids(scene["member_channels"])

    put_in(state, [:snapshots, snapshot_type, scene["id"]], snapshot)
  end

  # -- TODO <- database
  defp load_scenes() do
    %{}
  end

  defp load_snaps() do
    %{
      normal_snapshot: %{},
      undo_snapshot: %{}
    }
  end

  # --
  defp validate_ok(true, _), do: :ok
  defp validate_ok(false, error), do: {:error, error}
end
