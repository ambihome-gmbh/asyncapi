defmodule MultiStackTest do
  use ExUnit.Case
  require Asyncapi.TestHelper

  @broker Application.compile_env(:asyncapi, :broker)

  setup do
    Asyncapi.TestHelper.start_broker()
    :ok
  end

  Asyncapi.TestHelper.generate_tests(
    MultiStack,
    MultiStack.TestUserSchema,
    testcases_module: MultiStack.TestCases,
    broker: @broker
  )
end
