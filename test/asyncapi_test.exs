defmodule AsyncApiTest do
  use ExUnit.Case

  import AsyncApi
  alias MqttAsyncapi.Message

  setup do
    [asyncapi: load("priv/schema/schema.json")]
  end

  test "server", %{asyncapi: asyncapi} do
    assert %{port: 1883} = asyncapi.server
  end

  test "subscriptions", %{asyncapi: asyncapi} do
    assert ["P1", "P2", "P3/+", "P4/+/P44", "P5", "P6/+"] == asyncapi.subscriptions
  end

  @m_1 %Message{parameters: %{}, payload: %{}, operation_id: "P1"}
  @m_2 %Message{parameters: %{}, payload: %{"some_prop" => "foo"}, operation_id: "P2"}
  @m_3 %Message{parameters: %{"p" => "p1"}, payload: %{}, operation_id: "P3"}
  @m_4 %Message{parameters: %{"p" => "p1"}, payload: %{}, operation_id: "P4"}
  @m_5 %Message{parameters: %{}, payload: %{}, operation_id: "P5"}
  @m_6 %Message{parameters: %{"pp" => "test"}, payload: %{}, operation_id: "P6"}

  @mqtt_1 %{topic: "P1", payload: "{}"}
  @mqtt_2 %{topic: "P2", payload: ~s/{"some_prop":"foo"}/}
  @mqtt_3 %{topic: "P3/p1", payload: "{}"}
  @mqtt_4 %{topic: "P4/p1/P44", payload: "{}"}
  @mqtt_5 %{topic: "P5", payload: "{}"}
  @mqtt_6 %{topic: "P6/test", payload: "{}"}

  test "from_mqtt_message, valid", %{asyncapi: asyncapi} do
    assert {:ok, @m_1} == Message.from_mqtt_message(@mqtt_1, asyncapi)
    assert {:ok, @m_2} == Message.from_mqtt_message(@mqtt_2, asyncapi)
    assert {:ok, @m_3} == Message.from_mqtt_message(@mqtt_3, asyncapi)
    assert {:ok, @m_4} == Message.from_mqtt_message(@mqtt_4, asyncapi)
    assert {:ok, @m_5} == Message.from_mqtt_message(@mqtt_5, asyncapi)
    assert {:ok, @m_6} == Message.from_mqtt_message(@mqtt_6, asyncapi)
  end

  test "to_mqtt_message, valid", %{asyncapi: asyncapi} do
    assert @mqtt_1 == Message.to_mqtt_message!(@m_1, asyncapi)
    assert @mqtt_2 == Message.to_mqtt_message!(@m_2, asyncapi)
    assert @mqtt_3 == Message.to_mqtt_message!(@m_3, asyncapi)
    assert @mqtt_4 == Message.to_mqtt_message!(@m_4, asyncapi)
    assert @mqtt_5 == Message.to_mqtt_message!(@m_5, asyncapi)
    assert @mqtt_6 == Message.to_mqtt_message!(@m_6, asyncapi)
  end

  test "from_mqtt_message, invalid", %{asyncapi: asyncapi} do
    assert {:error, :no_matching_operation} ==
             Message.from_mqtt_message(%{topic: "nonexisting", payload: "{}"}, asyncapi)

    assert {:error, [{"Required property some_prop was not present.", "#"}]} ==
             Message.from_mqtt_message(%{topic: "P2", payload: "{}"}, asyncapi)

    assert {:error, [{"Type mismatch. Expected String but got Integer.", "#/some_prop"}]} ==
             Message.from_mqtt_message(%{topic: "P2", payload: ~s/{"some_prop": 1}/}, asyncapi)

    assert {:error, [{"Schema does not allow additional properties.", "#/additional"}]} ==
             Message.from_mqtt_message(%{topic: "P1", payload: ~s/{"additional": ""}/}, asyncapi)

    assert {:error, ["parameter: 'p' - {:error, [{\"Value is not allowed in enum.\", \"#\"}]}"]} ==
             Message.from_mqtt_message(%{topic: "P3/x", payload: ~s/{}/}, asyncapi)
  end

  test "to_mqtt_message, invalid", %{asyncapi: asyncapi} do
    assert assert_raise RuntimeError, ~s/{:error, {:missing_parameters, ["p"]}}/, fn ->
             Message.to_mqtt_message!(
               %Message{parameters: %{}, payload: %{}, operation_id: "P3"},
               asyncapi
             )
           end

    assert assert_raise RuntimeError, ~s/{:error, {:unexpected_parameters, [\"x\"]}}/, fn ->
             Message.to_mqtt_message!(
               %Message{parameters: %{"p" => "p1", "x" => "x"}, payload: %{}, operation_id: "P3"},
               asyncapi
             )
           end
  end
end
