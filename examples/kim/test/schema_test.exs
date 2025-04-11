defmodule AsyncApiTest do
  use ExUnit.Case

  # alias Asyncapi.Message
  # alias KimSchema.MessagePayload, as: P

  setup do
    [asyncapi: KimSchema.get_asyncapi()]
  end

  test "subscriptions", %{asyncapi: asyncapi} do
    assert [
             "datapoint/req/+",
             "datapoint-write/req/+",
             "datapoints/req/all",
             "functions/req/+",
             "functions/req/all",
             "location/req/+",
             "locations/req/all"
           ] == asyncapi.subscriptions
  end
end
