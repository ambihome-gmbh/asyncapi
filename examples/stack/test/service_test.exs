defmodule StackTest do
  use ExUnit.Case
  require Asyncapi.TestHelper

  @broker Application.compile_env(:asyncapi, :broker)

  setup do
    Asyncapi.TestHelper.start_broker()
    :ok
  end

  Asyncapi.TestHelper.generate_tests(
    Stack,
    Stack.TestUserSchema,
    testcases_module: Stack.TestCases,
    broker: @broker
  )
end
