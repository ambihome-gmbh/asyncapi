defmodule MQTTcTest do
  use ExUnit.Case

  def start_broker(), do: {"nanomq\n", 0} = System.cmd("docker", ["start", "nanomq"])
  def stop_broker(), do: System.cmd("docker", ["stop", "nanomq"])

  setup do
    Process.register(self(), :mqtt_test)
    IO.puts("")
    start_broker()
    on_exit(&stop_broker/0)
    :ok
  end

  def start_services() do
    {:ok, _} = start_supervised(Simple.ServiceA)
    {:ok, sample_service_b_pid} = start_supervised(Simple.ServiceB)
    sample_service_b_pid
  end

  def roundtrip(pid) do
    send(pid, {"run-test-sequence", "test-data"})
    assert_receive({"test-sequence-done", "test-data"}, 1000)
  end

  # @tag :skip
  test "roundtrip" do
    pid = start_services()
    roundtrip(pid)
  end

  @tag skip: "TODO, does not work yet"
  test "reconnect" do
    pid = start_services()
    stop_broker()
    start_broker()
    roundtrip(pid)
  end

  @tag skip: "TODO, does not work yet"
  test "retry connect" do
    stop_broker()
    pid = start_services()
    start_broker()
    roundtrip(pid)
  end
end
