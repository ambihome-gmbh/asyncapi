defmodule Asyncapi.TestHelper do
  use ExUnit.Case
  import Enum

  defmacro generate_tests(service, schema_module, broker) do
    asyncapi = Macro.expand(schema_module, __CALLER__).get_asyncapi()
    testcases = Map.fetch!(asyncapi.schema.schema, "x-testcases")

    quote unquote: false,
          bind_quoted: [
            service: service,
            broker: broker,
            asyncapi: Macro.escape(asyncapi),
            testcases: Macro.escape(testcases)
          ] do
      setup do
        asyncapi = unquote(Macro.escape(asyncapi))
        {:ok, broker_state} = unquote(broker).connect(asyncapi)
        {:ok, service_pid} = start_supervised(unquote(service))
        {:ok, state: %{asyncapi: asyncapi, broker: broker_state}, service_pid: service_pid}
      end

      for testcase <- testcases do
        parsed_sequence = Enum.map(testcase["sequence"], &Asyncapi.Parser.parse_step/1)

        IO.puts(Enum.join(testcase["sequence"], "\n"))

        test testcase["name"], context do
          IO.puts("\n")
          sequence = unquote(Macro.escape(parsed_sequence))

          Enum.reduce(sequence, %{bindings: %{}, last_call_tag: nil}, fn step, acc ->
            # Asyncapi.TestHelper.display_step(step)

            # TODO bind first, in doc order. right now binds are done with matches below so cant deref a thing thats bound in the same step
            payload = Asyncapi.TestHelper.deref(step.payload, acc.bindings)
            params = Asyncapi.TestHelper.deref(step.params, acc.bindings)

            case step do
              %{from: "internal", to: "service", arrow: arrow} ->
                Asyncapi.TestHelper.check_for_unexpected_messages()
                assert step.params == %{}, "params not allowed for intenal messages"

                internal_message_tag = String.to_atom(step.operation)

                internal_message =
                  if payload == %{},
                    do: internal_message_tag,
                    else: {internal_message_tag, payload}

                if arrow == :async do
                  send(context.service_pid, internal_message)
                else
                  GenServer.reply({context.service_pid, acc.last_call_tag}, internal_message)
                end

                %{acc | last_call_tag: nil}

              %{from: "service", to: "internal", arrow: arrow} ->
                assert step.params == %{}, "params not allowed for intenal messages"

                {internal_message, call_tag} =
                  if arrow == :async do
                    assert_receive({:"$gen_cast", internal_message})
                    {internal_message, nil}
                  else
                    service_pid = context.service_pid
                    assert_receive({:"$gen_call", {^service_pid, tag}, internal_message})
                    {internal_message, tag}
                  end

                {internal_message_tag, internal_message_payload} =
                  case internal_message do
                    {operation, payload} -> {operation, payload}
                    operation -> {operation, %{}}
                  end

                assert step.operation == "#{internal_message_tag}"

                acc
                |> Map.put(:last_call_tag, call_tag)
                |> Asyncapi.TestHelper.match(internal_message_payload, payload)

              %{to: "service", arrow: :async} ->
                Asyncapi.TestHelper.check_for_unexpected_messages()

                assert Asyncapi.TestHelper.all_deref?(payload),
                       "Payload not fully dereferenced: #{inspect(payload)}"

                assert Asyncapi.TestHelper.all_deref?(params),
                       "Params not fully dereferenced: #{inspect(params)}"

                MqttAsyncapi.sendp(step.operation, payload, params, context.state)

                acc

              %{from: "service", arrow: :async} ->
                assert_receive({:publish, mqtt_message})

                assert {:ok, asyncapi_message} =
                         Asyncapi.Message.from_mqtt_message(
                           Asyncapi.Message.decode_mqtt_message(mqtt_message),
                           context.state.asyncapi
                         )

                assert step.operation == asyncapi_message.op_id

                acc
                |> Asyncapi.TestHelper.match(asyncapi_message.params, params)
                |> Asyncapi.TestHelper.match(asyncapi_message.payload, payload)

              _ ->
                raise("Unsupported step: #{inspect(step)} -- sync when only async supported??")
            end
          end)

          Process.sleep(10)
          # :erlang.process_info(self(), :messages) |> dbg
        end
      end
    end
  end

  @compile {:no_warn_undefined, ExUnit.Assertions}

  def check_for_unexpected_messages() do
    case :erlang.process_info(self(), :messages) do
      {:messages, []} -> nil
      {:messages, messages} -> dbg({:unexpected_messages_todo, messages})
    end
  end

  def display_step(step) do
    # TODO resolve the tuples in payload and params
    # payload: %{
    #   id: {:literal, "x"},
    #   name: {:literal, "S1"},
    #   member_channels: {:list, [literal: "ch1", literal: "ch2"]}
    # },
    # params = Enum.map_join(step.params, ",", fn {k, v} -> "#{k}: #{v}" end)

    IO.puts(
      "#{step.from}->#{step.to}: #{step.operation}[#{inspect(step.params)}]/#{inspect(step.payload)}"
    )
  end

  def all_deref?(map_) do
    Enum.all?(
      map_,
      fn
        {_, {_, _}} -> false
        {_, _} -> true
      end
    )
  end

  @doc false
  def match(acc, received, step) do
    bindings = acc.bindings

    new_bindings =
      reduce(step, bindings, fn {k, v}, acc ->
        case v do
          {:binding, binding_name} ->
            ExUnit.Assertions.assert(
              Map.has_key?(received, k),
              "Binding not found: #{inspect(k)} in #{inspect(received)} --> #{inspect(binding_name)}"
            )

            Map.put(acc, binding_name, Map.fetch!(received, k))

          _ ->
            ExUnit.Assertions.assert(v == Map.fetch!(received, k))

            acc
        end
      end)

    %{acc | bindings: new_bindings}
  end

  @doc false

  def deref({:literal, value}, _bindings) do
    value
  end

  def deref(map_, bindings) do
    Map.new(map_, fn {key, {type, value}} ->
      case type do
        :reference -> {key, Map.fetch!(bindings, value)}
        :binding -> {key, {type, value}}
        :list -> {key, map(value, fn {:literal, v} -> v end)}
        _ -> {key, value}
      end
    end)
  end

  case Application.compile_env(:asyncapi, :broker) do
    nil ->
      raise("env(:asyncapi, :broker) not configured")

    Asyncapi.Broker.Dummy ->
      def start_broker, do: start_supervised!(DummyBroker)

    Asyncapi.Broker.MQTT ->
      # NOTE: ensure broker is running!
      def start_broker, do: nil
  end
