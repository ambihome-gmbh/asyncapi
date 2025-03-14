defmodule MultiStackTest do
  use ExUnit.Case
  require Asyncapi.TestHelper

  alias MultiStackSchema

  @broker Application.compile_env(:asyncapi, :broker)

  setup do
    Asyncapi.TestHelper.start_broker()
    :ok
  end

  Asyncapi.TestHelper.generate_tests(MultiStackService, TestUserSchema, @broker)

  test "payload modules are generated" do
    assert %MultiStackSchema.PopResponse{value: 42} == %MultiStackSchema.PopResponse{value: 42}
  end
end
