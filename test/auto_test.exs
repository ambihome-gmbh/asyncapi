defmodule AutoTest do
  use ExUnit.Case
  require Asyncapi.TestHelper

  # TODO -> protocol's test-helper module
  # def start_broker(), do: {"nanomq\n", 0} = System.cmd("docker", ["start", "nanomq"])
  # def stop_broker(), do: System.cmd("docker", ["stop", "nanomq"])

  describe "dummy" do
    setup do
      start_broker()
      :ok
    end

    Asyncapi.TestHelper.generate_tests(
      Complex.ComplexService,
      "test/schema/complex/user_schema.json"
    )
  end

  case Application.compile_env(:asyncapi, :broker) do
    Asyncapi.Broker.Dummy ->
      def start_broker do
        start_supervised!(DummyBroker)
      end

    Asyncapi.Broker.MQTT ->
      def start_broker do
        # do_start_broker()
        # on_exit(&do_stop_broker/0)
      end

      defp do_start_broker(), do: {"nanomq\n", 0} = System.cmd("docker", ["start", "nanomq"])
      defp do_stop_broker(), do: System.cmd("docker", ["stop", "nanomq"])
  end
end
