defmodule ServiceTest do
  use ExUnit.Case
  require Asyncapi.TestHelper

  setup do
    Asyncapi.TestHelper.init(
      MultiStack,
      external_schemas: %{"user" => MultiStack.TestUserSchema}
    )
  end

  @create_response_payload "{name: 'SomeName', id: stack_id}"

  test "create, push, pop - ok 2", context do
    push_payload = "{value: 42}"

    Asyncapi.TestHelper.assert_sequence(context, """
    external_user->>service: create/{name: 'SomeName'}
    service->>external_user: create_response/#{@create_response_payload}
    external_user->>service: push[stack_id: $stack_id]/#{push_payload}
    external_user->>service: pop[stack_id: $stack_id]
    service->>external_user: pop_response[stack_id: $stack_id]/{value: 42}
    """)
  end
end
