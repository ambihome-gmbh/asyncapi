defmodule ServiceTest do
  use ExUnit.Case
  require Asyncapi.TestHelper

  setup do
    {:ok, pid} = start_supervised(Asyncapi.TestHelper.Internal)

    Asyncapi.TestHelper.start_service(
      Baking,
      Baking.TestUserSchema,
      Asyncapi.Broker.Dummy,
      service_opts: [
        time_server: pid
      ]
    )
  end

  test "bake a cake", context do
    Asyncapi.TestHelper.assert_sequence(context, """
    user->>service: start_baking
    service->>internal_time_server: schedule_timeout
    service->>internal_time_server: schedule_cron
    internal_time_server->>service: peek
    service->>user: baking_not_done
    internal_time_server->>service: peek
    service->>user: baking_not_done
    internal_time_server->>service: timeout
    service->>user: baking_done
    """)
  end
end
