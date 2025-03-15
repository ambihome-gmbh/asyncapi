cd priv/schema
asyncapi bundle user.json common.json testcases.json -o bundled/user_schema.json  
asyncapi bundle service.json common.json -o bundled/service_schema.json

asyncapi validate bundled/user_schema.json
asyncapi validate bundled/service_schema.json

asyncapi pretty bundled/user_schema.json
asyncapi pretty bundled/service_schema.json