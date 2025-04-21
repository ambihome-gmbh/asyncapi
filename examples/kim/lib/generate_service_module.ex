defmodule GenerateServiceModule do
  def generate() do
    schema = KimSchema.get_asyncapi()

    dbg(Map.keys(schema))

    # {op_name, Map.drop(op, [:payload_schema])} #=> {"functionpoint-req",
    #  %{
    #    id: "functionpoint-req",
    #    address: "functionpoint/req/{instance_id}",
    #    action: "receive",
    #    parameter_schemas: %{"instance_id" => %{"type" => "string"}},
    #    payload_module_name: KimSchema.MessagePayload.Empty,
    #    regex: ~r/^functionpoint\/req\/(?<instance_id>[a-zA-Z0-9_-]+)$/
    #  }}

    # [lib/generate_service_module.ex:6: GenerateServiceModule.generate/0]
    # {op_name, Map.drop(op, [:payload_schema])} #=> {"functionpoint-resp",
    #  %{
    #    id: "functionpoint-resp",
    #    address: "functionpoint/resp/{instance_id}",
    #    action: "send",
    #    parameter_schemas: %{"instance_id" => %{"type" => "string"}},
    #    payload_module_name: KimSchema.MessagePayload.FunctionpointInstance,
    #    regex: ~r/^functionpoint\/resp\/(?<instance_id>[a-zA-Z0-9_-]+)$/
    #  }}

    operations =
      for {op_name, op} <- schema.operations, op.action == "receive" do
        {op_name, Map.keys(op.parameter_schemas)}
      end

    rendered =
      EEx.eval_file("lib/template.eex", name: "TEST", operations: operations)

    File.write!("generated.ex", rendered)
  end
end
