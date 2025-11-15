asyncapi bundle producer.json common.json -o __build/producer.json  
asyncapi bundle consumer.json common.json -o __build/consumer.json  
asyncapi bundle service.json common.json -o __build/service.json

asyncapi validate __build/producer.json
asyncapi validate __build/consumer.json
asyncapi validate __build/service.json

asyncapi pretty __build/producer.json
asyncapi pretty __build/consumer.json
asyncapi pretty __build/service.json