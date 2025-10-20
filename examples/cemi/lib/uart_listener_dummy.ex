defmodule Panex.KNX.UARTListener do
  def subscribe(:cemi) do
    GenServer.cast(__MODULE__, :subscribe)
    # dbg({Panex.KNX.UARTListener, :uart_subscribe, :cemi})
    :ok
  end

  def write(:cemi, data) do
    GenServer.cast(__MODULE__, {:write, data})
  end
end
