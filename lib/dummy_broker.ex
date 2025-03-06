defmodule DummyBroker do
  import Enum

  def publish(published_topic) do
    topic_segments = String.split(published_topic, "/")
    match_spec = build_match_spec(topic_segments)
    recipients = Registry.select(DummyBroker.Registry, match_spec)

    recipients
    |> uniq
    |> each(&send(&1, {:publish, published_topic}))
  end

  def subscribe(topic) do
    Registry.register(DummyBroker.Registry, topic_to_tuple(topic), nil)
  end

  defp build_match_spec(topic_segments) do
    arity = length(topic_segments)
    tuple_of_vars = 1..arity |> map(&var/1) |> List.to_tuple()
    head = {tuple_of_vars, var(99), :_}

    # For each segment, the guard ensures the variable equals the published segment or :any.
    guards =
      for {seg, i} <- with_index(topic_segments, 1) do
        {:orelse, {:==, var(i), seg}, {:==, var(i), :any}}
      end

    [{head, guards, [var(99)]}]
  end

  defp topic_to_tuple(topic) do
    topic
    |> String.split("/")
    |> map(fn
      "+" -> :any
      seg -> seg
    end)
    |> List.to_tuple()
  end

  defp var(i), do: String.to_atom("$#{i}")


end
