# Asyncapi

## Test

Run this before the mqtt tests 

```
docker run -d -p 1883:1883 --name nanomq emqx/nanomq:latest
```

(nanomq running in a container named nanomq is expected by the tests.)


## TODO

- [ ] config/remote_schema_resolver has hardcoded path
- [ ] sample services for tests should not be in `lib`
- [ ] make mqtt-client robust
- [ ] create a more involved sample service with state, implementing a stack
- [ ] for the stack-service create tests that use payload examples from the asyncapi-schema as test data, behaviour should match that of `description` in the schema (if there is no better place to put that)