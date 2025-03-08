defmodule Asyncapi.Parser.Sequence do
  import NimbleParsec

  defp ident() do
    ascii_string([?a..?z, ?A..?Z, ?0..?9, ?_], min: 1, max: 20)
  end

  defp whitespace() do
    choice([string(" "), string("\t"), string("\n"), string("\r")])
    |> repeat()
  end

  defp sep(sep_char) do
    string(sep_char) |> optional(whitespace())
  end

  defp sep_by(comb, sep_char) do
    sep_comb =
      ignore(optional(whitespace()))
      |> ignore(sep(sep_char))
      |> concat(comb)

    comb
    |> times(sep_comb, min: 0)
  end

  defp kv_pair() do
    key = ident()

    integer_literal =
      integer(min: 1)
      |> unwrap_and_tag(:literal)

    string_literal =
      ignore(string("'"))
      |> utf8_string([not: ?'], min: 0)
      |> ignore(string("'"))
      |> unwrap_and_tag(:literal)

    float_literal =
      integer(min: 1)
      |> string(".")
      |> integer(min: 1)
      |> post_traverse({:get_float, []})
      |> unwrap_and_tag(:literal)

    nil_literal = string("nil") |> replace(nil) |> unwrap_and_tag(:literal)

    # NOTE: only literals in lists for now. update testhelper/deref if this changes!
    list =
      ignore(string("["))
      |> concat(
        sep_by(
          choice([
            string_literal,
            float_literal,
            integer_literal,
            nil_literal
          ]),
          ","
        )
      )
      |> concat(ignore(string("]")))
      |> tag(:list)

    reference =
      ignore(string("$"))
      |> concat(ident())
      |> unwrap_and_tag(:reference)

    binding =
      ident()
      |> unwrap_and_tag(:binding)

    value =
      choice([
        string_literal,
        float_literal,
        integer_literal,
        nil_literal,
        list,
        reference,
        binding
      ])

    key
    |> concat(ignore(sep(":")))
    |> concat(value)
    |> tag(:kv_pair)
  end

  defp kv_list() do
    ignore(optional(whitespace()))
    |> concat(kv_pair())
    |> sep_by(",")
    |> ignore(optional(whitespace()))
  end

  defp payload() do
    ignore(string("/"))
    |> ignore(string("{"))
    |> concat(optional(kv_list()))
    |> concat(ignore(string("}")))
    |> tag(:payload)
  end

  defp params() do
    ignore(string("["))
    |> concat(optional(kv_list()))
    |> concat(ignore(string("]")))
    |> tag(:params)
  end

  defp bind_ident(binding) do
    ignore(optional(whitespace()))
    |> concat(ident())
    |> tag(binding)
  end

  def step() do
    ignore(optional(whitespace()))
    |> concat(bind_ident(:actor_from))
    |> ignore(optional(whitespace()))
    |> ignore(string("->"))
    |> ignore(optional(whitespace()))
    |> concat(bind_ident(:actor_to))
    |> ignore(string(":"))
    |> ignore(optional(whitespace()))
    |> concat(bind_ident(:operation))
    |> concat(optional(params()))
    |> concat(optional(payload()))
  end
end

defmodule Asyncapi.Parser do
  import NimbleParsec

  defp get_float(rest, args, context, _line, _offset) do
    [frac_part, _, int_part] = args
    float = String.to_float("#{int_part}.#{frac_part}")
    {rest, [float], context}
  end

  defp resolve_step({:ok, parsed_, "", _, _, _}) do
    parsed = Map.merge(%{params: [], payload: []}, Map.new(parsed_))

    %{
      actor_from: [actor_from],
      actor_to: [actor_to],
      operation: [operation],
      params: params,
      payload: payload
    } = parsed

    %{
      from: actor_from,
      to: actor_to,
      operation: operation,
      params: resolve_kv(params),
      payload: resolve_kv(payload)
    }
  end

  defp resolve_kv(kv_pair_list) do
    Enum.reduce(
      kv_pair_list,
      %{},
      fn
        {:kv_pair, [k, v]}, acc -> Map.put(acc, String.to_atom(k), v)
      end
    )
  end

  defparsec(:step, Asyncapi.Parser.Sequence.step())

  def parse_step(sequence_string) do
    sequence_string |> step |> resolve_step
  end
end
