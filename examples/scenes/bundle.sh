cd priv/schema
asyncapi bundle common.json scenes_common.json scenes_user.json -o bundled/scenes_user.json  
asyncapi bundle common.json scenes_common.json ambid_common.json scenes_service.json -o bundled/scenes_service.json  

asyncapi validate bundled/scenes_user.json
asyncapi validate bundled/scenes_service.json