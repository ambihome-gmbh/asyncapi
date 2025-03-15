cd priv/schema

asyncapi bundle alm_common.yaml datapoints_common.json alm_server.yaml -o bundled/service.json
asyncapi bundle testcases.json alm_common.yaml datapoints_common.json test_user.yaml -o bundled/user.json
asyncapi bundle common.json datapoints_common.json datapoints_service.json -o bundled/datapoints_service.json  

asyncapi validate bundled/service.json
asyncapi validate bundled/user.json
asyncapi validate bundled/datapoints_service.json

asyncapi pretty bundled/service.json
asyncapi pretty bundled/user.json
asyncapi pretty bundled/datapoints_service.json
