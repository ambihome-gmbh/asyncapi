cd priv/schema
asyncapi bundle user.json common.json -o bundled/user.json  
asyncapi bundle service.json common.json -o bundled/service.json

asyncapi validate bundled/user.json
asyncapi validate bundled/service.json

asyncapi pretty bundled/user.json
asyncapi pretty bundled/service.json