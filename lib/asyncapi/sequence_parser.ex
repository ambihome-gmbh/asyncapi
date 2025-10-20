defmodule Asyncapi.SequenceParser do
  use AbnfParsec,
    parse: :step,
    import_core_rules: true,
    unbox: ["step"],
    ignore: [
      "ows",
      "colon",
      "slash",
      "lbrace",
      "rbrace",
      "lbrack",
      "rbrack",
      "comma",
      "dollar"
    ],
    transform: %{
      "ident" => {:reduce, {List, :to_string, []}},
      "string" => {:reduce, {List, :to_string, []}},
      "integer" => [{:reduce, {List, :to_string, []}}, {:map, {String, :to_integer, []}}],
      "float" => [{:reduce, {List, :to_string, []}}, {:map, {String, :to_float, []}}],
      "true" => {:replace, true},
      "false" => {:replace, false},
      "nil" => {:replace, nil}
    },
    abnf: """
    ; ===== whitespace =====
    ows        = *(%x20 / %x09 / %x0A / %x0D)

    ; ===== punctuators (named so we can ignore them) =====
    colon      = ":"
    slash      = "/"
    lbrace     = "{"
    rbrace     = "}"
    lbrack     = "["
    rbrack     = "]"
    comma      = ","

    ; ===== top-level =====
    step       = ows actor arrow actor colon ows operation [ params ] [ payload ]

    actor      = ident
    operation  = ident
    arrow      = "->>" / "->"

    ; ===== params & payload =====
    params     = lbrack ows [ kv-list ] ows rbrack
    payload    = slash ows ( map / literal )

    ; ===== key/values =====
    kv-list    = kv-pair *( ows comma ows kv-pair )
    kv-pair    = ident ows colon ows value
    value      = literal / list / reference / binding / map

    ; ===== containers =====
    map        = lbrace ows [ kv-list ] ows rbrace
    list       = lbrack ows [ literal *( ows comma ows literal ) ] ows rbrack

    ; ===== terminals =====
    literal    = string / float / integer / true / false / nil
    true       = "true"
    false      = "false"
    nil        = "nil"

    ; single-quoted ASCII string without a single-quote
    string     = %x27 *( %x20-26 / %x28-7E ) %x27

    ; numbers
    float      = 1*DIGIT "." 1*DIGIT
    integer    = 1*DIGIT

    ; refs & bindings
    reference  = dollar ident
    dollar     = "$"
    binding    = ident

    ; identifiers: words separated by single hyphens (no trailing hyphen)
    ident      = 1*( ALPHA / DIGIT / "_" ) *( "-" 1*( ALPHA / DIGIT / "_" ) )
    """

  # --- shaping layer
  def parse_step(str) do
    case parse(str) do
      {:ok, ast, "", _c, _l, _o} -> shape(ast)
      {:ok, _ast, rest, _c, _l, _o} -> {:error, "unconsumed: #{inspect(rest)}"}
      {:error, msg, rest, _c, _l, _o} -> {:error, "#{msg} at #{inspect(rest)}"}
    end
  end

  defp shape([
         {:actor, [ident: [from]]},
         {:arrow, [arr]},
         {:actor, [ident: [to]]},
         {:operation, [ident: [op]]} | tail
       ]) do
    {params, payload} = take_params_payload(tail)

    %{
      from: from,
      to: to,
      arrow:
        case arr do
          "->>" -> :async
          "->" -> :sync
        end,
      operation: op,
      params: params,
      payload: payload
    }
  end

  defp take_params_payload(items) do
    params =
      case Enum.find(items, &match?({:params, _}, &1)) do
        {:params, [kv_list: kv_pairs]} -> kvpairs_to_map(kv_pairs)
        nil -> %{}
        unexpected -> raise(inspect(unexpected))
      end

    payload =
      case Enum.find(items, &match?({:payload, _}, &1)) do
        {:payload, [map: [kv_list: kv_pairs]]} -> kvpairs_to_map(kv_pairs)
        {:payload, [literal: _] = litaral} -> shape_value(litaral)
        nil -> %{}
        unexpected -> raise(inspect(unexpected))
      end

    {params, payload}
  end

  defp kvpairs_to_map(kv_pairs) do
    Map.new(
      kv_pairs,
      fn {:kv_pair, [ident: [k], value: value]} -> {k, shape_value(value)} end
    )
  end

  defp shape_value(value) when not is_list(value) do
    shape_value([value])
  end

  defp shape_value(literal: [string: [v]]), do: {:literal, String.trim(v, "'")}
  defp shape_value(literal: [{_, [v]}]), do: {:literal, v}
  defp shape_value(reference: [ident: [id]]), do: {:reference, id}
  defp shape_value(binding: [ident: [id]]), do: {:binding, id}

  defp shape_value(list: items) do
    {:list, Enum.map(items, &shape_value/1)}
  end

  defp shape_value(map: [kv_list: kv_pairs]) do
    {:map, kvpairs_to_map(kv_pairs)}
  end

  defp shape_value(unexpected) do
    raise(inspect(unexpected))
  end
end
