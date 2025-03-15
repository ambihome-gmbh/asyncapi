defmodule AlarmTest do
  use ExUnit.Case
  require Asyncapi.TestHelper

  @broker Application.compile_env(:asyncapi, :broker)

  setup do
    # TODO use registry to be able to mock multiple internal services
    Process.register(self(), TimeServer)
    Asyncapi.TestHelper.start_broker()
    start_supervised(Datapoints)

    :ok
  end

  Asyncapi.TestHelper.generate_tests(AlarmService, TestUserSchema, @broker)
end
