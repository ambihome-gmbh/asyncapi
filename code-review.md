# Production Code Review — `asyncapi`

Consolidated from three independent reviews plus fresh source analysis.

---

## 🚨 Critical — Will Break in Production

### 1. done -- `ex_json_schema` marked `runtime: false`

[mix.exs:27](file:///Users/sf/ws/asyncapi/mix.exs#L27)

```elixir
{:ex_json_schema, "~> 0.10.2", runtime: false}
```

`ExJsonSchema.Validator.validate_fragment/3` is called at **runtime** for every incoming and outgoing message (`validate_payload/3`, `validate_parameter/4`). With `runtime: false`, a production release (`mix release`) will omit the dependency entirely → instant `UndefinedFunctionError` crash on the first MQTT message.

**Fix:** Remove `runtime: false`.

---

### 2. No MQTT Reconnection Logic

[mqtt_asyncapi.ex:141-143](file:///Users/sf/ws/asyncapi/lib/mqtt_asyncapi.ex#L141-L143)

```elixir
def handle_info({:disconnected, :shutdown, :ssl_closed}, state) do
  Logger.warning("[#{inspect(state.user_module)}] disconnected: ssl_closed")
  {:noreply, state}
end
```

When the broker connection drops, the GenServer logs a warning but **stays alive disconnected**. It will never receive messages again and all publishes will fail silently. Network blips are guaranteed in production.

**Fix:** Either crash the GenServer (let supervisor restart it), or implement a reconnect with exponential backoff via `Process.send_after`.

*See also TODOS.md [1754]*

---

### 3. done -- Malformed JSON Crashes the GenServer

[message.ex:65-67](file:///Users/sf/ws/asyncapi/lib/asyncapi/message.ex#L65-L67)

```elixir
def decode_mqtt_message(mqtt_message) do
  %{mqtt_message | payload: Jason.decode!(mqtt_message.payload)}
end
```

Any malformed JSON on a subscribed topic crashes the GenServer via `Jason.decode!`. If the message is retained, this becomes a crash loop on every restart → **denial of service**.

**Fix:** Use `Jason.decode/1`, return `{:error, :invalid_json}`, log and discard.

---

### 4. done -- `dbg/1` Left in Production Code

[mqtt_asyncapi.ex:134](file:///Users/sf/ws/asyncapi/lib/mqtt_asyncapi.ex#L134)

```elixir
dbg({:error, reason})
```

`dbg/1` prints debug output to stdout in production. Also present in [test_helper.ex:291](file:///Users/sf/ws/asyncapi/lib/asyncapi/test_helper.ex#L291) (less critical since it's a test helper, but the file ships in production — see §9).

**Fix:** Replace with `Logger.warning("message validation failed: #{inspect(reason)}")`.

*See also TODOS.md [1702]*

---

## ⚠️ High — Architecture & Reliability

### 5. later -- Compile-Time Broker Configuration

[mqtt_asyncapi.ex:17](file:///Users/sf/ws/asyncapi/lib/mqtt_asyncapi.ex#L17)

```elixir
@broker Application.compile_env(:asyncapi, :broker)
```

The broker module is baked in at compile time. If a host app uses this as a dependency the broker choice depends on compile-time config ordering — fragile in umbrellas and CI. Also prevents concurrent tests with different brokers.

**Fix:** Runtime config via `Application.get_env(:asyncapi, :broker, Asyncapi.Broker.MQTT)` in `init/1`, or pass broker in `start_link` opts.

---

### 6. done -- Broker Behaviour Doesn't Match Implementations

[broker.ex](file:///Users/sf/ws/asyncapi/lib/asyncapi/broker.ex)

```elixir
@callback connect(asyncapi) :: {:ok, state}
@callback publish(state, Asyncapi.Message.t()) :: :ok
```

| | `connect` | `publish` |
|---|---|---|
| **Behaviour** | 1 arg | `Message.t()` |
| **MQTT impl** | 2 args (`asyncapi, user_module`) | raw map `%{topic, payload, qos}` |
| **Dummy impl** | 2 args (`asyncapi, _name`) | raw map |

The behaviour provides **zero compile-time safety**. Dialyzer won't catch mismatches.

**Fix:** Update behaviour to `connect(asyncapi, module()) :: {:ok, state}` and `publish(state, map()) :: :ok | {:error, term()}`.

---

### 7. done -- Silent Failures on MQTT Publish

[broker/mqtt.ex:23-26](file:///Users/sf/ws/asyncapi/lib/asyncapi/broker/mqtt.ex#L23-L26)

```elixir
def publish(broker_state, mqtt_message) do
  :emqtt.publish(broker_state.pid, mqtt_message.topic, mqtt_message.payload, mqtt_message.qos)
  :ok
end
```

The return value of `:emqtt.publish/4` is discarded. For QoS 1/2, failures (e.g. dead connection) are silently swallowed.

**Fix:** Return the actual result: `:ok | {:error, reason}`.

---

### 8. No Supervisor / Application Module

asyncapi is a library, not an application. It does not need a supervisor or an application module.
that is handle by the using application.
We have to tackle that together with TODO: how can we make the application start with tests (right now test avoid starting app)

---

## 🛠 Medium — Performance & Code Quality

### 9. done -- JSON Round-Trip Hack for Atom Keys

[message.ex:39-40](file:///Users/sf/ws/asyncapi/lib/asyncapi/message.ex#L39-L40), [asyncapi.ex:61](file:///Users/sf/ws/asyncapi/lib/asyncapi.ex#L61)

```elixir
# HACK - so that I can send atom keys and values!
params = params |> Jason.encode!() |> Jason.decode!()
payload = payload |> Jason.encode!() |> Jason.decode!()
```

Full JSON serialization round-trip on **every message** just to coerce atom keys to strings. Expensive and fragile (drops non-JSON-serializable values).

**Fix:** Write a simple recursive `stringify_keys/1`:

```elixir
def stringify_keys(%{} = map) do
  Map.new(map, fn
    {k, v} when is_atom(k) -> {Atom.to_string(k), stringify_keys(v)}
    {k, v} -> {k, stringify_keys(v)}
  end)
end
def stringify_keys(list) when is_list(list), do: Enum.map(list, &stringify_keys/1)
def stringify_keys(v) when is_atom(v), do: Atom.to_string(v)
def stringify_keys(v), do: v
```

*See also TODOS.md [1698]*

---

### 10. done -- `import Enum` Pollutes Namespace

In [asyncapi.ex](file:///Users/sf/ws/asyncapi/lib/asyncapi.ex#L2), [message.ex](file:///Users/sf/ws/asyncapi/lib/asyncapi/message.ex#L2), [mqtt_asyncapi.ex](file:///Users/sf/ws/asyncapi/lib/mqtt_asyncapi.ex#L2), [test_helper.ex](file:///Users/sf/ws/asyncapi/lib/asyncapi/test_helper.ex#L4):

```elixir
import Enum
```

Imports 100+ functions. Makes code harder to read (`filter(...)` vs `Enum.filter(...)`), can shadow local functions. This is an Elixir anti-pattern flagged by `mix credo`.

**Fix:** Use `Enum.` prefix explicitly.

---

### 11. `raise` Used for Flow Control

Multiple places use `raise/1` where `{:error, reason}` would be idiomatic:

- [asyncapi.ex:90](file:///Users/sf/ws/asyncapi/lib/asyncapi.ex#L90): `raise("need a server/production")`
- [asyncapi.ex:93](file:///Users/sf/ws/asyncapi/lib/asyncapi.ex#L93): `"mqtt" = server["protocol"]` — pattern match crash
- [asyncapi.ex:109](file:///Users/sf/ws/asyncapi/lib/asyncapi.ex#L109): `raise("channel must have messages")`
- [mqtt_asyncapi.ex:185](file:///Users/sf/ws/asyncapi/lib/mqtt_asyncapi.ex#L185): `raise(inspect(error))` — `inspect` as error message

The raises in `load/2` are acceptable since loading happens at compile time. The runtime raises in `publish!` are concerning.

---

### 12. `Process.sleep` in Tests

[test_helper.ex:201](file:///Users/sf/ws/asyncapi/lib/asyncapi/test_helper.ex#L201), [test_helper.ex:315,320](file:///Users/sf/ws/asyncapi/lib/asyncapi/test_helper.ex#L315-L320):

```elixir
Process.sleep(25)
```

Fixed sleeps cause flaky tests (too short on slow CI, too long elsewhere). Use `assert_receive` with timeouts or message-based synchronization.

---

## 🧹 Low — Tidiness

### 13. `DummyBroker` and `Formatter` Ship in Production

[test_helper.ex:397-493](file:///Users/sf/ws/asyncapi/lib/asyncapi/test_helper.ex#L397-L493)

`DummyBroker` and `Asyncapi.TestHelper.Formatter` are defined in `lib/asyncapi/test_helper.ex`. Since `lib/` is always compiled, these modules are included in production releases.

**Fix:** Move to `test/helpers/` (already on `elixirc_paths` for `:test`).

---

### 14. Unused `nimble_csv` Dependency

[mix.exs:28](file:///Users/sf/ws/asyncapi/mix.exs#L28): `{:nimble_csv, "~> 0.1"}` — not used anywhere in the codebase.

**Fix:** Remove it.

---

### 15. No `@moduledoc` / `@doc` on Any Module

No module in the library has documentation. For a production library, at minimum document: `Asyncapi`, `MqttAsyncapi`, `Asyncapi.Message`, `Asyncapi.Schema`, `Asyncapi.Helpers`.

---

### 16. `Asyncapi.Message.t()` Typespec Too Loose

```elixir
@type t :: %__MODULE__{}
```

Tells Dialyzer nothing. Should be:

```elixir
@type t :: %__MODULE__{
  op_id: String.t() | nil,
  params: map(),
  payload: map(),
  retain: boolean(),
  qos: 0 | 1 | 2
}
```

---

### 17. `Asyncapi.Helpers.reply([], state)` Silently Becomes `{:noreply, ...}`

[helpers.ex:19](file:///Users/sf/ws/asyncapi/lib/asyncapi/helpers.ex#L19)

```elixir
def reply([], state), do: {:noreply, state}
```

The commented-out `raise` alternative and the German comment on L17 confirm this has already caused confusion. Decide and document one way or the other.

---

### 18. Scattered TODOs

| File | Count | Topics |
|---|---|---|
| `test_helper.ex` | 5 | module extraction, bind ordering, display step |
| `asyncapi.ex` | 1 | meta-schema validation |
| `broker/mqtt.ex` | 1 | ensure broker is running |
| `README.md` | 5+ | documentation |
| `helpers.ex` | 1 | empty list semantics |

Each should be triaged: fix, file as issue, or explicitly accept.

---

### 19. Config Only Defines `:test` Broker

[config/config.exs:8-11](file:///Users/sf/ws/asyncapi/config/config.exs#L8-L11)

```elixir
case config_env() do
  :test -> config :asyncapi, broker: Asyncapi.Broker.Dummy
  _ -> nil
end
```

No broker is configured for `:dev` or `:prod`. The host app must always provide this. Should be documented or default to `Asyncapi.Broker.MQTT`.

---

## Summary

| Priority | # | Item | Effort |
|---|---|---|---|
| 🚨 Critical | 1 | Remove `runtime: false` on `ex_json_schema` | 1 min |
| 🚨 Critical | 2 | Add reconnection / crash on disconnect | 2-4 hrs |
| 🚨 Critical | 3 | Handle malformed JSON gracefully | 15 min |
| 🚨 Critical | 4 | Remove `dbg` calls | 2 min |
| ⚠️ High | 5 | Runtime broker config instead of compile-time | 30 min |
| ⚠️ High | 6 | Fix broker behaviour to match implementations | 15 min |
| ⚠️ High | 7 | Don't swallow publish errors | 10 min |
| ⚠️ High | 8 | Document supervision requirements | 15 min |
| 🛠 Medium | 9 | Replace JSON round-trip with `stringify_keys` | 30 min |
| 🛠 Medium | 10 | Replace `import Enum` with explicit calls | 20 min |
| 🛠 Medium | 11 | Return `{:error, reason}` instead of `raise` | 30 min |
| 🛠 Medium | 12 | Remove `Process.sleep` from tests | 30 min |
| 🧹 Low | 13 | Move `DummyBroker`/`Formatter` to `test/` | 15 min |
| 🧹 Low | 14 | Remove unused `nimble_csv` dep | 1 min |
| 🧹 Low | 15 | Add `@moduledoc` / `@doc` | 1 hr |
| 🧹 Low | 16 | Improve `Message.t()` typespec | 5 min |
| 🧹 Low | 17 | Decide on `reply([], state)` semantics | 10 min |
| 🧹 Low | 18 | Triage all TODOs | 30 min |
| 🧹 Low | 19 | Document/default broker config for non-test envs | 10 min |
