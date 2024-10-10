defmodule MQTTcTest do
  use ExUnit.Case

  # @tag :skip
  test "foo" do
    MqttAsyncapi.start_link(
      asyncapi_role: :application,
      asyncapi_schema_path: "schema.json",
      user_module: SampleService,
      host: ~c"test.mosquitto.org",
      port: 1883
    )

    :timer.sleep(100000)
  end
end
