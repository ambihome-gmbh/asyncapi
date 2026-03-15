defmodule Asyncapi.TestHelper.Formatter do
  def format(data, kw_list? \\ false)

  def format(data, false) do
    format_(data)
  end

  def format(data, true) do
    data |> format_() |> String.trim_leading("{") |> String.trim_trailing("}")
  end

  def format_(data) when is_map(data) do
    formatted_map =
      Enum.map_join(
        data,
        ", ",
        fn
          {k, v} when is_atom(k) or is_binary(k) -> "#{k}: #{format_(v)}"
          {k, _v} -> raise("ERROR: can't format key #{k}")
        end
      )

    "{#{formatted_map}}"
  end

  def format_(data) when is_list(data) do
    "[#{Enum.map_join(data, ", ", &format_/1)}]"
  end

  def format_(data) when is_binary(data), do: "'#{data}'"
  def format_(data) when is_atom(data), do: "'#{data}'"
  def format_(data), do: "#{data}"
end
