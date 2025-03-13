cd priv/schema

asyncapi bundle common.yaml tim_common.yaml datapoints_common.json tim_service.yaml -o bundled/tim_service.json
asyncapi bundle common.yaml testcases.json tim_common.yaml datapoints_common.json test_user.yaml -o bundled/test_user.json
asyncapi bundle common.yaml datapoints_common.json datapoints_service.json -o bundled/datapoints_service.json  

asyncapi validate bundled/tim_service.json
asyncapi validate bundled/test_user.json
asyncapi validate bundled/datapoints_service.json

asyncapi pretty bundled/tim_service.json
asyncapi pretty bundled/test_user.json
asyncapi pretty bundled/datapoints_service.json
