defmodule ServiceTest do
  use ExUnit.Case
  require Asyncapi.TestHelper

  setup do
    {:ok, pid} = start_supervised(Asyncapi.TestHelper.Internal)

    Asyncapi.TestHelper.init(
      Baking,
      service_opts: [time_server: pid],
      internal_pids: %{"time_server" => pid},
      external_schemas: %{"user" => Baking.TestUserSchema}
    )
  end

  test "bake a cake", context do
    Asyncapi.TestHelper.assert_sequence(context, """
    external_user->>service: start_baking
    service->>internal_time_server: schedule_timeout
    service->>internal_time_server: schedule_cron
    internal_time_server->>service: peek
    service->>external_user: baking_not_done
    internal_time_server->>service: peek
    service->>external_user: baking_not_done
    internal_time_server->>service: timeout
    service->>external_user: baking_done
    """)
  end
end
