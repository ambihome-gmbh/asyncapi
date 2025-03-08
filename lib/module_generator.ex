defmodule ModuleGenerator do
  def get_module_datas(schemas) do
    for {_, schema_path} <- schemas,
        schema = Asyncapi.load(schema_path),
        {_, operation} <- schema.operations do
      if Map.get(operation.payload_schema, "additionalProperties", true) == true do
        raise("additionalProperties are not allowed: #{inspect(operation)}")
      end

      struct_keys =
        for {prop_name, prop_schema} <- operation.payload_schema["properties"] do
          {
            String.to_atom(prop_name),
            Map.get(prop_schema, "default")
          }
        end

      enforce_keys =
        operation.payload_schema |> Map.get("required", []) |> Enum.map(&String.to_atom/1)

      {operation.payload_module_name, struct_keys, enforce_keys}
    end
    |> Enum.uniq()
  end
end

configured_schemas = Application.compile_env(:asyncapi, :schemas)
module_datas = ModuleGenerator.get_module_datas(configured_schemas)

Enum.map(module_datas, fn {module_name, struct_keys, enforce_keys} ->
  IO.puts("generating module #{module_name}")

  defmodule module_name do
    @enforce_keys enforce_keys
    defstruct struct_keys
  end
end)
