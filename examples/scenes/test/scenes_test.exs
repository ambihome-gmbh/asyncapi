defmodule ScenesTest do
  use ExUnit.Case
  require Asyncapi.TestHelper

  setup do
    Asyncapi.TestHelper.start_broker()
    :ok
  end

  Asyncapi.TestHelper.generate_tests(CoboServices.Scenes, "priv/schema/bundled/scenes_user.json")

end
