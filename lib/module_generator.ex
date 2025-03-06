# TODO BM muss recompilen wenn neue APIs in config gibt oder wenn sich diese geaendert haben
module_datas =
  for {_, schema_path} <- Application.compile_env(:asyncapi, :schemas),
      schema = schema_path |> File.read!() |> Jason.decode!(),
      api_title = Recase.to_pascal(schema["info"]["title"]),
      {payload_name, payload_schema} <- schema["components"]["schemas"] do
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
    module_name = Module.concat(module_name_parts)

    {module_name, struct_keys, enforce_keys}
  end

module_datas
|> Enum.uniq()
|> Enum.map(fn {module_name, struct_keys, enforce_keys} ->
  IO.puts("generating module #{module_name}")

  defmodule module_name do
    @enforce_keys enforce_keys
    defstruct struct_keys
  end
end)
