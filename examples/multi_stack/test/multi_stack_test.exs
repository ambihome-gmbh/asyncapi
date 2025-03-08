defmodule MultiStackTest do
  use ExUnit.Case
  require Asyncapi.TestHelper

  alias MultiStackApi.Payload

  setup do
    Asyncapi.TestHelper.start_broker()
    :ok
  end

  # TO-DO-4
  # Asyncapi.TestHelper.generate_tests(MultiStackService, :multistack_user)
  # -> dann in generate_tests
  # schema_path = Application.compile_env(:asyncapi, :schemas) |> Keyword.get(:multistack_user)
  # (achtung: pfade runtime/compiletime)

  Asyncapi.TestHelper.generate_tests(MultiStackService, "priv/schema/bundled/user.json")

  test "payload modules are generated" do
    assert %Payload.PopResponse{value: 42} == %Payload.PopResponse{value: 42}
  end
end
