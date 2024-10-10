defmodule WipTest do
  use ExUnit.Case

  test "remote ref" do
    _schema =
      "remote_test_schema.json"
      |> File.read!()
      |> Jason.decode!()
      |> ExJsonSchema.Schema.resolve()
  end
end
