ExUnit.start()

defmodule TestHelper do
  use ExUnit.Case

  case Application.compile_env(:asyncapi, :broker) do
    Asyncapi.Broker.Dummy ->
      def start_broker, do: start_supervised!(DummyBroker)

    Asyncapi.Broker.MQTT ->
      def start_broker do
        do_start_broker()
        on_exit(&do_stop_broker/0)
      end

      defp do_start_broker(), do: {"nanomq\n", 0} = System.cmd("docker", ["start", "nanomq"])
      defp do_stop_broker(), do: System.cmd("docker", ["stop", "nanomq"])
  end
end
