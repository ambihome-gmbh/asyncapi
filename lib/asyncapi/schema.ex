defmodule Asyncapi.Schema do
  defmacro __using__(opts) do
    schema_file = Keyword.fetch!(opts, :schema_path)

    quote do
      schema_root = Application.compile_env!(:asyncapi, :schema_root)
      @schema_path Path.join(schema_root, unquote(schema_file))
      @asyncapi_schema Asyncapi.load(@schema_path, __MODULE__)

      @schema_hash @schema_path |> File.read!() |> :erlang.md5()
      def __mix_recompile__?() do
        new_hash = @schema_path |> File.read!() |> :erlang.md5()
        new_hash != @schema_hash
      end

      def get_asyncapi() do
        @asyncapi_schema
      end
    end
  end
end
