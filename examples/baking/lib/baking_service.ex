defmodule BakingService do
  use MqttAsyncapi, schema_module: BakingSchema

  alias Asyncapi.Message
  import Asyncapi.Helpers
  # alias BakingSchema.MessagePayload, as: P

  def start_link(opts \\ []) do
    MqttAsyncapi.start_link(__MODULE__, opts)
  end

  @impl true
  def init(_opts) do
    {:ok, %{stack: []}}
  end

  @impl true
  def handle_message(%Message{op_id: "start_baking"}, state) do
    TimeServer.schedule_timeout(self(), %{
      after: 30,
      after_unit: :milliseconds,
      callback: :timeout
    })

    TimeServer.schedule_cron(self(), %{cron: "TODO", callback: :peek})
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

{:error,
 {{:undef,
   [
     {nil, :get_asyncapi, [], []},
     {MqttAsyncapi, :init, 1, [file: ~c"lib/mqtt_asyncapi.ex", line: 75]},
     {:gen_server, :init_it, 2, [file: ~c"gen_server.erl", line: 2229]},
     {:gen_server, :init_it, 6, [file: ~c"gen_server.erl", line: 2184]},
     {:proc_lib, :init_p_do_apply, 3, [file: ~c"proc_lib.erl", line: 329]}
   ]},
  {:child, :undefined, BakingService, {BakingService, :start_link, [[]]}, :permanent, false, 5000,
   :worker, [BakingService]}}}
