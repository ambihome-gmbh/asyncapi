cd priv/schema

asyncapi bundle common.json scenes_common.json datapoints_common.json test_user.json testcases.json -o bundled/user.json  
asyncapi bundle common.json scenes_common.json datapoints_common.json scenes_service.json -o bundled/service.json  
asyncapi bundle common.json datapoints_common.json datapoints_service.json -o bundled/datapoints_service.json  

asyncapi validate bundled/user.json
asyncapi validate bundled/service.json
asyncapi validate bundled/datapoints_service.json

asyncapi pretty bundled/user.json
asyncapi pretty bundled/service.json
asyncapi pretty bundled/datapoints_service.json


