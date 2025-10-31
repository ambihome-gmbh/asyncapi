cd priv/schema
asyncapi bundle user.yaml common.yaml -o bundled/user.json  
asyncapi bundle service.yaml common.yaml -o bundled/service.json

asyncapi validate bundled/user.json
asyncapi validate bundled/service.json

asyncapi pretty bundled/user.json
asyncapi pretty bundled/service.json