cd priv/schema

asyncapi bundle common.json testuser.json testcases.json -o bundled/cemi-testuser.json  
asyncapi bundle common.json service.json -o bundled/cemi-service.json  

asyncapi validate bundled/cemi-testuser.json
asyncapi validate bundled/cemi-service.json

asyncapi pretty bundled/cemi-testuser.json
asyncapi pretty bundled/cemi-service.json


