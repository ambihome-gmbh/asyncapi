defmodule ModuleTest do
  use ExUnit.Case

  test "wip" do
    assert %SampleApi.SomePayload{
             prop_with_no_default: nil,
             some_int_prop: 4711,
             some_prop: "foo"
           } == %SampleApi.SomePayload{some_prop: "foo"}
  end
end
