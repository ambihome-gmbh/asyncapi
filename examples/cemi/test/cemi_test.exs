defmodule CemiTest do
  use ExUnit.Case
  require Asyncapi.TestHelper

  @broker Application.compile_env(:asyncapi, :broker)

  setup do
    Asyncapi.TestHelper.start_broker()
    Process.register(self(), Panex.KNX.UARTListener)

    :ok
  end

  Asyncapi.TestHelper.generate_tests(Panex.Service.Cemi, TestUserSchema, @broker)
end
