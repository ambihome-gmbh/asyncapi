defmodule MQTTcTest do
  use ExUnit.Case

  # @tag :skip
  test "foo" do
    start_supervised(SampleService)

    :timer.sleep(100_000)
  end
end
