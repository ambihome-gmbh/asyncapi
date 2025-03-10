# Asyncapi

**EXPERIMENTAL**

Receive and send valid asyncapi messages over MQTT.


## howto

...


## Test

Run this before the mqtt tests 

```
docker run -d -p 1883:1883 --name nanomq emqx/nanomq:latest
```

(nanomq running in a container named nanomq is expected by the tests.)


## TODO

- [x] make mqtt-client robust
- [x] create a more involved sample service with state, implementing a stack
- [x] bundle files, so that we can use tools that can not use multiple files, sth like this should do it 
- [x] understand traits
- [x] TestAsyncapi via Registry statt broker (Registry.select)
- [x] Payloads -> Structs 
- [x] Structs benutzen in Asyncapi und examples
- [x] examples in eigene projects
- [x] @BM kann man auf UserDummy module verzichten -> ja
- [x] erste ID `0` (implementation detail) muss in schema auftauchen? 
- [ ] Logging -> TO-DO-2
- [x] handle nil in sequence parser (needed in "pop from empty")
- [ ] jsv lib evaluieren (@BM)
- [ ] https://hexdocs.pm/ex_json_schema/readme.html#validation-error-formats
- [ ] module-generator
  - ? auch fuer parameter?
  - muss recompilen wenn neue APIs in config gibt oder wenn sich diese geaendert haben
  - muss automatisch bundlen
  - ! kann dann nicht in dep sein!
- [ ] handling of invalid messages from outside, cant just raise ->TO-DO-1
- [ ] bessere trennung MqttAsyncAPI, broker impl ->TO-DO-3
- [ ] retained messages
- [ ] generate_tests nicht mit hardcoded pfad aufrufen, env-zugriff nicht in use sondern in __using__ -> TO-DO-4
- [x] internal messages
  - [ ] when an internal message is the last in a sequence, it may not be received before test ends!
- [ ] run tests in all examples also
- [ ] messages -> components for stuff like this
```
 "channels": {
        "dp_write_req": {
            "address": "DP/WRITE_REQ",
            "messages": {
                "dp_write": {
                    "name": "dp_write",
                    "payload": {
                        "$ref": "#/components/schemas/dp_payload"
                    }
                }
            },
            "description": "testing dummy temp"
        },
        "dp_write_ind": {
            "address": "DP/WRITE_IND",
            "messages": {
                "dp_write": {
                    "name": "dp_write",
                    "payload": {
                        "$ref": "#/components/schemas/dp_payload"
                    }
                }
            },
            "description": "testing dummy temp"
        }
    },
```
- [ ] sequence regions that can be reused (eg dp-write, add-scene, ...)
- [ ] `_` match in sequence (
    - [ ] possible at all places, eg:  _->_: _[_]/_ 
    - [ ] or partially: ...[a: _]
- [ ] check if a sequence step is even possible first (`from` has operation)
- [ ] test coverage in examples
- [ ] render api like "asyncapi studio" but with seq diag
- [ ] jump to asyncapi code from example project-IDE code and terminal
- [ ] dopplung runtime/config
  



## Notes

### JSONSchema


- `required` und `default` zusammen auf einer prop sinnlos, da mit struct `@enforce_keys` default in struct egal, muss immer gegeben werden
- `"additionalProperties": true` sinnlos mit struct
- es wird nicht gechecked, ob die parameter die in channel/address genutzt werden auch definiert sind!
- message name muss gesetzt und uniq sein in schema (module)

## References

- https://www.asyncapi.com 
  - asyncpi CLI for bundling, conversion and validation
  - https://studio.asyncapi.com/
- https://json-schema.org/
- https://github.com/jonasschmidt/ex_json_schema