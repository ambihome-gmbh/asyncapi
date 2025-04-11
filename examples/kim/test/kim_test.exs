defmodule KimTest do
  use ExUnit.Case
  doctest Kim

  test "greets the world" do
    assert Kim.hello() == :world
  end
end
