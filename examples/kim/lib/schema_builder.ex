defmodule SchemaBuilder do
  import Enum

  @use_application_functions [
    "mac#blinds",
    "mac#dimLight",
    "mac#systemClock",
    "mac#shutter",
    "mac#switchLight"
  ]
  def build do
    kimdpts = "lib/schema_builder/kim/datapoint_types.json" |> File.read!() |> Jason.decode!()
    kimappfuns = "lib/schema_builder/kim/application_functions.json" |> File.read!() |> Jason.decode!()
    kimfunpoints = "lib/schema_builder/kim/function_points.json" |> File.read!() |> Jason.decode!()

    aflookup =
      for appfun <- kimappfuns, into: %{} do
        {appfun["ApplicationFunction"], appfun}
      end

    dpt_urn_mapping = for dpt <- kimdpts, into: %{}, do: {dpt["id"], dpt["urn"]}

    appfuns =
      for appfun <- kimappfuns, appfun["ApplicationFunction"] in @use_application_functions do
        superclasses = appfun["Superclasses"] |> map(&get_all_superclasses(&1, aflookup)) |> List.flatten()
        super_funpoints = superclasses |> map(&aflookup[&1]["FunctionPoints"]) |> List.flatten()
        super_trades = superclasses |> map(&aflookup[&1]["OperatesForTrade"]) |> List.flatten()
        super_qualities = superclasses |> map(&aflookup[&1]["QualityKinds"]) |> List.flatten()

        trade =
          case appfun["OperatesForTrade"] ++ super_trades do
            [] -> nil
            [trade] -> trade
          end

        %{
          id: appfun["ApplicationFunction"],
          function_points: appfun["FunctionPoints"] ++ super_funpoints,
          urn: appfun["Identifier"],
          label: appfun["Label"],
          trade: trade,
          qualities: appfun["QualityKinds"] ++ super_qualities,
          all_superclasses: superclasses
        }
      end
      |> List.flatten()

    used_funpoints = for appfun <- appfuns, funpoint <- appfun.function_points, do: funpoint
    used_kimfunpoints = for funpoint <- kimfunpoints, funpoint["FunctionPoint"] in used_funpoints, do: funpoint

    dbg(used_kimfunpoints)

    used_kimfunpoints
    |> SchemaBuilder.Functionpoint.defs(dpt_urn_mapping)
    |> one_of_schema("functionpoint")
    |> render("priv/schema/generated/functionpoints.json")

    used_kimfunpoints
    |> SchemaBuilder.FunctionpointWrite.defs(dpt_urn_mapping)
    |> one_of_schema("functionpoint_write")
    |> render("priv/schema/generated/functionpoint-writes.json")

    appfuns
    |> SchemaBuilder.ApplicationFunctions.defs()
    |> one_of_schema("application_function")
    |> render("priv/schema/generated/application-functions.json")

    kimdpts
    |> SchemaBuilder.DatapointTypes.schema()
    |> render("priv/schema/generated/datapoint-types.json")
  end

  def one_of_schema(defs, name) do
    %{
      "$schema" => "https://json-schema.org/draft/2020-12/schema",
      name => %{
        "oneOf" => defs |> Map.keys() |> map(&%{"$ref" => "#/$defs/#{&1}"})
      },
      "$defs" => defs
    }
  end

  def render(schema, filename) do
    schema |> Jason.encode!(pretty: true) |> then(fn data -> File.write!(filename, data) end)
  end

  defp get_all_superclasses("core#ApplicationFunction", _), do: []

  defp get_all_superclasses(afid, aflookup) do
    af = Map.fetch!(aflookup, afid)

    if af["Superclasses"] == [] do
      [afid]
    else
      superclasses = af["Superclasses"] |> map(&get_all_superclasses(&1, aflookup)) |> List.flatten()
      [afid | superclasses]
    end
  end
end
