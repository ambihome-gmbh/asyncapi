defmodule ParserTest do
  use ExUnit.Case

  import Asyncapi.Parser

  test "step" do
    assert %{
             from: "from",
             to: "to",
             operation: "operation",
             params: %{},
             payload: %{},
             arrow: :sync
           } ==
             parse_step("from->to: operation")

    assert %{payload: {:literal, 1}} = parse_step("f->t: o/1")
    assert %{payload: {:literal, 1.2}} = parse_step("f->t: o/1.2")
    assert %{payload: {:literal, nil}} = parse_step("f->t: o/nil")
    assert %{payload: {:literal, true}} = parse_step("f->t: o/true")
    assert %{payload: {:literal, false}} = parse_step("f->t: o/false")
    assert %{payload: {:literal, "string"}} = parse_step("f->t: o/'string'")

    assert %{
             params: %{"p1" => {:reference, "r"}, "p2" => {:literal, 1}},
             to: "t",
             from: "f",
             payload: %{
               "bnd" => {:binding, "bind"},
               "flt" => {:literal, 1.2},
               "int" => {:literal, 1},
               "ref" => {:reference, "ref"},
               "str" => {:literal, "tst"},
               "estr" => {:literal, ""},
               "nul" => {:literal, nil},
               "bol" => {:literal, true},
               "lst" => {:list, [{:literal, 1}, {:literal, "a"}]},
               "elst" => {:list, []}
             },
             operation: "op",
             arrow: :async
           } ==
             parse_step(
               "f->>t: op[p1: $r, p2: 1]/{int: 1, str: 'tst', estr: '', ref: $ref, flt: 1.2, bnd: bind, nul: nil, bol: true, lst: [1, 'a'], elst: []}"
             )

    # assert %{arrow: :sync_reply} = parse_step("from-->to: operation")
    # assert %{arrow: :async_reply} = parse_step("from-->>to: operation")
  end
end
