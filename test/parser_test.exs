defmodule ParserTest do
  use ExUnit.Case

  import Asyncapi.SequenceParser

  @tag :wip
  test "multiline" do
    assert [
             %{from: "from1", to: "to1", operation: "op1"},
             %{from: "from2", to: "to2", operation: "op2"}
           ] =
             Asyncapi.SequenceParser.parse_multiline!(
               """
               from1->to1: op1
               from2->to2: op2
               """,
               "test_multiline"
             )

    testcase = %{
      name: "create, push, pop - ok",
      sequence: """
         user->>service: create/{name: 'SomeName'}
         service->>user: create_response/{name: 'SomeName', id: stack_id}
         user->>service: push[stack_id: $stack_id]/{value: 42}
         user->>service: pop[stack_id: $stack_id]
         service->>user: pop_response[stack_id: $stack_id]/{value: 42}
      """
    }

    Asyncapi.SequenceParser.parse_multiline!(testcase.sequence, testcase.name)
  end

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

    assert %{operation: "kebab-case-operation"} = parse_step("from->to: kebab-case-operation")

    assert %{payload: {:literal, 1}} = parse_step("f->t: o/1")
    assert %{payload: {:literal, 1.2}} = parse_step("f->t: o/1.2")
    assert %{payload: {:literal, nil}} = parse_step("f->t: o/nil")
    assert %{payload: {:literal, true}} = parse_step("f->t: o/true")
    assert %{payload: {:literal, false}} = parse_step("f->t: o/false")
    assert %{payload: {:literal, "string"}} = parse_step("f->t: o/'string'")

    assert %{payload: %{"k" => {:literal, "v"}}} = parse_step("f->t: o/{k: 'v'}")

    assert %{
             payload: %{"k" => {:map, %{"j" => {:literal, "v"}}}}
           } =
             parse_step("f->t: o/{k: {j: 'v'}}")

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
