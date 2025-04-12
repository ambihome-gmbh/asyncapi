defmodule SchemaBuilder.ApplicationFunctions do
  import Enum

  def defs(kimappfuns) do
    for appfun <- kimappfuns, into: %{} do
      # properties = %{
      #   id: %{type: "string", format: "uuid"},
      #   name: %{type: "string"},
      #   type: %{const: appfun.urn},
      #   trade: %{const: appfun.trade},
      #   function_points: %{
      #     type: "object",
      #     required: appfun.function_points,
      #     properties: Map.new(appfun.function_points, &{&1, %{type: "string", format: "uuid"}}),
      #     additionalProperties: false
      #   },
      #   function_location: %{type: "string", format: "uuid"}
      # }

      functionpoint_properties =
        %Jason.OrderedObject{
          values:
            Enum.map(appfun.function_points, fn key ->
              {key, %{"type" => "string", "format" => "uuid"}}
            end)
        }

      properties = [
        {"id", %{"type" => "string", "format" => "uuid"}},
        {"type", %{"const" => appfun.urn}},
        {"trade", %{"const" => appfun.trade}},
        {"name", %{"type" => "string"}},
        {
          "function_points",
          %{
            "type" => "object",
            "required" => appfun.function_points,
            "properties" => functionpoint_properties,
            "additionalProperties" => false
          }
        },
        {"function_location", %{"type" => "string", "format" => "uuid"}}
      ]

      required = map(properties, fn {k, _} -> k end)

      {
        appfun.urn,
        %{
          type: "object",
          title: appfun.label,
          required: required,
          properties: %Jason.OrderedObject{values: properties},
          additionalProperties: false
        }
      }
    end
  end
end
