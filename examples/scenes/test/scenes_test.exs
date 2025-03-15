defmodule ScenesTest do
  use ExUnit.Case
  require Asyncapi.TestHelper

  @broker Application.compile_env(:asyncapi, :broker)

  setup do
    Asyncapi.TestHelper.start_broker()
    start_supervised(Datapoints)

    :ok
  end

  Asyncapi.TestHelper.generate_tests(ScenesService, TestUserSchema, @broker)
end
