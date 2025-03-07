defmodule ModuleGeneratorTest do
  use ExUnit.Case

  alias SampleApi.Payload

  @tag :mg
  test "module datas" do
    assert [
             {Payload.P1, [], []},
             {
               Payload.P2,
               [p: nil, p_hasdefault: 4711, p_isrequired: nil],
               [:p_isrequired]
             },
             {Payload.P3, [], []},
             {Payload.P4, [{:p, nil}, {:p_hasdefault, 4711}, {:p_isrequired, nil}],
              [:p_isrequired]}
           ] == ModuleGenerator.get_module_datas([{"", "test/schema/schema.json"}])
  end
end
