defmodule MultiStack.TestCases do
  @test_interpolation "{name: 'SomeName', id: stack_id}"

  def all do
    test_interpolation = "{value: 42}"

    [
      %{
        name: "create, push, pop - ok",
        sequence: """
        user->>service: create/{name: 'SomeName'}
        service->>user: create_response/#{@test_interpolation}
        user->>service: push[stack_id: $stack_id]/#{test_interpolation}
        user->>service: pop[stack_id: $stack_id]
        service->>user: pop_response[stack_id: $stack_id]/{value: 42}
        """
      }
    ]
  end
end
