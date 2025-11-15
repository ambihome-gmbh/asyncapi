defmodule ServiceTest do
  use ExUnit.Case
  require Asyncapi.TestHelper

  setup do
    Asyncapi.TestHelper.start_service(
      Stack,
      Stack.TestUserSchema,
      Asyncapi.Broker.Dummy
    )
  end

  test "push, pop", context do
    Asyncapi.TestHelper.assert_sequence(context, """
    user->>service: push/{value: 42}
    user->>service: pop
    service->>user: pop_response/{value: 42}
    """)
  end

  test "pop from empty", context do
    Asyncapi.TestHelper.assert_sequence(context, """
    user->>service: pop
    service->>user: pop_response/{value: nil}
    """)
  end
end
