defmodule Stack.TestCases do
  def all do
    [
      %{
        name: "push, pop",
        sequence: """
        user->>service: push/{value: 42}
        user->>service: pop
        service->>user: pop_response/{value: 42}
        """
      },
      %{
        name: "pop from empty",
        sequence: """
        user->>service: pop
        service->>user: pop_response/{value: nil}
        """
      }
    ]
  end
end
