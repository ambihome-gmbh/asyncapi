defmodule MultiStackTest do
  use ExUnit.Case
  require Asyncapi.TestHelper

  setup do
    Asyncapi.TestHelper.start_broker()
    :ok
  end

  # TODO BM
  # schema_path = Application.compile_env(:asyncapi, :schemas) |> Keyword.get(:multistack_user)
  # Asyncapi.TestHelper.generate_tests(MultiStackService, schema_path)

  Asyncapi.TestHelper.generate_tests(MultiStackService, "priv/schema/user_schema.json")

  test "payload modules are generated" do
    assert %MultiStackApi.PopResponsePayload{value: 42} ==
             %MultiStackApi.PopResponsePayload{value: 42}
  end
end
