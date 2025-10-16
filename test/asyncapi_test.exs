defmodule SampleSchema do
  use Asyncapi.Schema, schema_path: "test/schema/schema.json"
end

defmodule AsyncApiTest do
  use ExUnit.Case

  alias Asyncapi.Message

  setup do
    [asyncapi: SampleSchema.get_asyncapi()]
  end

  test "server", %{asyncapi: asyncapi} do
    assert %{port: 1883, host: ~c"127.0.0.1"} = asyncapi.server
  end

  test "subscriptions", %{asyncapi: asyncapi} do
    assert ["P1", "P2", "P3/+", "P4/+/P44/+"] == asyncapi.subscriptions
  end

  # TODO use schema module
  @m_1 %Message{
    params: %{},
    payload: %{},
    op_id: "P1"
  }
  @m_2 %Message{
    params: %{},
    payload: %{"p_isrequired" => "foo"},
    op_id: "P2"
  }
  @m_3 %Message{
    params: %{"p1" => "pv1"},
    payload: %{},
    op_id: "P3"
  }
  @m_4 %Message{
    params: %{"p1" => "pv1", "p2" => "pv2"},
    payload: %{"p_isrequired" => "foo"},
    op_id: "P4"
  }

  @mqtt_1 %{
    topic: "P1",
    payload: %{}
  }
  @mqtt_2 %{
    topic: "P2",
    payload: %{"p_isrequired" => "foo"}
  }
  @mqtt_3 %{
    topic: "P3/pv1",
    payload: %{}
  }
  @mqtt_4 %{
    topic: "P4/pv1/P44/pv2",
    payload: %{"p_isrequired" => "foo"}
  }

  test "from_mqtt_message, valid", %{asyncapi: asyncapi} do
    assert {:ok, @m_1} = Message.from_mqtt_message(@mqtt_1, asyncapi)
    assert {:ok, @m_2} = Message.from_mqtt_message(@mqtt_2, asyncapi)
    assert {:ok, @m_3} = Message.from_mqtt_message(@mqtt_3, asyncapi)
    assert {:ok, @m_4} = Message.from_mqtt_message(@mqtt_4, asyncapi)
  end

  test "to_mqtt_message, valid", %{asyncapi: asyncapi} do
    assert @mqtt_1 = Message.to_mqtt_message!(@m_1, asyncapi)
    assert @mqtt_2 = Message.to_mqtt_message!(@m_2, asyncapi)
    assert @mqtt_3 = Message.to_mqtt_message!(@m_3, asyncapi)
    assert @mqtt_4 = Message.to_mqtt_message!(@m_4, asyncapi)
  end

  @tag :wip
  test "to_mqtt_message, defaults", %{asyncapi: asyncapi} do
    # assert @mqtt_1 = Message.to_mqtt_message!(@m_1, asyncapi)
    # assert @mqtt_2 = Message.to_mqtt_message!(@m_2, asyncapi)
    # assert @mqtt_3 = Message.to_mqtt_message!(@m_3, asyncapi)
    _msg = Message.to_mqtt_message!(@m_4, asyncapi)
  end

  test "from_mqtt_message, invalid", %{asyncapi: asyncapi} do
    assert {
             :error,
             :no_matching_operation
           } ==
             Message.from_mqtt_message(%{topic: "nonexisting", payload: "{}"}, asyncapi)

    assert {
             :error,
             :payload_validation_error,
             [{"Required property p_isrequired was not present.", "#"}],
             "P2",
             %{}
           } ==
             Message.from_mqtt_message(%{topic: "P2", payload: %{}}, asyncapi)

    assert {
             :error,
             :payload_validation_error,
             [{"Type mismatch. Expected String, Null but got Integer.", "#/p"}],
             "P2",
             %{"p" => 1, "p_isrequired" => "foo"}
           } ==
             Message.from_mqtt_message(
               %{topic: "P2", payload: %{"p" => 1, "p_isrequired" => "foo"}},
               asyncapi
             )

    assert {
             :error,
             :payload_validation_error,
             [{"Schema does not allow additional properties.", "#/additional"}],
             "P1",
             %{"additional" => ""}
           } ==
             Message.from_mqtt_message(%{topic: "P1", payload: %{"additional" => ""}}, asyncapi)

    assert {
             :error,
             :parameter_validation_error,
             ["parameter: 'p1' - {:error, [{\"Value is not allowed in enum.\", \"#\"}]}"]
           } ==
             Message.from_mqtt_message(%{topic: "P3/not-allowed", payload: %{}}, asyncapi)
  end

  test "to_mqtt_message, invalid", %{asyncapi: asyncapi} do
    assert assert_raise RuntimeError, ~s/{:error, {:missing_parameters, ["p1"]}}/, fn ->
             Message.to_mqtt_message!(
               %Message{params: %{}, payload: %{}, op_id: "P3"},
               asyncapi
             )
           end

    assert assert_raise RuntimeError, ~s/{:error, {:unexpected_parameters, [\"x\"]}}/, fn ->
             Message.to_mqtt_message!(
               %Message{
                 params: %{"p1" => "pv1", "x" => "x"},
                 payload: %{},
                 op_id: "P3"
               },
               asyncapi
             )
           end
  end
end
