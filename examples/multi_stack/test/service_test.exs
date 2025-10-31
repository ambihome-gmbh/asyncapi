defmodule MultiStackTest do
  use ExUnit.Case
  require Asyncapi.TestHelper

  setup do
    {:ok, data} =
      Asyncapi.TestHelper.start_service(
        MultiStack,
        MultiStack.TestUserSchema,
        Asyncapi.Broker.Dummy
      )

    {:ok, data}
  end

  @test_interpolation "{name: 'SomeName', id: stack_id}"

  test "create, push, pop - ok 2", context do
    test_interpolation = "{value: 42}"

    Asyncapi.TestHelper.assert_sequence(context, """
    user->>service: create/{name: 'SomeName'}
    service->>user: create_response/#{@test_interpolation}
    user->>service: push[stack_id: $stack_id]/#{test_interpolation}
    user->>service: pop[stack_id: $stack_id]
    service->>user: pop_response[stack_id: $stack_id]/{value: 42}
    """)
  end
end
