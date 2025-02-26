defmodule StackTest do
  use ExUnit.Case

  alias MqttAsyncapi.Message

  def start_broker(), do: {"nanomq\n", 0} = System.cmd("docker", ["start", "nanomq"])
  def stop_broker(), do: System.cmd("docker", ["stop", "nanomq"])

  setup do
    {:ok, _} = start_supervised({Stack.ServiceA, []})
    {:ok, _} = start_supervised({Stack.ServiceB, pid: self()})
    start_broker()
    on_exit(&stop_broker/0)
    :ok
  end

  test "push and pop operations" do
    send(Stack.ServiceB, {:trigger, "push", 10})
    send(Stack.ServiceB, {:trigger, "pop"})

    assert_receive {:pop_response, 10}
  end

  test "push and top operations" do
    send(Stack.ServiceB, {:trigger, "push", 20})
    send(Stack.ServiceB, {:trigger, "top"})

    assert_receive {:top_response, 20}
  end

  test "pop from empty stack" do
    send(Stack.ServiceB, {:trigger, "pop"})
    refute_receive {:pop_response, _}
  end

  test "top from empty stack" do
    send(Stack.ServiceB, {:trigger, "top"})
    refute_receive {:top_response, _}
  end
end
