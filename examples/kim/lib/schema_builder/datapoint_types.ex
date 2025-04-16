defmodule SchemaBuilder.DatapointTypes do
  import Enum

  def schema(kimdpts) do
    dpts = Dpts.Source.dpts()

    number_urn_mapping =
      for dpt <- kimdpts, dpt["DPT Minor"] != nil, into: %{} do
        major = String.to_integer(dpt["DPT Major"])
        minor = String.to_integer(dpt["DPT Minor"])

        {{major, minor}, dpt["urn"]}
      end

    parts =
      for dpt <- dpts, dpst <- dpt.subtypes, part <- dpst.format.parts do
        case part do
          %Dpts.Format.RefType{} -> nil
          %Dpts.Format.Reserved{} -> nil
          part -> parse_part(part, dpt, dpst)
        end
      end
      |> reject(&is_nil/1)

    defs = parts |> sort_by(& &1.sort_key) |> map(&{&1.id, &1.schema})
    part_names = Map.new(parts, &{&1.id, &1.name})

    dpts =
      for dpt <- dpts, dpst <- dpt.subtypes do
        part_ref_ids =
          for part <- dpst.format.parts do
            case part do
              %Dpts.Format.Reserved{} -> nil
              %Dpts.Format.RefType{} -> part.ref_id
              part -> part.id
            end
          end
          |> reject(&is_nil/1)

        schema =
          case part_ref_ids do
            [part_ref_id] ->
              defs_ref(part_ref_id)

            [_ | _] ->
              properties = map(part_ref_ids, &{part_names[&1], defs_ref(&1)})
              required = map(part_ref_ids, &part_names[&1])

              %{
                type: "object",
                required: required,
                properties: %Jason.OrderedObject{values: properties},
                additionalProperties: false
              }
          end

        dpt_urn = Map.get(number_urn_mapping, {dpt.number, dpst.number}, dpst.id)

        {dpt_urn, schema}
      end

    schema_uri = [{"$schema", "https://json-schema.org/draft/2020-12/schema"}]
    # TODO ID
    defs = [{"$defs", %Jason.OrderedObject{values: defs}}]

    %Jason.OrderedObject{values: schema_uri ++ dpts ++ defs}
  end

  defp integer_part(part) do
    %{
      "type" => "integer",
      "minimum" => part.min_inclusive,
      "maximum" => part.max_inclusive
    }
  end

  defp normalize_string(string) do
    string
    |> String.trim()
    |> :unicode.characters_to_nfd_binary()
    # remove all diacriticals
    |> String.replace(~r/\p{M}/u, "")
    # replace everything else with an underscore
    |> String.replace(~r/[^a-zA-Z0-9]/, "_")
    |> String.downcase()
  end

  defp normalize_list(list) do
    # TODO there seem to be some errors in knx_master / duplicate empty enum strings
    list = list |> reject(&(&1 == "")) |> uniq
    normalized = list |> map(&normalize_string/1) |> uniq

    if length(list) != length(normalized) do
      raise("norm-error: #{inspect(list)} - #{inspect(normalized)}")
    end

    normalized
  end

  defp parse_part(part, dpt, dpst) do
    schema =
      case part do
        %Dpts.Format.Bit{} ->
          %{"type" => "string", "enum" => normalize_list([part.cleared, part.set])}

        %Dpts.Format.Float{} ->
          %{
            "type" => "number",
            "minimum" => part.min_value,
            "maximum" => part.max_value
          }

        %Dpts.Format.UnsignedInteger{} ->
          integer_part(part)

        %Dpts.Format.SignedInteger{} ->
          integer_part(part)

        %Dpts.Format.Enumeration{} ->
          enum = part.mapping |> Map.values() |> normalize_list

          %{
            "type" => "string",
            "enum" => enum
          }

        %Dpts.Format.String{} ->
          length = if part.variable_length, do: nil, else: round(part.width / 8)

          %{
            "type" => "string",
            "minLength" => 1,
            "maxLength" => length,
            "x-null-terminated" => part.null_terminated,
            "x-variable-length" => part.variable_length,
            # TODO https://www.learnjsonschema.com/2020-12/content/contentencoding/
            "x-encoding" => part.encoding
          }

        _ ->
          raise("Unsupported part type: #{inspect(part)}")
      end

    [_, part_index] = String.split(part.id, "_F-")

    %{
      id: part.id,
      name: normalize_string(part.name),
      sort_key: {dpt.number, dpst.number, String.to_integer(part_index)},
      schema: schema |> reject(fn {_, v} -> is_nil(v) end) |> Map.new()
    }
  end

  defp defs_ref(ref_id) do
    %{
      "$ref" => "#/$defs/#{ref_id}"
    }
  end
end
