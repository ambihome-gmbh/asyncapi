defmodule MQTTcTest do
  use ExUnit.Case

  test "mqtt-roundtrip" do
    Process.register(self(), :mqtt_test)
    IO.puts("")

    {:ok, _sample_service_pid} = start_supervised(SampleService)
    {:ok, other_sample_service_pid} = start_supervised(OtherSampleService)

    send(other_sample_service_pid, {"run-test-sequence", "test-data"})
    assert_receive({"test-sequence-done", "test-data"}, 10, "failed")
  end
end
