defmodule Asyncapi.Schema do
  def get_module_datas(schema) do
    for {_, operation} <- schema.operations do
      if Map.get(operation.payload_schema, "additionalProperties", true) == true do
        raise("additionalProperties has to be set to false in schema! #{inspect(operation)}")
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
  end

  defmacro __using__(opts) do
    schema_path = Keyword.fetch!(opts, :schema_path)
    schema = Asyncapi.load(schema_path, __CALLER__.module)

    module_datas = get_module_datas(schema)

    modules =
      Enum.map(module_datas, fn {module_name, struct_keys, enforce_keys} ->
        IO.puts("generating module #{module_name}")

        quote do
          defmodule unquote(module_name) do
            @enforce_keys unquote(enforce_keys)
            defstruct unquote(struct_keys)
          end
        end
      end)

    quote do
      # TODO mix-recompile
      unquote(modules)

      def get_asyncapi() do
        unquote(Macro.escape(schema))
      end
    end
  end
end
