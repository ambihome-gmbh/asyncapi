defmodule DummyBrokerTest do
  use ExUnit.Case

  setup do
    start_supervised({Registry, keys: :duplicate, name: DummyBroker.Registry})
    :ok
  end

  @tag :wip
  test "temp" do
    spawn(fn -> subscriber("client_1", ["foo/bar", "foo/+"]) end)
    spawn(fn -> subscriber("client_2", ["moo/baz", "moo/+"]) end)

    DummyBroker.subscribe("ack/+")

    DummyBroker.publish("foo/bar")
    assert_receive {:publish, "ack/client_1"}

    DummyBroker.publish("foo/baz")
    assert_receive {:publish, "ack/client_1"}

    DummyBroker.publish("moo/bar")
    assert_receive {:publish, "ack/client_2"}

    DummyBroker.publish("moo/baz")
    assert_receive {:publish, "ack/client_2"}
  end

  def subscriber(client_id, subscriptions) do
    Enum.each(subscriptions, fn topic ->
      DummyBroker.subscribe(topic)
    end)

    loop(client_id)
  end

  defp loop(client_id) do
    receive do
      msg ->
        dbg(msg)
        DummyBroker.publish("ack/#{client_id}")
        loop(client_id)
    end
  end
end