end

defmodule DummyBroker do
  import Enum

  def child_spec(init_arg) do
    %{
      id: __MODULE__,
      start: {__MODULE__, :start_link, [init_arg]}
    }
  end

  def start_link() do
    Registry.start_link(keys: :duplicate, name: DummyBroker.Registry)
  end

  def start_link(_) do
    start_link()
  end

  def subscribe(topic) do
    Registry.register(DummyBroker.Registry, topic_to_tuple(topic), nil)
  end

  def publish(topic, payload) do
    recipients = Registry.select(DummyBroker.Registry, build_match_spec(topic))

    recipients
    |> uniq
    |> each(&send(&1, {:publish, %{topic: topic, payload: payload}}))
  end

  @pid_var_id 1
  defp build_match_spec(topic) do
    topic_segments = String.split(topic, "/")
    arity = length(topic_segments)

    head =
      {
        (@pid_var_id + 1)..(arity + @pid_var_id) |> map(&var/1) |> List.to_tuple(),
        var(@pid_var_id),
        :_
      }

    guards =
      for {seg, i} <- with_index(topic_segments, @pid_var_id + 1) do
        {:orelse, {:==, var(i), seg}, {:==, var(i), :any}}
      end

    [{head, guards, [var(@pid_var_id)]}]
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
