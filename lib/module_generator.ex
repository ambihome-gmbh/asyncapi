# TODO - config
used_schemas = [
  "test/schema/simple/common_schema.json",
  "test/schema/stack/common_schema.json",
  "test/schema/complex/service_schema.json"
]

for schema_path <- used_schemas do
  schema = schema_path |> File.read!() |> Jason.decode!()

  api_title = Recase.to_pascal(schema["info"]["title"])

  for {payload_name, payload_schema} <- schema["components"]["schemas"] do
    if Map.get(payload_schema, "additionalProperties") == true do
      raise("this will not work with structs.")
    end

    struct_keys =
      for {prop_name, prop_schema} <- payload_schema["properties"] do
        {
          String.to_atom(prop_name),
          Map.get(prop_schema, "default")
        }
      end

    enforce_keys = payload_schema |> Map.get("required", []) |> Enum.map(&String.to_atom/1)

    module_name_parts = [api_title, Recase.to_pascal(payload_name)]

    defmodule Module.concat(module_name_parts) do
      @enforce_keys enforce_keys
      defstruct struct_keys
    end
  end
end
