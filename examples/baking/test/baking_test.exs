defmodule StackTest do
  use ExUnit.Case
  require Asyncapi.TestHelper

  @broker Application.compile_env(:asyncapi, :broker)

  setup do
    # TODO use registry to be able to mock multiple internal services
    Process.register(self(), TimeServer)
    Asyncapi.TestHelper.start_broker()
    :ok
  end

  Asyncapi.TestHelper.generate_tests(BakingService, TestUserSchema, @broker)
end
