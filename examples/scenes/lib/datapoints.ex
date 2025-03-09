defmodule Datapoints do
  use MqttAsyncapi, schema: :datapoints_service

  alias Asyncapi.Message

  def get_last(group) do
    case :ets.lookup(:datapoints, group) do
      [{^group, val}] -> {:ok, val}
      _ -> {:error, :unknown}
    end
  end

  def start_link(opts \\ []) do
    MqttAsyncapi.start_link(__MODULE__, opts)
  end

  @impl true
  def init(_) do
    ets_result = :ets.new(:datapoints, [:set, :protected, :named_table])
    dbg(ets_result)
    {:ok, ets_result}
  end

  @impl true
  def handle_message(%Message{op_id: "dp_write_ind"} = message, state) do
    %{payload: %{value: value}, params: %{dp_id: dp_id}} = message

    dbg({:ets, :insert, {dp_id, value}})

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
