defmodule DummyUser do
  def init(_), do: {:ok, %{}}
end

defmodule Helper do
  def get_examples(api) do
    for {_, operation} <- api.operations, example <- operation.examples, into: %{} do
      {
        example["name"],
        %{payload: example["payload"], action: operation.action, op_id: operation.id}
      }
    end
  end
end

defmodule AutoTest do
  use ExUnit.Case

  import AsyncApi
  alias MqttAsyncapi.Message

  def start_broker(), do: {"nanomq\n", 0} = System.cmd("docker", ["start", "nanomq"])
  def stop_broker(), do: System.cmd("docker", ["stop", "nanomq"])

  setup do
    start_broker()
    on_exit(&stop_broker/0)

    {:ok, state} =
      MqttAsyncapi.init(
        user_module: DummyUser,
        asyncapi_schema_path: "test/schema/stack/user_schema.json"
      )

    {:ok, _} = start_supervised({Stack.StackService, []})

    {:ok, state: state}
  end

  @tag :wip
  test "push and pop", context do
    MqttAsyncapi.send("push", %{"value" => 42}, context.state)
    :timer.sleep(100)
    MqttAsyncapi.send("pop", %{}, context.state)
    :timer.sleep(100)

    assert_receive_mqtt_message(
      %MqttAsyncapi.Message{
        operation_id: "pop_response",
        payload: %{"value" => 42}
      },
      context.state.asyncapi
    )
  end

  @tag :wip
  test "pop from empty", context do
    MqttAsyncapi.send("pop", %{}, context.state)
    :timer.sleep(100)

    assert_receive_mqtt_message(
      %MqttAsyncapi.Message{
        operation_id: "pop_response",
        payload: %{"value" => nil}
      },
      context.state.asyncapi
    )
  end

  # asyncapi = load("test/schema/stack/service_schema_manually_merged_todo.json")
  service_api = load("test/schema/stack/service_schema.json")
  user_api = load("test/schema/stack/user_schema.json")
  # dbg(service_api.operations)
  # dbg(user_api.operations)

  testcases =
    Jason.decode!(
      """
      [
        {
          "name": "pop from empty",
          "sequence": [
            "user->service:: pop",
            "service->user:: pop-response: empty"
          ]
        },
        {
          "name": "push and pop",
          "sequence": [
            "user->service:: push: 42",
            "user->service:: pop",
            "service->user:: pop-response: 42"
          ]
        }
      ]
      """,
      keys: :atoms
    )

  examples = %{
    "service" => Helper.get_examples(service_api),
    "user" => Helper.get_examples(user_api)
  }

  # dbg(examples)

  for testcase <- testcases do
    dbg(testcase.name)

    validated_steps =
      for step <- testcase.sequence do
        [from, to, example_name] = String.split(step, ~r/->|::/)
        example_name = String.trim(example_name)

        # dbg({from, to, example_name})

        %{action: "send", payload: payload, op_id: from_op_id} = examples[from][example_name]
        %{action: "receive", payload: ^payload, op_id: to_op_id} = examples[to][example_name]

        cond do
          from == "user" -> {:send, from_op_id, payload}
          to == "user" -> {:receive, to_op_id, payload}
          true -> raise "no \"user\" actor involved in testcase"
        end
      end

    test "POC: " <> testcase.name, context do
      for step <- unquote(Macro.escape(validated_steps)) do
        case step do
          {:send, op_id, payload} ->
            MqttAsyncapi.send(op_id, payload, context.state)

          {:receive, op_id, payload} ->
            assert_receive_mqtt_message(
              %MqttAsyncapi.Message{
                operation_id: op_id,
                payload: payload
              },
              context.state.asyncapi
            )
        end

        Process.sleep(100)
      end
    end

    # ExJSONPath.eval(asyncapi.schema.schema, "$[?(@.v > 1)].v")

    # example_name => {ex, operation_id}

    # send(operation_id, example.payload, asyncapi-perspective)
  end

  def assert_receive_mqtt_message(expected_asyncapi_message, api) do
    assert_receive({:publish, mqtt_message})
    assert {:ok, expected_asyncapi_message} == Message.from_mqtt_message(mqtt_message, api)
  end
end
