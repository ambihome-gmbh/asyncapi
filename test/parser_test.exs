defmodule ParserTest do
  use ExUnit.Case

  import Asyncapi.Parser

  test "step" do
    assert %{parameters: %{}, to: "to", from: "from", payload: %{}, operation: "operation"} ==
             parse_step("from->to: operation")

    assert %{
             parameters: %{"p1" => {:reference, "r"}, "p2" => {:literal, 1}},
             to: "t",
             from: "f",
             payload: %{
               "bnd" => {:binding, "bind"},
               "flt" => {:literal, 1.2},
               "int" => {:literal, 1},
               "ref" => {:reference, "ref"},
               "str" => {:literal, "tst"}
             },
             operation: "op"
           } ==
             parse_step(
               "f->t: op[p1: $r, p2: 1]/{int: 1, str: 'tst', ref: $ref, flt: 1.2, bnd: bind}"
             )
  end
end
