# Production Code Review — `asyncapi`

Consolidated from three independent reviews plus fresh source analysis.

---

## 🚨 Critical — Will Break in Production

### 2. No MQTT Reconnection Logic

[mqtt_asyncapi.ex:136-138](file:///Users/sf/ws/asyncapi/lib/mqtt_asyncapi.ex#L136-L138)

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

## ⚠️ High — Architecture & Reliability

### 5. Compile-Time Broker Configuration

NOTE: We have to tackle that together with TODO [1701]: how can we make the application start with tests (right now test avoid starting app)

[mqtt_asyncapi.ex:17](file:///Users/sf/ws/asyncapi/lib/mqtt_asyncapi.ex#L17)

```elixir
@broker Application.compile_env(:asyncapi, :broker)
```

The broker module is baked in at compile time. If a host app uses this as a dependency the broker choice depends on compile-time config ordering — fragile in umbrellas and CI. Also prevents concurrent tests with different brokers.

**Fix:** Runtime config via `Application.get_env(:asyncapi, :broker, Asyncapi.Broker.MQTT)` in `init/1`, or pass broker in `start_link` opts.

---

### 8. No Supervisor / Application Module

asyncapi is a library, not an application. It does not need a supervisor or an application module.
that is handled by the using application.

NOTE: We have to tackle that together with TODO [1701]: how can we make the application start with tests (right now test avoid starting app)

---

## 🛠 Medium — Performance & Code Quality

### 11. `raise` Used for Flow Control

Multiple places use `raise/1` where `{:error, reason}` would be idiomatic:

- [asyncapi.ex:87](file:///Users/sf/ws/asyncapi/lib/asyncapi.ex#L87): `raise("need a server/production")`
- [asyncapi.ex:90](file:///Users/sf/ws/asyncapi/lib/asyncapi.ex#L90): `"mqtt" = server["protocol"]` — pattern match crash
- [asyncapi.ex:106](file:///Users/sf/ws/asyncapi/lib/asyncapi.ex#L106): `raise("channel must have messages")`

The raises in `load/2` are acceptable since loading happens at compile time via `Asyncapi.Schema`. The runtime `publish!` raise was removed with item 7.

---

### 12. `Process.sleep` in Tests

[test_helper.ex:201](file:///Users/sf/ws/asyncapi/lib/asyncapi/test_helper.ex#L201), [test_helper.ex:315,320](file:///Users/sf/ws/asyncapi/lib/asyncapi/test_helper.ex#L315-L320):

```elixir
Process.sleep(25)
```

Fixed sleeps cause flaky tests (too short on slow CI, too long elsewhere). Use `assert_receive` with timeouts or message-based synchronization.

---

## 🧹 Low — Tidiness

### 15. No `@moduledoc` / `@doc` on Any Module

No module in the library has documentation. For a production library, at minimum document: `Asyncapi`, `MqttAsyncapi`, `Asyncapi.Message`, `Asyncapi.Schema`, `Asyncapi.Helpers`.

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

## ⏳ Later — See TODOS.md

### 17. `Asyncapi.Helpers.reply([], state)` Silently Becomes `{:noreply, ...}`

Breaking change for existing services. Deferred — see TODOS.md.

---

## Summary

| Priority | # | Item | Status |
|---|---|---|---|
| 🚨 Critical | 1 | Remove `runtime: false` on `ex_json_schema` | ✅ done |
| 🚨 Critical | 2 | Add reconnection / crash on disconnect | **open** |
| 🚨 Critical | 3 | Handle malformed JSON gracefully | ✅ done |
| 🚨 Critical | 4 | Remove `dbg` calls | ✅ done |
| ⚠️ High | 5 | Runtime broker config instead of compile-time | **open** — linked to TODO [1701] |
| ⚠️ High | 6 | Fix broker behaviour to match implementations | ✅ done |
| ⚠️ High | 7 | Don't swallow publish errors | ✅ done |
| ⚠️ High | 8 | Document supervision requirements | **open** — linked to TODO [1701] |
| 🛠 Medium | 9 | Replace JSON round-trip with `stringify_keys` | ✅ done |
| 🛠 Medium | 10 | Replace `import Enum` with explicit calls | ✅ done |
| 🛠 Medium | 11 | Return `{:error, reason}` instead of `raise` | **open** — compile-time raises acceptable |
| 🛠 Medium | 12 | Remove `Process.sleep` from tests | **open** |
| 🧹 Low | 13 | Move `DummyBroker`/`Formatter` out of `test_helper.ex` | ✅ done |
| 🧹 Low | 14 | Remove unused `nimble_csv` dep | ✅ done |
| 🧹 Low | 15 | Add `@moduledoc` / `@doc` | **open** |
| 🧹 Low | 16 | Improve `Message.t()` typespec | ✅ done |
| 🧹 Low | 17 | Decide on `reply([], state)` semantics | **later** — see TODOS.md |
| 🧹 Low | 18 | Triage all TODOs | **open** |
| 🧹 Low | 19 | Document/default broker config for non-test envs | **open** |

**10 of 19 items resolved.** Remaining: 2 critical, 4 medium, 3 low.

---

## ✅ Done

### 1. `ex_json_schema` marked `runtime: false`

Removed `runtime: false` from `ex_json_schema` dependency in `mix.exs`. Without this fix, `mix release` would omit the dependency, causing `UndefinedFunctionError` on the first MQTT message.

---

### 3. Malformed JSON Crashes the GenServer

Changed `decode_mqtt_message` to return `{:ok, decoded}` / `{:error, :json_decode_error, reason}` instead of crashing via `Jason.decode!`. The `handle_info` in `mqtt_asyncapi.ex` now uses a `with` chain to gracefully handle both JSON decode errors and message validation errors, logging and discarding invalid messages.

---

### 4. `dbg/1` Left in Production Code

The `dbg({:error, reason})` in `mqtt_asyncapi.ex` was removed as part of the item 3 fix (replaced by `Logger.warning` in the `with` error handler). The `dbg` in `test_helper.ex:293` remains (acceptable — only fires during test assertion failures).

---

### 6. Broker Behaviour Doesn't Match Implementations

Updated `Asyncapi.Broker` callbacks to match reality: `connect(asyncapi, module())` and `publish(state, mqtt_message) :: :ok | {:error, term()}`. Removed default arguments from both `MQTT` and `Dummy` implementations. Fixed the single call site in `test_helper.ex`.

---

### 7. Silent Failures on MQTT Publish

`Asyncapi.Broker.MQTT.publish/2` now returns the actual result from `:emqtt.publish`. Removed `publish!` (which raised on error). `publish/2` now logs errors via `Logger.warning` and returns the error tuple — one failed publish no longer crashes the GenServer or blocks other publishes.

---

### 9. JSON Round-Trip Hack for Atom Keys

Replaced the `Jason.encode!() |> Jason.decode!()` hack with `Asyncapi.Helpers.stringify_keys/1` — a recursive function that converts atom keys and atom values to strings while preserving `true`, `false`, and `nil`.

---

### 10. `import Enum` Pollutes Namespace

Removed all 5 `import Enum` statements across `asyncapi.ex`, `mqtt_asyncapi.ex`, `message.ex`, `test_helper.ex`, and `DummyBroker`. All bare calls now use explicit `Enum.` prefix.

---

### 13. `DummyBroker` and `Formatter` Extracted from `test_helper.ex`

`DummyBroker` extracted to its own file `lib/asyncapi/broker/dummy_broker.ex`. `Formatter` moved to `test/helpers/formatter.ex`. `Asyncapi.Broker.Dummy` stays in `lib/` as it's needed by consumers at compile time via `Application.compile_env`.

---

### 14. Unused `nimble_csv` Dependency

Removed `{:nimble_csv, "~> 0.1"}` from `mix.exs`.

---

### 16. `Asyncapi.Message.t()` Typespec Too Loose

Added explicit field types: `op_id: String.t() | nil`, `params: map()`, `payload: map()`, `retain: boolean()`, `qos: 0 | 1 | 2`.
