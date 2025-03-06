defmodule DummyBrokerTest do
  use ExUnit.Case

  setup do
    start_supervised({Registry, keys: :duplicate, name: DummyBroker.Registry})
    :ok
  end

  @tag skip: "TODO geht nur wenn alleine aufgerufen wird"
  test "temp" do
    spawn(fn -> subscriber("client_1", ["foo/bar", "foo/+"]) end)
    spawn(fn -> subscriber("client_2", ["moo/baz", "moo/+"]) end)

    DummyBroker.subscribe("ack/+")

    DummyBroker.publish("foo/bar", "foobar")
    assert_receive {:publish, %{topic: "ack/client_1"}}

    DummyBroker.publish("foo/baz", "foobaz")
    assert_receive {:publish, %{topic: "ack/client_1"}}

    DummyBroker.publish("moo/bar", "moobar")
    assert_receive {:publish, %{topic: "ack/client_2"}}

    DummyBroker.publish("moo/baz", "moobaz")
    assert_receive {:publish, %{topic: "ack/client_2"}}
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
        DummyBroker.publish("ack/#{client_id}", "some payload")
        loop(client_id)
    end
  end
end
