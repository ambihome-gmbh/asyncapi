defmodule Panex.Service.Cemi do
  use MqttAsyncapi, schema_module: Panex.Service.Cemi.Schema
  alias Asyncapi.Message
  import Asyncapi.Helpers

  def start_link(opts \\ []) do
    MqttAsyncapi.start_link(__MODULE__, opts)
  end

  @impl true
  def init(_opts) do
    Panex.KNX.UARTListener.subscribe(:cemi)
    _ = src_addr()
    {:ok, %{}}
  end

  @impl true
  def handle_message(%Message{op_id: "req"} = message, state) do
    # TODO patch src address
    encoded_frame =
      message.payload
      |> Cemi.DataFrame.from_json()
      |> Cemi.Frame.encode()

    Panex.KNX.UARTListener.write(:cemi, encoded_frame)

    noreply(state)
  end

  # from Panex.KNX.UARTListener
  def handle_info({:cemi, data}, state) do
    case Cemi.Frame.decode(data) do
      {:ok, %Cemi.DataFrame{message_code: :l_data_ind} = cemi_frame} ->
        message = %Message{
          op_id: "ind",
          params: %{
            "apci" => "#{cemi_frame.apci}",
            "dest" => "#{cemi_frame.dest}",
            "message_code" => "l_data_ind"
          },
          payload: Cemi.DataFrame.to_json(cemi_frame) |> dbg
        }

        reply(message, state)

      {:ok, other_frame} ->
        dbg({:ignore, other_frame})
        noreply(state)

      {:error, reason} ->
        dbg({:decode_error, reason})
        noreply(state)
    end
  end

  @impl true
  def handle_info(info, state) do
    dbg({:handle_info, :unknown, info})
    noreply(state)
  end

  defp src_addr() do
    # TODO
    # "PANEX_SOURCE_ADDRESS_HEX" |> System.get_env() |> String.to_integer(16)
    254
  end
end
