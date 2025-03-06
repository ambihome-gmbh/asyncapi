defmodule AutoTest do
  use ExUnit.Case
  require Asyncapi.TestHelper

  describe "dummy" do
    setup do
      TestHelper.start_broker()
      :ok
    end

    Asyncapi.TestHelper.generate_tests(
      Complex.ComplexService,
      "test/schema/complex/user_schema.json"
    )
  end
end
