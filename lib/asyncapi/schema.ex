defmodule Asyncapi.Schema do

  defmacro __using__(opts) do
    schema_path = Keyword.fetch!(opts, :schema_path)
    schema = Asyncapi.load(schema_path, __CALLER__.module)

    quote do
      @schema_file_glob unquote(schema_path)
                        |> Path.dirname()
                        |> Path.join("../**")

      @schem_hash @schema_file_glob
                  |> Path.wildcard()
                  |> Enum.map(&File.stat!(&1))
                  |> inspect()
                  |> :erlang.md5()
                  |> dbg

      def __mix_recompile__?() do
        dbg(:recompile_checker)
        new_hash =
          @schema_file_glob
          |> Path.wildcard()
          |> Enum.map(&File.stat!(&1))
          |> inspect()
          |> :erlang.md5()

        # TODO bundle

        new_hash != @schem_hash
      end

      def get_asyncapi() do
        unquote(Macro.escape(schema))
      end
    end
  end
end
