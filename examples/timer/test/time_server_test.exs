defmodule TimeServerTest do
  use ExUnit.Case

  @tag :skip
  test "wip" do
    # {:ok, _} = start_supervised(TimeServer)
    Process.register(self(), TimeServer)
    spawn(fn -> dummy_caller() end)

    receive do
      {:"$gen_call", {from, tag}, message} ->
        dbg({:msg, from, message})
        GenServer.reply({from, tag}, {:utc_today, %{utc_today: "DUMMY"}})
    end

    Process.sleep(100)
  end

  def dummy_caller() do
    dbg({:dummy_caller_pid, self()})
    {:utc_today, %{utc_today: utc_today}} = TimeServer.utc_today()
    dbg({:dummy_caller_received, utc_today})
  end
end
