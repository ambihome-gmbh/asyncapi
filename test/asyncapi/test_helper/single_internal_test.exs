defmodule Asyncapi.TestHelper.SingleInternalTest do
  use ExUnit.Case, async: true
  require Asyncapi.TestHelper, as: TestHelper

  defmodule Baking.Schema do
    use Asyncapi.Schema, schema_path: "baking/service.json"
  end

  defmodule Baking.TestUserSchema do
    use Asyncapi.Schema, schema_path: "baking/user.json"
  end

  defmodule TimeServer do
    def schedule_timeout(server \\ __MODULE__, target, config) do
      GenServer.cast(server, {:schedule_timeout, %{target: target, config: config}})
    end

    def schedule_cron(server \\ __MODULE__, target, config) do
      GenServer.cast(server, {:schedule_cron, %{target: target, config: config}})
    end
  end

  defmodule Baking do
    use MqttAsyncapi, schema_module: Baking.Schema

    alias Asyncapi.Message
    import Asyncapi.Helpers

    def start_link(opts \\ []) do
      MqttAsyncapi.start_link(__MODULE__, opts)
    end

    @impl true
    def init(opts) do
      time_server = Keyword.get(opts, :time_server, TimeServer)
      {:ok, %{time_server: time_server}}
    end

    @impl true
    def handle_message(%Message{op_id: "start_baking"}, state) do
      TimeServer.schedule_timeout(state.time_server, self(), %{
        after: 30,
        after_unit: :milliseconds,
        callback: :timeout
      })

      TimeServer.schedule_cron(state.time_server, self(), %{cron: "some cron", callback: :peek})
      noreply(state)
    end

    @impl true
    def handle_info(:timeout, state) do
      reply(%Message{op_id: "baking_done"}, state)
    end

    @impl true
    def handle_info(:peek, state) do
      reply(%Message{op_id: "baking_not_done"}, state)
    end
  end

  @moduletag capture_log: true

  test "runs when everything is ok", context do
    {:ok, time_server_pid} = start_supervised(TestHelper.Internal)

    {:ok, additional} =
      TestHelper.start_service(
        Baking,
        Baking.TestUserSchema,
        Asyncapi.Broker.Dummy,
        service_opts: [time_server: time_server_pid],
        internal_pids: %{time_server: time_server_pid}
      )

    full_context = Enum.into(additional, context)

    TestHelper.assert_sequence(full_context, """
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

  # TODO not clear what the error actually is here
  # this test-file should concentrate on internal actors
  # while test covers a more basic case, so should be another file
  # AH-1695/asyncapi-create-tests-for-asyncapi-lib
  test "fails on error", context do
    {:ok, time_server_pid} = start_supervised(TestHelper.Internal)

    {:ok, additional} =
      TestHelper.start_service(
        Baking,
        Baking.TestUserSchema,
        Asyncapi.Broker.Dummy,
        service_opts: [time_server: time_server_pid],
        internal_pids: %{time_server: time_server_pid}
      )

    full_context = Enum.into(additional, context)

    try do
      TestHelper.assert_sequence(full_context, """
      user->>service: start_baking
      service->>internal_time_server: schedule_timeout
      service->>internal_time_server: schedule_cron
      internal_time_server->>service: peek
      service->>user: baking_not_done
      internal_time_server->>service: peek
      service->>user: baking_done
      """)

      flunk("Expected exception raised")
    rescue
      e in [ExUnit.AssertionError] ->
        assert e.message == "Assertion with == failed"
        assert e.left == "baking_done"
        assert e.right == "baking_not_done"
    end
  end
end
