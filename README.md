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

- [x] sample services for tests should not be in `lib` but in `test/support`, see https://til.hashrocket.com/posts/3y6morjjs7-add-elixir-files-to-your-compiled-list 
- [x] make mqtt-client robust
- [x] create a more involved sample service with state, implementing a stack
- [ ] bundle files, so that we can use tools that can not use multiple files, sth like this should do it 
    ```
    # merges but does **not** resolte file-refs!?
    asyncapi bundle service_schema.json common_schema.json --output merged.json

    # evtl hiermit:
    https://github.com/APIDevTools/json-schema-ref-parser
    ```
- [x] understand traits
- [ ] TestAsyncapi via Registry statt broker (Registry.select)
- [x] Payloads -> Structs 
  - [ ] Asyncapi sepratieren von MqttAsyncapi module
- [x] @BM kann man auf UserDummy module verzichten -> ja
- [ ] weniger parameter, insb ambid?
- [x] erste ID `0` (implementation detail) muss in schema auftauchen? 


## Notes

- we can name exmples when using https://www.asyncapi.com/docs/reference/specification/v3.0.0#messageExampleObject


## References

- https://www.asyncapi.com 
  - asyncpi CLI for bundling, conversion and validation
  - https://studio.asyncapi.com/
- https://json-schema.org/
- https://github.com/jonasschmidt/ex_json_schema