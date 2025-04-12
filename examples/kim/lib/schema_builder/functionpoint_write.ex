defmodule SchemaBuilder.FunctionpointWrite do
  def defs(kimfunpoints, dpt_urn_mapping) do
    for funpoint <- kimfunpoints, into: %{} do
      id = funpoint["FunctionPoint"]

      dpt_urn = dpt_urn_mapping[funpoint["datapointType"]]

      properties = %{
        "id" => %{"type" => "string", "format" => "uuid"},
        "type" => %{"const" => id},
        "datapoint_type" => %{"const" => dpt_urn},
        "value" => %{"$ref" => "./datapoint-types.json#/urn:knx:dpt.switch"}
      }

      {
        id,
        %{
          type: "object",
          title: "write: #{funpoint["Label"]}",
          required: Map.keys(properties),
          properties: properties,
          additionalProperties: false
        }
      }
    end
  end
end
