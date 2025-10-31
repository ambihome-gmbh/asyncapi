defmodule ServiceTest do
  use ExUnit.Case
  require Asyncapi.TestHelper

  setup do
    Asyncapi.TestHelper.start_service(
      MultiStack,
      MultiStack.TestUserSchema,
      Asyncapi.Broker.Dummy
    )
  end

  @create_response_payload "{name: 'SomeName', id: stack_id}"

  test "create, push, pop - ok 2", context do
    push_payload = "{value: 42}"

    Asyncapi.TestHelper.assert_sequence(context, """
    user->>service: create/{name: 'SomeName'}
    service->>user: create_response/#{@create_response_payload}
    user->>service: push[stack_id: $stack_id]/#{push_payload}
    user->>service: pop[stack_id: $stack_id]
    service->>user: pop_response[stack_id: $stack_id]/{value: 42}
    """)
  end
end
