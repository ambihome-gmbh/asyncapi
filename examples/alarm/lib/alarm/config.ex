defmodule Alarm.Config do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key false
  embedded_schema do
    field(:monitored, {:array, :string}, default: [])
    field(:mails, {:array, :string}, default: [])
    field(:timeout, :integer, default: 30)
    field(:actions, {:array, :string}, default: ["SEND_MAILS"])
  end

  defp changeset(config, attrs) do
    config
    |> cast(attrs, [:monitored, :mails, :timeout, :actions])
  end

  def from_payload(payload) do
    cs = changeset(%__MODULE__{}, payload)

    if cs.valid? do
      cs
      |> apply_changes()
      |> Map.from_struct()
    else
      raise "invalid config: #{inspect(cs.errors)}"
    end
  end
end
