cd priv/schema

asyncapi bundle alm_common.yaml datapoints_common.json alm_server.yaml -o bundled/alarm_service.json
asyncapi bundle testcases.json alm_common.yaml datapoints_common.json test_user.yaml -o bundled/test_user.json
asyncapi bundle common.json datapoints_common.json datapoints_service.json -o bundled/datapoints_service.json  

asyncapi validate bundled/alarm_service.json
asyncapi validate bundled/test_user.json
asyncapi validate bundled/datapoints_service.json

asyncapi pretty bundled/alarm_service.json
asyncapi pretty bundled/test_user.json
asyncapi pretty bundled/datapoints_service.json
