defmodule StackTest do
  use ExUnit.Case
  require Asyncapi.TestHelper

  setup do
    Asyncapi.TestHelper.start_broker()
    :ok
  end

  Asyncapi.TestHelper.generate_tests(StackService, "priv/schema/bundled/user_schema.json")
end
