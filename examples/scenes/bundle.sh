cd priv/schema

asyncapi bundle common.json scenes_common.json datapoints_common.json test_user.json -o bundled/test_user.json  
asyncapi bundle common.json datapoints_common.json datapoints_service.json -o bundled/datapoints_service.json  
asyncapi bundle common.json scenes_common.json datapoints_common.json scenes_service.json -o bundled/scenes_service.json  

asyncapi validate bundled/test_user.json
asyncapi validate bundled/scenes_service.json
asyncapi validate bundled/datapoints_service.json

asyncapi pretty bundled/test_user.json
asyncapi pretty bundled/scenes_service.json
asyncapi pretty bundled/datapoints_service.json