defmodule Asyncapi.Parser.Sequence do
  @moduledoc """
  you can drop the following block here: https://www.planttext.com/

  ```plantuml
  @startuml

  ' messages from service are expected by the test, other messages are sent from the test to the service

  ' some user of the service (i.e. the test process)
  participant user
  ' the service under test, running in a AsyncApi-Genserver
  participant service
  ' service's helper processes, need to be named are accessed via registry,
  ' so that the test process can capture messages to them and answer in place
  participant internal

  ' sync request to a service-internal process. expects a GenServer.call().
  service -> internal: sync-request (:gen.call)
  ' sync reply is implemented as a GenServer.reply() from the test process
  internal --> service: sync-reply (:gen.reply)

  ' async request to a service-internal process. expects a GenServer.cast.
  service ->> internal: async-request (:gen.cast)
  ' async reply is implemented as a send() from the test process
  internal -->> service: async-reply (send)

  ' async user<->service communication always uses a broker. (sync not allowed).
  user ->> service: async-request (publish)
  service -->> user: async-reply (publish)

  ' messages syntax
  ' op_id = asyncapi operation ID
  ' parameters in [ ], only string values allowed
  ' payload in { }, strings, int, float, nil, bool, lists allowed. NO NESTED STRUCTURES!
  user -> service: op_id1[param: 'param_val']/{payload_key1: 'value1', ...}
  ' can bind to var in expected messages
  service -> user: op_id2/{k: var}
  ' and reference them in messages sent
  user -> service: op_id3/{l: $var}
  ```

  @enduml
  """
  import NimbleParsec

  defp ident() do
    ascii_string([?a..?z, ?A..?Z, ?0..?9, ?_], min: 1, max: 100)
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

    optional(comb |> times(sep_comb, min: 0))
  end

  defp literal() do
    string_literal =
      ignore(string("'"))
      |> utf8_string([not: ?'], min: 0)
      |> ignore(string("'"))

    float_literal =
      integer(min: 1)
      |> string(".")
      |> integer(min: 1)
      |> post_traverse({:get_float, []})

    choice([
      string("nil") |> replace(nil),
      string("true") |> replace(true),
      string("false") |> replace(false),
      float_literal,
      integer(min: 1),
      string_literal
    ])
    |> unwrap_and_tag(:literal)
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

    boolean_literal =
      choice([
        "true" |> string() |> replace(true),
        "false" |> string() |> replace(false)
      ])
      |> unwrap_and_tag(:literal)

    nil_literal = string("nil") |> replace(nil) |> unwrap_and_tag(:literal)

    # NOTE: only literals in lists for now. update testhelper/deref if this changes!
    list =
      ignore(string("["))
      |> concat(sep_by(literal(), ","))
      |> concat(ignore(string("]")))
      |> tag(:list)

    reference =
      ignore(string("$"))
      |> concat(ident())
      |> unwrap_and_tag(:reference)

    binding = unwrap_and_tag(ident(), :binding)

    value =
      choice([
        # TODO use the literal function here and get rid of the duplications
        string_literal,
        float_literal,
        integer_literal,
        nil_literal,
        boolean_literal,
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

  defp map() do
    ignore(string("{"))
    |> concat(optional(kv_list()))
    |> concat(ignore(string("}")))
  end

  defp payload() do
    ignore(string("/"))
    |> choice([map(), literal()])
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

  defp arrow() do
    ignore(optional(whitespace()))
    |> choice([
      string("->>") |> replace(:async),
      # string("-->>") |> replace(:async_reply),
      string("->") |> replace(:sync)
      # string("-->") |> replace(:sync_reply)
    ])
    |> ignore(optional(whitespace()))
    |> tag(:arrow)
  end

  def step() do
    ignore(optional(whitespace()))
    |> concat(bind_ident(:actor_from))
    |> ignore(optional(whitespace()))
    |> concat(arrow())
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
      arrow: [arrow],
      params: params,
      payload: payload
    } = parsed

    %{
      from: actor_from,
      to: actor_to,
      arrow: arrow,
      operation: operation,
      params: maybe_resolve_kv(params),
      payload: maybe_resolve_kv(payload)
    }
  end

  defp maybe_resolve_kv(literal: literal), do: {:literal, literal}

  defp maybe_resolve_kv(kv_pair_list) do
    Enum.reduce(
      kv_pair_list,
      %{},
      fn
        {:kv_pair, [k, v]}, acc -> Map.put(acc, k, v)
      end
    )
  end

  defparsec(:step, Asyncapi.Parser.Sequence.step())

  def parse_step(sequence_string) do
    sequence_string |> step |> resolve_step
  end
end
