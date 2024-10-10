defmodule AsyncapiTest do
  use ExUnit.Case

  import AsyncApi
  alias MqttAsyncapi.Message

  setup do
    [schema: AsyncApi.load("schema.json")]
  end

  test "get_message_names_to_channel", %{schema: schema} do
    assert %{
             "P1-name" => "P1",
             "P2-name" => "P2",
             "P3-name" => "P3/{p}",
             "P4-name" => "P4/{p}/P44",
             "P6-name" => "P6/{pp}"
           } = get_message_names_to_channel(schema.schema, "publish")

    assert %{
             "S1-name" => "S1",
             "S2-name" => "S2",
             "S3-name" => "S3/{p}",
             "S4-name" => "S4/{p}/S44",
             "S6-name" => "S6/{pp}"
           } = get_message_names_to_channel(schema.schema, "subscribe")
  end

  test "get_subscriptions", %{schema: schema} do
    assert ["P1", "P2", "P3/+", "P4/+/P44", "P5", "P6/+"] ==
             get_subscriptions(schema.schema, "publish")

    assert ["S1", "S2", "S3/+", "S4/+/S44", "S5", "S6/+"] ==
             get_subscriptions(schema.schema, "subscribe")
  end

  test "validate_message", %{schema: schema} do
    channel_regexs = get_channel_regexs(schema.schema["channels"])

    assert {:ok,
            %Message{
              parameters: %{},
              payload: %{},
              name: "P1-name",
              direction: "publish"
            }} ==
             validate_message(schema, channel_regexs, %{
               topic: "P1",
               direction: "publish",
               payload: %{}
             })

    assert {:ok,
            %Message{
              parameters: %{},
              payload: %{"some_prop" => "foo"},
              name: "P2-name",
              direction: "publish"
            }} ==
             validate_message(schema, channel_regexs, %{
               topic: "P2",
               direction: "publish",
               payload: %{"some_prop" => "foo"}
             })

    assert {:ok,
            %Message{
              parameters: %{"p" => "test"},
              payload: %{},
              name: "P3-name",
              direction: "publish"
            }} ==
             validate_message(schema, channel_regexs, %{
               topic: "P3/test",
               direction: "publish",
               payload: %{}
             })

    assert {:ok,
            %Message{
              parameters: %{"p" => "test"},
              payload: %{},
              name: "P4-name",
              direction: "publish"
            }} ==
             validate_message(schema, channel_regexs, %{
               topic: "P4/test/P44",
               direction: "publish",
               payload: %{}
             })

    assert {:ok,
            %Message{
              parameters: %{},
              payload: %{},
              name: "P5-name",
              direction: "publish"
            }} ==
             validate_message(schema, channel_regexs, %{
               topic: "P5",
               direction: "publish",
               payload: %{}
             })

    assert {:ok,
            %Message{
              parameters: %{"pp" => "test"},
              payload: %{},
              name: "P6-name",
              direction: "publish"
            }} ==
             validate_message(schema, channel_regexs, %{
               topic: "P6/test",
               direction: "publish",
               payload: %{}
             })

    assert {:error, :unknown} ==
             validate_message(schema, channel_regexs, %{
               topic: "nonexisting/topic",
               direction: "publish",
               payload: %{}
             })

    assert {:error, :action_unsupported_for_topic} ==
             validate_message(schema, channel_regexs, %{
               topic: "P1",
               direction: "subscribe",
               payload: %{}
             })

    assert {:error,
            %{"payload" => {:error, [{"Required property some_prop was not present.", "#"}]}}} ==
             validate_message(schema, channel_regexs, %{
               topic: "P2",
               direction: "publish",
               payload: %{}
             })

    assert {:error,
            %{
              "payload" =>
                {:error, [{"Schema does not allow additional properties.", "#/additional"}]}
            }} ==
             validate_message(schema, channel_regexs, %{
               topic: "P1",
               direction: "publish",
               payload: %{additional: :properties}
             })

    assert {:error, %Jason.DecodeError{}} =
             validate_message(schema, channel_regexs, %{
               topic: "P1",
               direction: "publish",
               payload: "Type mismatch"
             })

    assert {:error,
            %{
              "payload" =>
                {:error, [{"Type mismatch. Expected String but got Integer.", "#/some_prop"}]}
            }} ==
             validate_message(schema, channel_regexs, %{
               topic: "P2",
               direction: "publish",
               payload: %{"some_prop" => 4711}
             })
  end

  test "get mqtt message", %{schema: schema} do
    names = get_message_names_to_channel(schema.schema, "publish")

    assert %{payload: "{}", topic: "P1"} ==
             MqttAsyncapi.Message.to_mqtt_message(
               %MqttAsyncapi.Message{
                 payload: %{},
                 name: "P1-name",
                 parameters: %{},
                 direction: "publish"
               },
               schema,
               names
             )

    assert %{payload: "{}", topic: "P3/test"} ==
             MqttAsyncapi.Message.to_mqtt_message(
               %MqttAsyncapi.Message{
                 payload: %{},
                 name: "P3-name",
                 parameters: %{"p" => "test"},
                 direction: "publish"
               },
               schema,
               names
             )

    assert %{payload: ~s/{"some_prop":"foo"}/, topic: "P2"} ==
             MqttAsyncapi.Message.to_mqtt_message(
               %MqttAsyncapi.Message{
                 parameters: %{},
                 payload: %{"some_prop" => "foo"},
                 name: "P2-name",
                 direction: "publish"
               },
               schema,
               names
             )
  end
end
