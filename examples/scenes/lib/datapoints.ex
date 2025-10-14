defmodule Datapoints do
  use MqttAsyncapi, schema_module: DatapointsSchema

  alias Asyncapi.Message

  def create_fp_write_requests(snapshot) do
    for {member_id, value} <- snapshot do
      %Message{
        op_id: "dp_write_req",
        payload: %{"id" => member_id, "value" => value}
      }
    end
  end

  def get(dp_id) do
    case :ets.lookup(:datapoints, dp_id) do
      [{^dp_id, value}] -> {:ok, value}
      _ -> {:error, :unknown}
    end
  end

  def get_all_values(dp_ids) do
    for dp_id <- dp_ids, into: %{} do
      case get(dp_id) do
        {:ok, value} -> {dp_id, value}
        {:error, :unknown} -> {dp_id, nil}
      end
    end
  end

  def get_status_for_channel_ids(dp_ids) do
    {:ok, get_all_values(dp_ids)}
  end

  def start_link(opts \\ []) do
    MqttAsyncapi.start_link(__MODULE__, opts)
  end

  @impl true
  def init(_) do
    table_name = :ets.new(:datapoints, [:set, :protected, :named_table])
    {:ok, table_name}
  end

  @impl true
  def handle_message(%Message{op_id: "dp_write_ind"} = message, state) do
    # TODO wie op_id wenn mehrere passen (wie hier)
    %{payload: %{"id" => dp_id, "value" => value}} = message

    # dbg({:ets, :insert, {dp_id, value}})

    :ets.insert(state, {dp_id, value})
    {:noreply, state}
  end

  # @impl true
  # def handle_message(%Message{op_id: "STS_CMD_GET_ALL_VALUES"}, state) do
  #   message = %Message{
  #     op_id: "STS_INFO_STATE",
  #     payload: state |> :ets.tab2list() |> Enum.into(%{})
  #   }

  #   {:reply, [message], state}
  # end
end
