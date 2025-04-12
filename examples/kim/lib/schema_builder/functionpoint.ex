defmodule SchemaBuilder.Functionpoint do
  import Enum

  def defs(kimfunpoints, dpt_urn_mapping) do
    for funpoint <- kimfunpoints, into: %{} do
      id = funpoint["FunctionPoint"]

      dpt_urn = dpt_urn_mapping[funpoint["datapointType"]]

      properties = %{
        id: %{type: "string", format: "uuid"},
        type: %{const: id},
        title: %{type: "string"},
        datapoint_type: %{const: dpt_urn},
        function_ref: %{type: "string", format: "uuid"}
      }

      required = properties |> Map.keys() |> map(&Atom.to_string/1)

      {
        id,
        %{
          type: "object",
          title: funpoint["Label"],
          required: required,
          properties: properties,
          additionalProperties: false
        }
      }
    end

  end
end
