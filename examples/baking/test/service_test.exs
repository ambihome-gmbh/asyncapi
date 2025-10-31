defmodule ServiceTest do
  use ExUnit.Case
  require Asyncapi.TestHelper

  setup do
    Process.register(self(), TimeServer)

    Asyncapi.TestHelper.start_service(
      Baking,
      Baking.TestUserSchema,
      Asyncapi.Broker.Dummy
    )
  end

  test "bake a cake", context do
    Asyncapi.TestHelper.assert_sequence(context, """
    user->>service: start_baking
    service->>internal: schedule_timeout
    service->>internal: schedule_cron
    internal->>service: peek
    service->>user: baking_not_done
    internal->>service: peek
    service->>user: baking_not_done
    internal->>service: timeout
    service->>user: baking_done
    """)
  end
end
