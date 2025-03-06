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
- [ ] Structs benutzen in Asyncapi und examples
- [ ] examples in eigene projects
- [x] @BM kann man auf UserDummy module verzichten -> ja
- [x] erste ID `0` (implementation detail) muss in schema auftauchen? 
- [ ] Logging
- [ ] handle nil in sequence parser (needed in "pop from empty")



## Notes


## References

- https://www.asyncapi.com 
  - asyncpi CLI for bundling, conversion and validation
  - https://studio.asyncapi.com/
- https://json-schema.org/
- https://github.com/jonasschmidt/ex_json_schema