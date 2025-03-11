defmodule ParserTest do
  use ExUnit.Case

  import Asyncapi.Parser

  test "step" do
    assert %{params: %{}, to: "to", from: "from", payload: %{}, operation: "operation"} ==
             parse_step("from->to: operation")

    assert %{
             params: %{p1: {:reference, "r"}, p2: {:literal, 1}},
             to: "t",
             from: "f",
             payload: %{
               bnd: {:binding, "bind"},
               flt: {:literal, 1.2},
               int: {:literal, 1},
               ref: {:reference, "ref"},
               str: {:literal, "tst"},
               estr: {:literal, ""},
               nul: {:literal, nil},
               lst: {:list, [{:literal, 1}, {:literal, "a"}]},
               elst: {:list, []}
             },
             operation: "op"
           } ==
             parse_step(
               "f->t: op[p1: $r, p2: 1]/{int: 1, str: 'tst', estr: '', ref: $ref, flt: 1.2, bnd: bind, nul: nil, lst: [1, 'a'], elst: []}"
             )
  end
end
