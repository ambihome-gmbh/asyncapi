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
- [ ] for the stack-service create tests that use payload examples from the asyncapi-schema as test data, behaviour should match that of `description` in the schema (if there is no better place to put that)


## References

- https://www.asyncapi.com -- asyncpi CLI for conversion and validation
- https://json-schema.org/
- https://github.com/jonasschmidt/ex_json_schema