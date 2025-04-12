defmodule AsyncApiTest do
  use ExUnit.Case

  alias Asyncapi.Message
  alias TestUserSchema.MessagePayload, as: P

  setup do
    [asyncapi: TestUserSchema.get_asyncapi()]
  end

  # @sample_project "test/support/sample_project.json" |> File.read!() |> Jason.decode!()
  # @functionpoints Map.new(@sample_project["functionpoints"], &{&1["id"], &1})

  test "subscriptions", %{asyncapi: asyncapi} do
    assert [
             "functions/resp/+",
             "functionpoint/resp/+",
             "functionpoint-write/ind/+",
             "functionpoints/resp/all",
             "functions/resp/all",
             "location/resp/+",
             "locations/resp/all"
           ] == asyncapi.subscriptions
  end

  # @tag :skip
  test "from mqtt message", %{asyncapi: asyncapi} do
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

  defp test_from_mqtt(topic, payload, asyncapi) do
    message = %{topic: topic, payload: Jason.decode!(payload)}
    # {:ok, message} = Message.from_mqtt_message(@mqtt_1, @asyncapi)
    # assert message == Jason.decode!(json)

    Message.from_mqtt_message(message, asyncapi) |> dbg
  end

  @tag :skip
  test "wip" do
    schema_org = %{
      "oneOf" => [
        %{
          "additionalProperties" => false,
          "properties" => %{
            "datapoint_type" => %{"const" => "urn:knx:dpt.upDown"},
            "function_ref" => %{"format" => "uuid", "type" => "string"},
            "id" => %{"format" => "uuid", "type" => "string"},
            "title" => %{"type" => "string"},
            "type" => %{"const" => "mac#BlindsMoveUpDown"}
          },
          "required" => ["id", "type", "title", "datapoint_type", "function_ref"],
          "title" => "Blinds Move Up Down",
          "type" => "object"
        },
        %{
          "additionalProperties" => false,
          "properties" => %{
            "datapoint_type" => %{"const" => "urn:knx:dpt.lengthmm"},
            "function_ref" => %{"format" => "uuid", "type" => "string"},
            "id" => %{"format" => "uuid", "type" => "string"},
            "title" => %{"type" => "string"},
            "type" => %{"const" => "mac#BlindsPositionLength"}
          },
          "required" => ["id", "type", "title", "datapoint_type", "function_ref"],
          "title" => "Blinds Position Length",
          "type" => "object"
        },
        %{
          "additionalProperties" => false,
          "properties" => %{
            "datapoint_type" => %{"const" => "urn:knx:dpt.scaling"},
            "function_ref" => %{"format" => "uuid", "type" => "string"},
            "id" => %{"format" => "uuid", "type" => "string"},
            "title" => %{"type" => "string"},
            "type" => %{"const" => "mac#BlindsPositionPercentage"}
          },
          "required" => ["id", "type", "title", "datapoint_type", "function_ref"],
          "title" => "Blinds Position Percentage",
          "type" => "object"
        },
        %{
          "additionalProperties" => false,
          "properties" => %{
            "datapoint_type" => %{"const" => "urn:knx:dpt.rotationAngle"},
            "function_ref" => %{"format" => "uuid", "type" => "string"},
            "id" => %{"format" => "uuid", "type" => "string"},
            "title" => %{"type" => "string"},
            "type" => %{"const" => "mac#BlindsSlatPositionDegrees"}
          },
          "required" => ["id", "type", "title", "datapoint_type", "function_ref"],
          "title" => "Blinds Slat Position Degrees",
          "type" => "object"
        },
        %{
          "additionalProperties" => false,
          "properties" => %{
            "datapoint_type" => %{"const" => "urn:knx:dpt.scaling"},
            "function_ref" => %{"format" => "uuid", "type" => "string"},
            "id" => %{"format" => "uuid", "type" => "string"},
            "title" => %{"type" => "string"},
            "type" => %{"const" => "mac#BlindsSlatPositionPercentage"}
          },
          "required" => ["id", "type", "title", "datapoint_type", "function_ref"],
          "title" => "Blinds Slat Position Percentage",
          "type" => "object"
        },
        %{
          "additionalProperties" => false,
          "properties" => %{
            "datapoint_type" => %{"const" => "urn:knx:dpt.upDown"},
            "function_ref" => %{"format" => "uuid", "type" => "string"},
            "id" => %{"format" => "uuid", "type" => "string"},
            "title" => %{"type" => "string"},
            "type" => %{"const" => "mac#BlindsStatus"}
          },
          "required" => ["id", "type", "title", "datapoint_type", "function_ref"],
          "title" => "Blinds Status",
          "type" => "object"
        },
        %{
          "additionalProperties" => false,
          "properties" => %{
            "datapoint_type" => %{"const" => "urn:knx:dpt.step"},
            "function_ref" => %{"format" => "uuid", "type" => "string"},
            "id" => %{"format" => "uuid", "type" => "string"},
            "title" => %{"type" => "string"},
            "type" => %{"const" => "mac#BlindsStopStep"}
          },
          "required" => ["id", "type", "title", "datapoint_type", "function_ref"],
          "title" => "Blinds Stop Step",
          "type" => "object"
        },
        %{
          "additionalProperties" => false,
          "properties" => %{
            "datapoint_type" => %{"const" => "urn:knx:dpt.trigger"},
            "function_ref" => %{"format" => "uuid", "type" => "string"},
            "id" => %{"format" => "uuid", "type" => "string"},
            "title" => %{"type" => "string"},
            "type" => %{"const" => "mac#BlindsStopTrigger"}
          },
          "required" => ["id", "type", "title", "datapoint_type", "function_ref"],
          "title" => "Blinds Stop Trigger",
          "type" => "object"
        },
        %{
          "additionalProperties" => false,
          "properties" => %{
            "datapoint_type" => %{"const" => "urn:knx:dpt.date"},
            "function_ref" => %{"format" => "uuid", "type" => "string"},
            "id" => %{"format" => "uuid", "type" => "string"},
            "title" => %{"type" => "string"},
            "type" => %{"const" => "mac#CurrentDate"}
          },
          "required" => ["id", "type", "title", "datapoint_type", "function_ref"],
          "title" => "Current Date",
          "type" => "object"
        },
        %{
          "additionalProperties" => false,
          "properties" => %{
            "datapoint_type" => %{"const" => "urn:knx:dpt.dateTime"},
            "function_ref" => %{"format" => "uuid", "type" => "string"},
            "id" => %{"format" => "uuid", "type" => "string"},
            "title" => %{"type" => "string"},
            "type" => %{"const" => "mac#CurrentDateAndTime"}
          },
          "required" => ["id", "type", "title", "datapoint_type", "function_ref"],
          "title" => "Current Date and Time",
          "type" => "object"
        },
        %{
          "additionalProperties" => false,
          "properties" => %{
            "datapoint_type" => %{"const" => "urn:knx:dpt.timeOfDay"},
            "function_ref" => %{"format" => "uuid", "type" => "string"},
            "id" => %{"format" => "uuid", "type" => "string"},
            "title" => %{"type" => "string"},
            "type" => %{"const" => "mac#CurrentTime"}
          },
          "required" => ["id", "type", "title", "datapoint_type", "function_ref"],
          "title" => "Current Time",
          "type" => "object"
        },
        %{
          "additionalProperties" => false,
          "properties" => %{
            "datapoint_type" => %{"const" => "urn:knx:dpt.alarm"},
            "function_ref" => %{"format" => "uuid", "type" => "string"},
            "id" => %{"format" => "uuid", "type" => "string"},
            "title" => %{"type" => "string"},
            "type" => %{"const" => "mac#FrostAlarm"}
          },
          "required" => ["id", "type", "title", "datapoint_type", "function_ref"],
          "title" => "Frost Alarm",
          "type" => "object"
        },
        %{
          "additionalProperties" => false,
          "properties" => %{
            "datapoint_type" => %{"const" => "urn:knx:dpt.scaling"},
            "function_ref" => %{"format" => "uuid", "type" => "string"},
            "id" => %{"format" => "uuid", "type" => "string"},
            "title" => %{"type" => "string"},
            "type" => %{"const" => "mac#LightAbsoluteSetvalueRequest"}
          },
          "required" => ["id", "type", "title", "datapoint_type", "function_ref"],
          "title" => "Light Absolute Setvalue Request",
          "type" => "object"
        },
        %{
          "additionalProperties" => false,
          "properties" => %{
            "datapoint_type" => %{"const" => "urn:knx:dpt.scaling"},
            "function_ref" => %{"format" => "uuid", "type" => "string"},
            "id" => %{"format" => "uuid", "type" => "string"},
            "title" => %{"type" => "string"},
            "type" => %{"const" => "mac#LightCurrentDimmingValue"}
          },
          "required" => ["id", "type", "title", "datapoint_type", "function_ref"],
          "title" => "Light Current Dimming Value",
          "type" => "object"
        },
        %{
          "additionalProperties" => false,
          "properties" => %{
            "datapoint_type" => %{"const" => "urn:knx:dpt.switch"},
            "function_ref" => %{"format" => "uuid", "type" => "string"},
            "id" => %{"format" => "uuid", "type" => "string"},
            "title" => %{"type" => "string"},
            "type" => %{"const" => "mac#LightCurrentStatus"}
          },
          "required" => ["id", "type", "title", "datapoint_type", "function_ref"],
          "title" => "Light Current Status",
          "type" => "object"
        },
        %{
          "additionalProperties" => false,
          "properties" => %{
            "datapoint_type" => %{"const" => "urn:knx:dpt.controlDimming"},
            "function_ref" => %{"format" => "uuid", "type" => "string"},
            "id" => %{"format" => "uuid", "type" => "string"},
            "title" => %{"type" => "string"},
            "type" => %{"const" => "mac#LightRelativeDimmingRequest"}
          },
          "required" => ["id", "type", "title", "datapoint_type", "function_ref"],
          "title" => "Light Relative Dimming Request",
          "type" => "object"
        },
        %{
          "additionalProperties" => false,
          "properties" => %{
            "datapoint_type" => %{"const" => "urn:knx:dpt.switch"},
            "function_ref" => %{"format" => "uuid", "type" => "string"},
            "id" => %{"format" => "uuid", "type" => "string"},
            "title" => %{"type" => "string"},
            "type" => %{"const" => "mac#LightSwitchRequest"}
          },
          "required" => ["id", "type", "title", "datapoint_type", "function_ref"],
          "title" => "Light Switch Request",
          "type" => "object"
        },
        %{
          "additionalProperties" => false,
          "properties" => %{
            "datapoint_type" => %{"const" => "urn:knx:dpt.alarm"},
            "function_ref" => %{"format" => "uuid", "type" => "string"},
            "id" => %{"format" => "uuid", "type" => "string"},
            "title" => %{"type" => "string"},
            "type" => %{"const" => "mac#RainAlarm"}
          },
          "required" => ["id", "type", "title", "datapoint_type", "function_ref"],
          "title" => "Rain Alarm",
          "type" => "object"
        },
        %{
          "additionalProperties" => false,
          "properties" => %{
            "datapoint_type" => %{"const" => "urn:knx:dpt.deltaTimeMin"},
            "function_ref" => %{"format" => "uuid", "type" => "string"},
            "id" => %{"format" => "uuid", "type" => "string"},
            "title" => %{"type" => "string"},
            "type" => %{"const" => "mac#RelationToGMT"}
          },
          "required" => ["id", "type", "title", "datapoint_type", "function_ref"],
          "title" => "Relation to GMT",
          "type" => "object"
        },
        %{
          "additionalProperties" => false,
          "properties" => %{
            "datapoint_type" => %{"const" => "urn:knx:dpt.upDown"},
            "function_ref" => %{"format" => "uuid", "type" => "string"},
            "id" => %{"format" => "uuid", "type" => "string"},
            "title" => %{"type" => "string"},
            "type" => %{"const" => "mac#ShutterMoveUpDown"}
          },
          "required" => ["id", "type", "title", "datapoint_type", "function_ref"],
          "title" => "Shutter Move Up Down",
          "type" => "object"
        },
        %{
          "additionalProperties" => false,
          "properties" => %{
            "datapoint_type" => %{"const" => "urn:knx:dpt.lengthmm"},
            "function_ref" => %{"format" => "uuid", "type" => "string"},
            "id" => %{"format" => "uuid", "type" => "string"},
            "title" => %{"type" => "string"},
            "type" => %{"const" => "mac#ShutterPositionLength"}
          },
          "required" => ["id", "type", "title", "datapoint_type", "function_ref"],
          "title" => "Shutter Position Length",
          "type" => "object"
        },
        %{
          "additionalProperties" => false,
          "properties" => %{
            "datapoint_type" => %{"const" => "urn:knx:dpt.scaling"},
            "function_ref" => %{"format" => "uuid", "type" => "string"},
            "id" => %{"format" => "uuid", "type" => "string"},
            "title" => %{"type" => "string"},
            "type" => %{"const" => "mac#ShutterPositionPercentage"}
          },
          "required" => ["id", "type", "title", "datapoint_type", "function_ref"],
          "title" => "Shutter Position Percentage",
          "type" => "object"
        },
        %{
          "additionalProperties" => false,
          "properties" => %{
            "datapoint_type" => %{"const" => "urn:knx:dpt.upDown"},
            "function_ref" => %{"format" => "uuid", "type" => "string"},
            "id" => %{"format" => "uuid", "type" => "string"},
            "title" => %{"type" => "string"},
            "type" => %{"const" => "mac#ShutterStatus"}
          },
          "required" => ["id", "type", "title", "datapoint_type", "function_ref"],
          "title" => "Shutter Status",
          "type" => "object"
        },
        %{
          "additionalProperties" => false,
          "properties" => %{
            "datapoint_type" => %{"const" => "urn:knx:dpt.step"},
            "function_ref" => %{"format" => "uuid", "type" => "string"},
            "id" => %{"format" => "uuid", "type" => "string"},
            "title" => %{"type" => "string"},
            "type" => %{"const" => "mac#ShutterStopStep"}
          },
          "required" => ["id", "type", "title", "datapoint_type", "function_ref"],
          "title" => "Shutter Stop Step",
          "type" => "object"
        },
        %{
          "additionalProperties" => false,
          "properties" => %{
            "datapoint_type" => %{"const" => "urn:knx:dpt.trigger"},
            "function_ref" => %{"format" => "uuid", "type" => "string"},
            "id" => %{"format" => "uuid", "type" => "string"},
            "title" => %{"type" => "string"},
            "type" => %{"const" => "mac#ShutterStopTrigger"}
          },
          "required" => ["id", "type", "title", "datapoint_type", "function_ref"],
          "title" => "Shutter Stop Trigger",
          "type" => "object"
        },
        %{
          "additionalProperties" => false,
          "properties" => %{
            "datapoint_type" => %{"const" => "urn:knx:dpt.alarm"},
            "function_ref" => %{"format" => "uuid", "type" => "string"},
            "id" => %{"format" => "uuid", "type" => "string"},
            "title" => %{"type" => "string"},
            "type" => %{"const" => "mac#WindAlarm"}
          },
          "required" => ["id", "type", "title", "datapoint_type", "function_ref"],
          "title" => "Wind Alarm",
          "type" => "object"
        }
      ]
    }

    schema = ExJsonSchema.Schema.resolve(schema_org)

    payload =
      """
          {
            "id": "8a82c472-113c-45eb-87c8-5edb6acb9199",
            "type": "mac#LightCurrentStatus",
            "title": "Light CurrentStatus",
            "datapoint_type": "urn:knx:dpt.switch",
            "function_ref": "9fc15a63-37d1-4c6d-9457-bbef0ab44718"
          }
      """
      |> Jason.decode!()

    ExJsonSchema.Validator.validate(schema, payload) |> dbg
  end
end
