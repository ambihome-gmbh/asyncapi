cd priv/schema
asyncapi bundle user.json common.json -o bundled/user_schema.json  
asyncapi bundle service.json common.json -o bundled/service_schema.json

asyncapi validate bundled/user_schema.json
asyncapi validate bundled/service_schema.json