defmodule AsyncApiTest do
  use ExUnit.Case

  alias Asyncapi.Message

  setup do
    [asyncapi: TestUserSchema.get_asyncapi()]
  end

  test "subscriptions", %{asyncapi: asyncapi} do
    assert [
             "function/resp/+",
             "functionpoint/resp/+",
             "functionpoint-write/ind/+",
             "functionpoints/resp/all",
             "functions/resp/all",
             "location/resp/+",
             "locations/resp/all"
           ] == asyncapi.subscriptions
  end

  test "from mqtt message - functionpoint", %{asyncapi: asyncapi} do
    assert {:ok,
            %Message{
              op_id: "functionpoint-resp",
              params: %{instance_id: "8a82c472-113c-45eb-87c8-5edb6acb9199"}
            }} =
             test_from_mqtt(
               "functionpoint/resp/8a82c472-113c-45eb-87c8-5edb6acb9199",
               """
                 {
                   "id": "8a82c472-113c-45eb-87c8-5edb6acb9199",
                   "type": "mac#LightCurrentStatus",
                   "title": "Light CurrentStatus",
                   "datapoint_type": "urn:knx:dpt.switch",
                   "function_ref": "9fc15a63-37d1-4c6d-9457-bbef0ab44718"
                 }
               """,
               asyncapi
             )
  end

  test "from mqtt message - floor", %{asyncapi: asyncapi} do
    assert {
             :ok,
             %Message{
               op_id: "location-resp",
               params: %{instance_id: "442f65814-bab9-4122-9924-696ac4922578"}
             }
           } =
             test_from_mqtt(
               "location/resp/442f65814-bab9-4122-9924-696ac4922578",
               """
                {
               "id": "42f65814-bab9-4122-9924-696ac4922578",
               "type": "urn:knx:loc.floor",
               "name": "Ground Floor",
               "rooms": [
                "1b03625b-3680-4e81-aa11-9251bd050b61",
                "20ba9f7f-85ee-4ff6-aa3c-9fbe1a95580b"
               ]
               }
               """,
               asyncapi
             )
  end

  test "from mqtt message - room", %{asyncapi: asyncapi} do
    assert {
             :ok,
             %Message{
               op_id: "location-resp",
               params: %{instance_id: "1b03625b-3680-4e81-aa11-9251bd050b61"}
             }
           } =
             test_from_mqtt(
               "location/resp/1b03625b-3680-4e81-aa11-9251bd050b61",
               """
               {
                "id": "1b03625b-3680-4e81-aa11-9251bd050b61",
                "type": "urn:knx:loc.room",
                "name": "Kitchen",
                "location_usage": "tag#kitchen",
                "floor": "42f65814-bab9-4122-9924-696ac4922578",
                "adjacent_locations": [
                  "20ba9f7f-85ee-4ff6-aa3c-9fbe1a95580b"
                ],
                "application_functions": [
                  "9fc15a63-37d1-4c6d-9457-bbef0ab44718"
                ]
               }
               """,
               asyncapi
             )
  end

  test "from mqtt message - function", %{asyncapi: asyncapi} do
    assert {
             :ok,
             %Message{
               op_id: "function-resp",
               params: %{instance_id: "9fc15a63-37d1-4c6d-9457-bbef0ab44718"}
             }
           } =
             test_from_mqtt(
               "function/resp/9fc15a63-37d1-4c6d-9457-bbef0ab44718",
               """
               {
                "id": "9fc15a63-37d1-4c6d-9457-bbef0ab44718",
                "type": "urn:knx:fct.switchLight",
                "trade": "tag#lighting",
                "name": "Kitchen Light Switch",
                "function_location": "1b03625b-3680-4e81-aa11-9251bd050b61",
                "function_points": {
                  "mac#LightCurrentStatus": "8a82c472-113c-45eb-87c8-5edb6acb9199",
                  "mac#LightSwitchRequest": "3e308af9-a589-47dc-a8c8-b1d45e31f660"
                }
               }
               """,
               asyncapi
             )
  end

  defp test_from_mqtt(topic, payload, asyncapi) do
    message = %{topic: topic, payload: Jason.decode!(payload)}
    Message.from_mqtt_message(message, asyncapi)
  end
end
