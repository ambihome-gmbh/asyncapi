defmodule Baking.TestCases do
  def all do
    [
      %{
        name: "bake a cake",
        sequence: """
        user->>service: start_baking
        service->>internal: schedule_timeout
        service->>internal: schedule_cron
        internal->>service: peek
        service->>user: baking_not_done
        internal->>service: peek
        service->>user: baking_not_done
        internal->>service: timeout
        service->>user: baking_done
        """
      }
    ]
  end
end


# assert 0 == System.cmd("mix test --only baking_testcases")
