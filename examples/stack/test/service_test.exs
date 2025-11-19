defmodule ServiceTest do
  use ExUnit.Case
  require Asyncapi.TestHelper

  setup do
    Asyncapi.TestHelper.init(
      Stack,
      external_schemas: %{"user" => Stack.TestUserSchema}
    )
  end

  test "push, pop", context do
    Asyncapi.TestHelper.assert_sequence(context, """
    external_user->>service: push/{value: 42}
    external_user->>service: pop
    service->>external_user: pop_response/{value: 42}
    """)
  end

  test "pop from empty", context do
    Asyncapi.TestHelper.assert_sequence(context, """
    external_user->>service: pop
    service->>external_user: pop_response/{value: nil}
    """)
  end
end
