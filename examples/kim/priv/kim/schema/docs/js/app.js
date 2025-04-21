
    const schema = {
  "asyncapi": "3.0.0",
  "info": {
    "title": "KIM API",
    "version": "0.0.1",
    "description": "KIM API"
  },
  "defaultContentType": "application/json",
  "servers": {
    "production": {
      "host": "127.0.0.1",
      "protocol": "mqtt",
      "description": "Test broker",
      "variables": {
        "port": {
          "description": "MQTT port",
          "default": "1883",
          "enum": [
            "1883"
          ]
        }
      }
    }
  },
  "channels": {
    "functions-req": {
      "address": "functions/req/all",
      "title": "Functions req",
      "messages": {
        "filtered functions req": {
          "payload": {
            "type": "object",
            "properties": {
              "foo": {
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-2>"
              }
            },
            "required": [
              "foo"
            ],
            "additionalProperties": false,
            "x-parser-schema-id": "<anonymous-schema-1>"
          },
          "x-parser-unique-object-id": "filtered functions req",
          "x-parser-message-name": "filtered functions req"
        }
      },
      "description": "TODO:description",
      "x-parser-unique-object-id": "functions-req"
    },
    "functions-resp": {
      "address": "functions/resp/all",
      "title": "Functions Response",
      "messages": {
        "all function instances": {
          "payload": {
            "type": "array",
            "items": {
              "oneOf": [
                {
                  "type": "object",
                  "title": "User Blinds Control",
                  "required": [
                    "id",
                    "type",
                    "trade",
                    "name",
                    "function_points",
                    "function_location"
                  ],
                  "properties": {
                    "id": {
                      "format": "uuid",
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-6>"
                    },
                    "type": {
                      "const": "urn:knx:fct.blinds",
                      "x-parser-schema-id": "<anonymous-schema-7>"
                    },
                    "trade": {
                      "const": "tag#shading",
                      "x-parser-schema-id": "<anonymous-schema-8>"
                    },
                    "name": {
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-9>"
                    },
                    "function_points": {
                      "additionalProperties": false,
                      "properties": {
                        "mac#BlindsMoveUpDown": {
                          "format": "uuid",
                          "type": "string",
                          "x-parser-schema-id": "<anonymous-schema-11>"
                        },
                        "mac#BlindsPositionLength": {
                          "format": "uuid",
                          "type": "string",
                          "x-parser-schema-id": "<anonymous-schema-12>"
                        },
                        "mac#BlindsPositionPercentage": {
                          "format": "uuid",
                          "type": "string",
                          "x-parser-schema-id": "<anonymous-schema-13>"
                        },
                        "mac#BlindsSlatPositionDegrees": {
                          "format": "uuid",
                          "type": "string",
                          "x-parser-schema-id": "<anonymous-schema-14>"
                        },
                        "mac#BlindsSlatPositionPercentage": {
                          "format": "uuid",
                          "type": "string",
                          "x-parser-schema-id": "<anonymous-schema-15>"
                        },
                        "mac#BlindsStatus": {
                          "format": "uuid",
                          "type": "string",
                          "x-parser-schema-id": "<anonymous-schema-16>"
                        },
                        "mac#BlindsStopStep": {
                          "format": "uuid",
                          "type": "string",
                          "x-parser-schema-id": "<anonymous-schema-17>"
                        },
                        "mac#BlindsStopTrigger": {
                          "format": "uuid",
                          "type": "string",
                          "x-parser-schema-id": "<anonymous-schema-18>"
                        },
                        "mac#FrostAlarm": {
                          "format": "uuid",
                          "type": "string",
                          "x-parser-schema-id": "<anonymous-schema-19>"
                        },
                        "mac#RainAlarm": {
                          "format": "uuid",
                          "type": "string",
                          "x-parser-schema-id": "<anonymous-schema-20>"
                        },
                        "mac#WindAlarm": {
                          "format": "uuid",
                          "type": "string",
                          "x-parser-schema-id": "<anonymous-schema-21>"
                        }
                      },
                      "required": [
                        "mac#BlindsMoveUpDown",
                        "mac#BlindsPositionLength",
                        "mac#BlindsPositionPercentage",
                        "mac#BlindsSlatPositionDegrees",
                        "mac#BlindsSlatPositionPercentage",
                        "mac#BlindsStatus",
                        "mac#BlindsStopStep",
                        "mac#BlindsStopTrigger",
                        "mac#FrostAlarm",
                        "mac#RainAlarm",
                        "mac#WindAlarm"
                      ],
                      "type": "object",
                      "x-parser-schema-id": "<anonymous-schema-10>"
                    },
                    "function_location": {
                      "format": "uuid",
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-22>"
                    }
                  },
                  "additionalProperties": false,
                  "x-parser-schema-id": "<anonymous-schema-5>"
                },
                {
                  "type": "object",
                  "title": "User Light Dimming",
                  "required": [
                    "id",
                    "type",
                    "trade",
                    "name",
                    "function_points",
                    "function_location"
                  ],
                  "properties": {
                    "id": {
                      "format": "uuid",
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-24>"
                    },
                    "type": {
                      "const": "urn:knx:fct.dimLight",
                      "x-parser-schema-id": "<anonymous-schema-25>"
                    },
                    "trade": {
                      "const": "tag#lighting",
                      "x-parser-schema-id": "<anonymous-schema-26>"
                    },
                    "name": {
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-27>"
                    },
                    "function_points": {
                      "additionalProperties": false,
                      "properties": {
                        "mac#LightAbsoluteSetvalueRequest": {
                          "format": "uuid",
                          "type": "string",
                          "x-parser-schema-id": "<anonymous-schema-29>"
                        },
                        "mac#LightCurrentDimmingValue": {
                          "format": "uuid",
                          "type": "string",
                          "x-parser-schema-id": "<anonymous-schema-30>"
                        },
                        "mac#LightRelativeDimmingRequest": {
                          "format": "uuid",
                          "type": "string",
                          "x-parser-schema-id": "<anonymous-schema-31>"
                        },
                        "mac#LightCurrentStatus": {
                          "format": "uuid",
                          "type": "string",
                          "x-parser-schema-id": "<anonymous-schema-32>"
                        },
                        "mac#LightSwitchRequest": {
                          "format": "uuid",
                          "type": "string",
                          "x-parser-schema-id": "<anonymous-schema-33>"
                        }
                      },
                      "required": [
                        "mac#LightAbsoluteSetvalueRequest",
                        "mac#LightCurrentDimmingValue",
                        "mac#LightRelativeDimmingRequest",
                        "mac#LightCurrentStatus",
                        "mac#LightSwitchRequest"
                      ],
                      "type": "object",
                      "x-parser-schema-id": "<anonymous-schema-28>"
                    },
                    "function_location": {
                      "format": "uuid",
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-34>"
                    }
                  },
                  "additionalProperties": false,
                  "x-parser-schema-id": "<anonymous-schema-23>"
                },
                {
                  "type": "object",
                  "title": "User Shutter Control",
                  "required": [
                    "id",
                    "type",
                    "trade",
                    "name",
                    "function_points",
                    "function_location"
                  ],
                  "properties": {
                    "id": {
                      "format": "uuid",
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-36>"
                    },
                    "type": {
                      "const": "urn:knx:fct.shutter",
                      "x-parser-schema-id": "<anonymous-schema-37>"
                    },
                    "trade": {
                      "const": "tag#shading",
                      "x-parser-schema-id": "<anonymous-schema-38>"
                    },
                    "name": {
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-39>"
                    },
                    "function_points": {
                      "additionalProperties": false,
                      "properties": {
                        "mac#FrostAlarm": {
                          "format": "uuid",
                          "type": "string",
                          "x-parser-schema-id": "<anonymous-schema-41>"
                        },
                        "mac#RainAlarm": {
                          "format": "uuid",
                          "type": "string",
                          "x-parser-schema-id": "<anonymous-schema-42>"
                        },
                        "mac#ShutterMoveUpDown": {
                          "format": "uuid",
                          "type": "string",
                          "x-parser-schema-id": "<anonymous-schema-43>"
                        },
                        "mac#ShutterPositionLength": {
                          "format": "uuid",
                          "type": "string",
                          "x-parser-schema-id": "<anonymous-schema-44>"
                        },
                        "mac#ShutterPositionPercentage": {
                          "format": "uuid",
                          "type": "string",
                          "x-parser-schema-id": "<anonymous-schema-45>"
                        },
                        "mac#ShutterStatus": {
                          "format": "uuid",
                          "type": "string",
                          "x-parser-schema-id": "<anonymous-schema-46>"
                        },
                        "mac#ShutterStopStep": {
                          "format": "uuid",
                          "type": "string",
                          "x-parser-schema-id": "<anonymous-schema-47>"
                        },
                        "mac#ShutterStopTrigger": {
                          "format": "uuid",
                          "type": "string",
                          "x-parser-schema-id": "<anonymous-schema-48>"
                        },
                        "mac#WindAlarm": {
                          "format": "uuid",
                          "type": "string",
                          "x-parser-schema-id": "<anonymous-schema-49>"
                        }
                      },
                      "required": [
                        "mac#FrostAlarm",
                        "mac#RainAlarm",
                        "mac#ShutterMoveUpDown",
                        "mac#ShutterPositionLength",
                        "mac#ShutterPositionPercentage",
                        "mac#ShutterStatus",
                        "mac#ShutterStopStep",
                        "mac#ShutterStopTrigger",
                        "mac#WindAlarm"
                      ],
                      "type": "object",
                      "x-parser-schema-id": "<anonymous-schema-40>"
                    },
                    "function_location": {
                      "format": "uuid",
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-50>"
                    }
                  },
                  "additionalProperties": false,
                  "x-parser-schema-id": "<anonymous-schema-35>"
                },
                {
                  "type": "object",
                  "title": "User Light Switching",
                  "required": [
                    "id",
                    "type",
                    "trade",
                    "name",
                    "function_points",
                    "function_location"
                  ],
                  "properties": {
                    "id": {
                      "format": "uuid",
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-52>"
                    },
                    "type": {
                      "const": "urn:knx:fct.switchLight",
                      "x-parser-schema-id": "<anonymous-schema-53>"
                    },
                    "trade": {
                      "const": "tag#lighting",
                      "x-parser-schema-id": "<anonymous-schema-54>"
                    },
                    "name": {
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-55>"
                    },
                    "function_points": {
                      "additionalProperties": false,
                      "properties": {
                        "mac#LightCurrentStatus": {
                          "format": "uuid",
                          "type": "string",
                          "x-parser-schema-id": "<anonymous-schema-57>"
                        },
                        "mac#LightSwitchRequest": {
                          "format": "uuid",
                          "type": "string",
                          "x-parser-schema-id": "<anonymous-schema-58>"
                        }
                      },
                      "required": [
                        "mac#LightCurrentStatus",
                        "mac#LightSwitchRequest"
                      ],
                      "type": "object",
                      "x-parser-schema-id": "<anonymous-schema-56>"
                    },
                    "function_location": {
                      "format": "uuid",
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-59>"
                    }
                  },
                  "additionalProperties": false,
                  "x-parser-schema-id": "<anonymous-schema-51>"
                },
                {
                  "type": "object",
                  "title": "System Clock",
                  "required": [
                    "id",
                    "type",
                    "trade",
                    "name",
                    "function_points",
                    "function_location"
                  ],
                  "properties": {
                    "id": {
                      "format": "uuid",
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-61>"
                    },
                    "type": {
                      "const": "urn:knx:fct.systemClock",
                      "x-parser-schema-id": "<anonymous-schema-62>"
                    },
                    "trade": {
                      "const": null,
                      "x-parser-schema-id": "<anonymous-schema-63>"
                    },
                    "name": {
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-64>"
                    },
                    "function_points": {
                      "additionalProperties": false,
                      "properties": {
                        "mac#CurrentDate": {
                          "format": "uuid",
                          "type": "string",
                          "x-parser-schema-id": "<anonymous-schema-66>"
                        },
                        "mac#CurrentDateAndTime": {
                          "format": "uuid",
                          "type": "string",
                          "x-parser-schema-id": "<anonymous-schema-67>"
                        },
                        "mac#CurrentTime": {
                          "format": "uuid",
                          "type": "string",
                          "x-parser-schema-id": "<anonymous-schema-68>"
                        },
                        "mac#RelationToGMT": {
                          "format": "uuid",
                          "type": "string",
                          "x-parser-schema-id": "<anonymous-schema-69>"
                        }
                      },
                      "required": [
                        "mac#CurrentDate",
                        "mac#CurrentDateAndTime",
                        "mac#CurrentTime",
                        "mac#RelationToGMT"
                      ],
                      "type": "object",
                      "x-parser-schema-id": "<anonymous-schema-65>"
                    },
                    "function_location": {
                      "format": "uuid",
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-70>"
                    }
                  },
                  "additionalProperties": false,
                  "x-parser-schema-id": "<anonymous-schema-60>"
                }
              ],
              "x-parser-schema-id": "<anonymous-schema-4>"
            },
            "x-parser-schema-id": "<anonymous-schema-3>"
          },
          "x-parser-unique-object-id": "all function instances",
          "x-parser-message-name": "all function instances"
        }
      },
      "description": "TODO:description",
      "x-parser-unique-object-id": "functions-resp"
    },
    "function-req": {
      "address": "function/req/{instance_id}",
      "parameters": {
        "instance_id": {
          "description": "ID of the instance",
          "x-format": "uuid"
        }
      },
      "title": "Function Request",
      "messages": {
        "empty": {
          "payload": {
            "type": "object",
            "additionalProperties": false,
            "x-parser-schema-id": "<anonymous-schema-72>"
          },
          "x-parser-unique-object-id": "empty",
          "x-parser-message-name": "empty"
        }
      },
      "description": "TODO:description",
      "x-parser-unique-object-id": "function-req"
    },
    "function-resp": {
      "address": "function/resp/{instance_id}",
      "parameters": {
        "instance_id": {
          "description": "ID of the instance",
          "x-format": "uuid"
        }
      },
      "title": "Function Response",
      "messages": {
        "function instance": {
          "payload": {
            "oneOf": [
              {
                "type": "object",
                "title": "User Blinds Control",
                "required": [
                  "id",
                  "type",
                  "trade",
                  "name",
                  "function_points",
                  "function_location"
                ],
                "properties": {
                  "id": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-76>"
                  },
                  "type": {
                    "const": "urn:knx:fct.blinds",
                    "x-parser-schema-id": "<anonymous-schema-77>"
                  },
                  "trade": {
                    "const": "tag#shading",
                    "x-parser-schema-id": "<anonymous-schema-78>"
                  },
                  "name": {
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-79>"
                  },
                  "function_points": {
                    "additionalProperties": false,
                    "properties": {
                      "mac#BlindsMoveUpDown": {
                        "format": "uuid",
                        "type": "string",
                        "x-parser-schema-id": "<anonymous-schema-81>"
                      },
                      "mac#BlindsPositionLength": {
                        "format": "uuid",
                        "type": "string",
                        "x-parser-schema-id": "<anonymous-schema-82>"
                      },
                      "mac#BlindsPositionPercentage": {
                        "format": "uuid",
                        "type": "string",
                        "x-parser-schema-id": "<anonymous-schema-83>"
                      },
                      "mac#BlindsSlatPositionDegrees": {
                        "format": "uuid",
                        "type": "string",
                        "x-parser-schema-id": "<anonymous-schema-84>"
                      },
                      "mac#BlindsSlatPositionPercentage": {
                        "format": "uuid",
                        "type": "string",
                        "x-parser-schema-id": "<anonymous-schema-85>"
                      },
                      "mac#BlindsStatus": {
                        "format": "uuid",
                        "type": "string",
                        "x-parser-schema-id": "<anonymous-schema-86>"
                      },
                      "mac#BlindsStopStep": {
                        "format": "uuid",
                        "type": "string",
                        "x-parser-schema-id": "<anonymous-schema-87>"
                      },
                      "mac#BlindsStopTrigger": {
                        "format": "uuid",
                        "type": "string",
                        "x-parser-schema-id": "<anonymous-schema-88>"
                      },
                      "mac#FrostAlarm": {
                        "format": "uuid",
                        "type": "string",
                        "x-parser-schema-id": "<anonymous-schema-89>"
                      },
                      "mac#RainAlarm": {
                        "format": "uuid",
                        "type": "string",
                        "x-parser-schema-id": "<anonymous-schema-90>"
                      },
                      "mac#WindAlarm": {
                        "format": "uuid",
                        "type": "string",
                        "x-parser-schema-id": "<anonymous-schema-91>"
                      }
                    },
                    "required": [
                      "mac#BlindsMoveUpDown",
                      "mac#BlindsPositionLength",
                      "mac#BlindsPositionPercentage",
                      "mac#BlindsSlatPositionDegrees",
                      "mac#BlindsSlatPositionPercentage",
                      "mac#BlindsStatus",
                      "mac#BlindsStopStep",
                      "mac#BlindsStopTrigger",
                      "mac#FrostAlarm",
                      "mac#RainAlarm",
                      "mac#WindAlarm"
                    ],
                    "type": "object",
                    "x-parser-schema-id": "<anonymous-schema-80>"
                  },
                  "function_location": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-92>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-75>"
              },
              {
                "type": "object",
                "title": "User Light Dimming",
                "required": [
                  "id",
                  "type",
                  "trade",
                  "name",
                  "function_points",
                  "function_location"
                ],
                "properties": {
                  "id": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-94>"
                  },
                  "type": {
                    "const": "urn:knx:fct.dimLight",
                    "x-parser-schema-id": "<anonymous-schema-95>"
                  },
                  "trade": {
                    "const": "tag#lighting",
                    "x-parser-schema-id": "<anonymous-schema-96>"
                  },
                  "name": {
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-97>"
                  },
                  "function_points": {
                    "additionalProperties": false,
                    "properties": {
                      "mac#LightAbsoluteSetvalueRequest": {
                        "format": "uuid",
                        "type": "string",
                        "x-parser-schema-id": "<anonymous-schema-99>"
                      },
                      "mac#LightCurrentDimmingValue": {
                        "format": "uuid",
                        "type": "string",
                        "x-parser-schema-id": "<anonymous-schema-100>"
                      },
                      "mac#LightRelativeDimmingRequest": {
                        "format": "uuid",
                        "type": "string",
                        "x-parser-schema-id": "<anonymous-schema-101>"
                      },
                      "mac#LightCurrentStatus": {
                        "format": "uuid",
                        "type": "string",
                        "x-parser-schema-id": "<anonymous-schema-102>"
                      },
                      "mac#LightSwitchRequest": {
                        "format": "uuid",
                        "type": "string",
                        "x-parser-schema-id": "<anonymous-schema-103>"
                      }
                    },
                    "required": [
                      "mac#LightAbsoluteSetvalueRequest",
                      "mac#LightCurrentDimmingValue",
                      "mac#LightRelativeDimmingRequest",
                      "mac#LightCurrentStatus",
                      "mac#LightSwitchRequest"
                    ],
                    "type": "object",
                    "x-parser-schema-id": "<anonymous-schema-98>"
                  },
                  "function_location": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-104>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-93>"
              },
              {
                "type": "object",
                "title": "User Shutter Control",
                "required": [
                  "id",
                  "type",
                  "trade",
                  "name",
                  "function_points",
                  "function_location"
                ],
                "properties": {
                  "id": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-106>"
                  },
                  "type": {
                    "const": "urn:knx:fct.shutter",
                    "x-parser-schema-id": "<anonymous-schema-107>"
                  },
                  "trade": {
                    "const": "tag#shading",
                    "x-parser-schema-id": "<anonymous-schema-108>"
                  },
                  "name": {
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-109>"
                  },
                  "function_points": {
                    "additionalProperties": false,
                    "properties": {
                      "mac#FrostAlarm": {
                        "format": "uuid",
                        "type": "string",
                        "x-parser-schema-id": "<anonymous-schema-111>"
                      },
                      "mac#RainAlarm": {
                        "format": "uuid",
                        "type": "string",
                        "x-parser-schema-id": "<anonymous-schema-112>"
                      },
                      "mac#ShutterMoveUpDown": {
                        "format": "uuid",
                        "type": "string",
                        "x-parser-schema-id": "<anonymous-schema-113>"
                      },
                      "mac#ShutterPositionLength": {
                        "format": "uuid",
                        "type": "string",
                        "x-parser-schema-id": "<anonymous-schema-114>"
                      },
                      "mac#ShutterPositionPercentage": {
                        "format": "uuid",
                        "type": "string",
                        "x-parser-schema-id": "<anonymous-schema-115>"
                      },
                      "mac#ShutterStatus": {
                        "format": "uuid",
                        "type": "string",
                        "x-parser-schema-id": "<anonymous-schema-116>"
                      },
                      "mac#ShutterStopStep": {
                        "format": "uuid",
                        "type": "string",
                        "x-parser-schema-id": "<anonymous-schema-117>"
                      },
                      "mac#ShutterStopTrigger": {
                        "format": "uuid",
                        "type": "string",
                        "x-parser-schema-id": "<anonymous-schema-118>"
                      },
                      "mac#WindAlarm": {
                        "format": "uuid",
                        "type": "string",
                        "x-parser-schema-id": "<anonymous-schema-119>"
                      }
                    },
                    "required": [
                      "mac#FrostAlarm",
                      "mac#RainAlarm",
                      "mac#ShutterMoveUpDown",
                      "mac#ShutterPositionLength",
                      "mac#ShutterPositionPercentage",
                      "mac#ShutterStatus",
                      "mac#ShutterStopStep",
                      "mac#ShutterStopTrigger",
                      "mac#WindAlarm"
                    ],
                    "type": "object",
                    "x-parser-schema-id": "<anonymous-schema-110>"
                  },
                  "function_location": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-120>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-105>"
              },
              {
                "type": "object",
                "title": "User Light Switching",
                "required": [
                  "id",
                  "type",
                  "trade",
                  "name",
                  "function_points",
                  "function_location"
                ],
                "properties": {
                  "id": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-122>"
                  },
                  "type": {
                    "const": "urn:knx:fct.switchLight",
                    "x-parser-schema-id": "<anonymous-schema-123>"
                  },
                  "trade": {
                    "const": "tag#lighting",
                    "x-parser-schema-id": "<anonymous-schema-124>"
                  },
                  "name": {
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-125>"
                  },
                  "function_points": {
                    "additionalProperties": false,
                    "properties": {
                      "mac#LightCurrentStatus": {
                        "format": "uuid",
                        "type": "string",
                        "x-parser-schema-id": "<anonymous-schema-127>"
                      },
                      "mac#LightSwitchRequest": {
                        "format": "uuid",
                        "type": "string",
                        "x-parser-schema-id": "<anonymous-schema-128>"
                      }
                    },
                    "required": [
                      "mac#LightCurrentStatus",
                      "mac#LightSwitchRequest"
                    ],
                    "type": "object",
                    "x-parser-schema-id": "<anonymous-schema-126>"
                  },
                  "function_location": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-129>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-121>"
              },
              {
                "type": "object",
                "title": "System Clock",
                "required": [
                  "id",
                  "type",
                  "trade",
                  "name",
                  "function_points",
                  "function_location"
                ],
                "properties": {
                  "id": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-131>"
                  },
                  "type": {
                    "const": "urn:knx:fct.systemClock",
                    "x-parser-schema-id": "<anonymous-schema-132>"
                  },
                  "trade": {
                    "const": null,
                    "x-parser-schema-id": "<anonymous-schema-133>"
                  },
                  "name": {
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-134>"
                  },
                  "function_points": {
                    "additionalProperties": false,
                    "properties": {
                      "mac#CurrentDate": {
                        "format": "uuid",
                        "type": "string",
                        "x-parser-schema-id": "<anonymous-schema-136>"
                      },
                      "mac#CurrentDateAndTime": {
                        "format": "uuid",
                        "type": "string",
                        "x-parser-schema-id": "<anonymous-schema-137>"
                      },
                      "mac#CurrentTime": {
                        "format": "uuid",
                        "type": "string",
                        "x-parser-schema-id": "<anonymous-schema-138>"
                      },
                      "mac#RelationToGMT": {
                        "format": "uuid",
                        "type": "string",
                        "x-parser-schema-id": "<anonymous-schema-139>"
                      }
                    },
                    "required": [
                      "mac#CurrentDate",
                      "mac#CurrentDateAndTime",
                      "mac#CurrentTime",
                      "mac#RelationToGMT"
                    ],
                    "type": "object",
                    "x-parser-schema-id": "<anonymous-schema-135>"
                  },
                  "function_location": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-140>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-130>"
              }
            ],
            "x-parser-schema-id": "<anonymous-schema-74>"
          },
          "x-parser-unique-object-id": "function instance",
          "x-parser-message-name": "function instance"
        }
      },
      "description": "TODO:description",
      "x-parser-unique-object-id": "function-resp"
    },
    "functionpoints-req": {
      "address": "functionpoints/req/all",
      "title": "Functionpoints Request",
      "messages": {
        "filtered functionpoints req": {
          "payload": {
            "type": "object",
            "properties": {
              "foo": {
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-142>"
              }
            },
            "required": [
              "foo"
            ],
            "additionalProperties": false,
            "x-parser-schema-id": "<anonymous-schema-141>"
          },
          "x-parser-unique-object-id": "filtered functionpoints req",
          "x-parser-message-name": "filtered functionpoints req"
        }
      },
      "description": "TODO:description",
      "x-parser-unique-object-id": "functionpoints-req"
    },
    "functionpoints-resp": {
      "address": "functionpoints/resp/all",
      "title": "Functionpoints Request",
      "messages": {
        "all functionpoint instances": {
          "payload": {
            "type": "array",
            "items": {
              "oneOf": [
                {
                  "type": "object",
                  "title": "Blinds Move Up Down",
                  "required": [
                    "id",
                    "type",
                    "title",
                    "datapoint_type",
                    "function_ref"
                  ],
                  "properties": {
                    "id": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-146>"
                    },
                    "type": {
                      "const": "mac#BlindsMoveUpDown",
                      "x-parser-schema-id": "<anonymous-schema-147>"
                    },
                    "title": {
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-148>"
                    },
                    "datapoint_type": {
                      "const": "urn:knx:dpt.upDown",
                      "x-parser-schema-id": "<anonymous-schema-149>"
                    },
                    "function_ref": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-150>"
                    }
                  },
                  "additionalProperties": false,
                  "x-parser-schema-id": "<anonymous-schema-145>"
                },
                {
                  "type": "object",
                  "title": "Blinds Position Length",
                  "required": [
                    "id",
                    "type",
                    "title",
                    "datapoint_type",
                    "function_ref"
                  ],
                  "properties": {
                    "id": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-152>"
                    },
                    "type": {
                      "const": "mac#BlindsPositionLength",
                      "x-parser-schema-id": "<anonymous-schema-153>"
                    },
                    "title": {
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-154>"
                    },
                    "datapoint_type": {
                      "const": "urn:knx:dpt.lengthmm",
                      "x-parser-schema-id": "<anonymous-schema-155>"
                    },
                    "function_ref": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-156>"
                    }
                  },
                  "additionalProperties": false,
                  "x-parser-schema-id": "<anonymous-schema-151>"
                },
                {
                  "type": "object",
                  "title": "Blinds Position Percentage",
                  "required": [
                    "id",
                    "type",
                    "title",
                    "datapoint_type",
                    "function_ref"
                  ],
                  "properties": {
                    "id": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-158>"
                    },
                    "type": {
                      "const": "mac#BlindsPositionPercentage",
                      "x-parser-schema-id": "<anonymous-schema-159>"
                    },
                    "title": {
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-160>"
                    },
                    "datapoint_type": {
                      "const": "urn:knx:dpt.scaling",
                      "x-parser-schema-id": "<anonymous-schema-161>"
                    },
                    "function_ref": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-162>"
                    }
                  },
                  "additionalProperties": false,
                  "x-parser-schema-id": "<anonymous-schema-157>"
                },
                {
                  "type": "object",
                  "title": "Blinds Slat Position Degrees",
                  "required": [
                    "id",
                    "type",
                    "title",
                    "datapoint_type",
                    "function_ref"
                  ],
                  "properties": {
                    "id": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-164>"
                    },
                    "type": {
                      "const": "mac#BlindsSlatPositionDegrees",
                      "x-parser-schema-id": "<anonymous-schema-165>"
                    },
                    "title": {
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-166>"
                    },
                    "datapoint_type": {
                      "const": "urn:knx:dpt.rotationAngle",
                      "x-parser-schema-id": "<anonymous-schema-167>"
                    },
                    "function_ref": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-168>"
                    }
                  },
                  "additionalProperties": false,
                  "x-parser-schema-id": "<anonymous-schema-163>"
                },
                {
                  "type": "object",
                  "title": "Blinds Slat Position Percentage",
                  "required": [
                    "id",
                    "type",
                    "title",
                    "datapoint_type",
                    "function_ref"
                  ],
                  "properties": {
                    "id": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-170>"
                    },
                    "type": {
                      "const": "mac#BlindsSlatPositionPercentage",
                      "x-parser-schema-id": "<anonymous-schema-171>"
                    },
                    "title": {
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-172>"
                    },
                    "datapoint_type": {
                      "const": "urn:knx:dpt.scaling",
                      "x-parser-schema-id": "<anonymous-schema-173>"
                    },
                    "function_ref": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-174>"
                    }
                  },
                  "additionalProperties": false,
                  "x-parser-schema-id": "<anonymous-schema-169>"
                },
                {
                  "type": "object",
                  "title": "Blinds Status",
                  "required": [
                    "id",
                    "type",
                    "title",
                    "datapoint_type",
                    "function_ref"
                  ],
                  "properties": {
                    "id": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-176>"
                    },
                    "type": {
                      "const": "mac#BlindsStatus",
                      "x-parser-schema-id": "<anonymous-schema-177>"
                    },
                    "title": {
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-178>"
                    },
                    "datapoint_type": {
                      "const": "urn:knx:dpt.upDown",
                      "x-parser-schema-id": "<anonymous-schema-179>"
                    },
                    "function_ref": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-180>"
                    }
                  },
                  "additionalProperties": false,
                  "x-parser-schema-id": "<anonymous-schema-175>"
                },
                {
                  "type": "object",
                  "title": "Blinds Stop Step",
                  "required": [
                    "id",
                    "type",
                    "title",
                    "datapoint_type",
                    "function_ref"
                  ],
                  "properties": {
                    "id": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-182>"
                    },
                    "type": {
                      "const": "mac#BlindsStopStep",
                      "x-parser-schema-id": "<anonymous-schema-183>"
                    },
                    "title": {
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-184>"
                    },
                    "datapoint_type": {
                      "const": "urn:knx:dpt.step",
                      "x-parser-schema-id": "<anonymous-schema-185>"
                    },
                    "function_ref": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-186>"
                    }
                  },
                  "additionalProperties": false,
                  "x-parser-schema-id": "<anonymous-schema-181>"
                },
                {
                  "type": "object",
                  "title": "Blinds Stop Trigger",
                  "required": [
                    "id",
                    "type",
                    "title",
                    "datapoint_type",
                    "function_ref"
                  ],
                  "properties": {
                    "id": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-188>"
                    },
                    "type": {
                      "const": "mac#BlindsStopTrigger",
                      "x-parser-schema-id": "<anonymous-schema-189>"
                    },
                    "title": {
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-190>"
                    },
                    "datapoint_type": {
                      "const": "urn:knx:dpt.trigger",
                      "x-parser-schema-id": "<anonymous-schema-191>"
                    },
                    "function_ref": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-192>"
                    }
                  },
                  "additionalProperties": false,
                  "x-parser-schema-id": "<anonymous-schema-187>"
                },
                {
                  "type": "object",
                  "title": "Current Date",
                  "required": [
                    "id",
                    "type",
                    "title",
                    "datapoint_type",
                    "function_ref"
                  ],
                  "properties": {
                    "id": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-194>"
                    },
                    "type": {
                      "const": "mac#CurrentDate",
                      "x-parser-schema-id": "<anonymous-schema-195>"
                    },
                    "title": {
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-196>"
                    },
                    "datapoint_type": {
                      "const": "urn:knx:dpt.date",
                      "x-parser-schema-id": "<anonymous-schema-197>"
                    },
                    "function_ref": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-198>"
                    }
                  },
                  "additionalProperties": false,
                  "x-parser-schema-id": "<anonymous-schema-193>"
                },
                {
                  "type": "object",
                  "title": "Current Date and Time",
                  "required": [
                    "id",
                    "type",
                    "title",
                    "datapoint_type",
                    "function_ref"
                  ],
                  "properties": {
                    "id": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-200>"
                    },
                    "type": {
                      "const": "mac#CurrentDateAndTime",
                      "x-parser-schema-id": "<anonymous-schema-201>"
                    },
                    "title": {
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-202>"
                    },
                    "datapoint_type": {
                      "const": "urn:knx:dpt.dateTime",
                      "x-parser-schema-id": "<anonymous-schema-203>"
                    },
                    "function_ref": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-204>"
                    }
                  },
                  "additionalProperties": false,
                  "x-parser-schema-id": "<anonymous-schema-199>"
                },
                {
                  "type": "object",
                  "title": "Current Time",
                  "required": [
                    "id",
                    "type",
                    "title",
                    "datapoint_type",
                    "function_ref"
                  ],
                  "properties": {
                    "id": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-206>"
                    },
                    "type": {
                      "const": "mac#CurrentTime",
                      "x-parser-schema-id": "<anonymous-schema-207>"
                    },
                    "title": {
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-208>"
                    },
                    "datapoint_type": {
                      "const": "urn:knx:dpt.timeOfDay",
                      "x-parser-schema-id": "<anonymous-schema-209>"
                    },
                    "function_ref": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-210>"
                    }
                  },
                  "additionalProperties": false,
                  "x-parser-schema-id": "<anonymous-schema-205>"
                },
                {
                  "type": "object",
                  "title": "Frost Alarm",
                  "required": [
                    "id",
                    "type",
                    "title",
                    "datapoint_type",
                    "function_ref"
                  ],
                  "properties": {
                    "id": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-212>"
                    },
                    "type": {
                      "const": "mac#FrostAlarm",
                      "x-parser-schema-id": "<anonymous-schema-213>"
                    },
                    "title": {
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-214>"
                    },
                    "datapoint_type": {
                      "const": "urn:knx:dpt.alarm",
                      "x-parser-schema-id": "<anonymous-schema-215>"
                    },
                    "function_ref": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-216>"
                    }
                  },
                  "additionalProperties": false,
                  "x-parser-schema-id": "<anonymous-schema-211>"
                },
                {
                  "type": "object",
                  "title": "Light Absolute Setvalue Request",
                  "required": [
                    "id",
                    "type",
                    "title",
                    "datapoint_type",
                    "function_ref"
                  ],
                  "properties": {
                    "id": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-218>"
                    },
                    "type": {
                      "const": "mac#LightAbsoluteSetvalueRequest",
                      "x-parser-schema-id": "<anonymous-schema-219>"
                    },
                    "title": {
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-220>"
                    },
                    "datapoint_type": {
                      "const": "urn:knx:dpt.scaling",
                      "x-parser-schema-id": "<anonymous-schema-221>"
                    },
                    "function_ref": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-222>"
                    }
                  },
                  "additionalProperties": false,
                  "x-parser-schema-id": "<anonymous-schema-217>"
                },
                {
                  "type": "object",
                  "title": "Light Current Dimming Value",
                  "required": [
                    "id",
                    "type",
                    "title",
                    "datapoint_type",
                    "function_ref"
                  ],
                  "properties": {
                    "id": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-224>"
                    },
                    "type": {
                      "const": "mac#LightCurrentDimmingValue",
                      "x-parser-schema-id": "<anonymous-schema-225>"
                    },
                    "title": {
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-226>"
                    },
                    "datapoint_type": {
                      "const": "urn:knx:dpt.scaling",
                      "x-parser-schema-id": "<anonymous-schema-227>"
                    },
                    "function_ref": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-228>"
                    }
                  },
                  "additionalProperties": false,
                  "x-parser-schema-id": "<anonymous-schema-223>"
                },
                {
                  "type": "object",
                  "title": "Light Current Status",
                  "required": [
                    "id",
                    "type",
                    "title",
                    "datapoint_type",
                    "function_ref"
                  ],
                  "properties": {
                    "id": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-230>"
                    },
                    "type": {
                      "const": "mac#LightCurrentStatus",
                      "x-parser-schema-id": "<anonymous-schema-231>"
                    },
                    "title": {
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-232>"
                    },
                    "datapoint_type": {
                      "const": "urn:knx:dpt.switch",
                      "x-parser-schema-id": "<anonymous-schema-233>"
                    },
                    "function_ref": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-234>"
                    }
                  },
                  "additionalProperties": false,
                  "x-parser-schema-id": "<anonymous-schema-229>"
                },
                {
                  "type": "object",
                  "title": "Light Relative Dimming Request",
                  "required": [
                    "id",
                    "type",
                    "title",
                    "datapoint_type",
                    "function_ref"
                  ],
                  "properties": {
                    "id": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-236>"
                    },
                    "type": {
                      "const": "mac#LightRelativeDimmingRequest",
                      "x-parser-schema-id": "<anonymous-schema-237>"
                    },
                    "title": {
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-238>"
                    },
                    "datapoint_type": {
                      "const": "urn:knx:dpt.controlDimming",
                      "x-parser-schema-id": "<anonymous-schema-239>"
                    },
                    "function_ref": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-240>"
                    }
                  },
                  "additionalProperties": false,
                  "x-parser-schema-id": "<anonymous-schema-235>"
                },
                {
                  "type": "object",
                  "title": "Light Switch Request",
                  "required": [
                    "id",
                    "type",
                    "title",
                    "datapoint_type",
                    "function_ref"
                  ],
                  "properties": {
                    "id": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-242>"
                    },
                    "type": {
                      "const": "mac#LightSwitchRequest",
                      "x-parser-schema-id": "<anonymous-schema-243>"
                    },
                    "title": {
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-244>"
                    },
                    "datapoint_type": {
                      "const": "urn:knx:dpt.switch",
                      "x-parser-schema-id": "<anonymous-schema-245>"
                    },
                    "function_ref": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-246>"
                    }
                  },
                  "additionalProperties": false,
                  "x-parser-schema-id": "<anonymous-schema-241>"
                },
                {
                  "type": "object",
                  "title": "Rain Alarm",
                  "required": [
                    "id",
                    "type",
                    "title",
                    "datapoint_type",
                    "function_ref"
                  ],
                  "properties": {
                    "id": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-248>"
                    },
                    "type": {
                      "const": "mac#RainAlarm",
                      "x-parser-schema-id": "<anonymous-schema-249>"
                    },
                    "title": {
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-250>"
                    },
                    "datapoint_type": {
                      "const": "urn:knx:dpt.alarm",
                      "x-parser-schema-id": "<anonymous-schema-251>"
                    },
                    "function_ref": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-252>"
                    }
                  },
                  "additionalProperties": false,
                  "x-parser-schema-id": "<anonymous-schema-247>"
                },
                {
                  "type": "object",
                  "title": "Relation to GMT",
                  "required": [
                    "id",
                    "type",
                    "title",
                    "datapoint_type",
                    "function_ref"
                  ],
                  "properties": {
                    "id": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-254>"
                    },
                    "type": {
                      "const": "mac#RelationToGMT",
                      "x-parser-schema-id": "<anonymous-schema-255>"
                    },
                    "title": {
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-256>"
                    },
                    "datapoint_type": {
                      "const": "urn:knx:dpt.deltaTimeMin",
                      "x-parser-schema-id": "<anonymous-schema-257>"
                    },
                    "function_ref": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-258>"
                    }
                  },
                  "additionalProperties": false,
                  "x-parser-schema-id": "<anonymous-schema-253>"
                },
                {
                  "type": "object",
                  "title": "Shutter Move Up Down",
                  "required": [
                    "id",
                    "type",
                    "title",
                    "datapoint_type",
                    "function_ref"
                  ],
                  "properties": {
                    "id": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-260>"
                    },
                    "type": {
                      "const": "mac#ShutterMoveUpDown",
                      "x-parser-schema-id": "<anonymous-schema-261>"
                    },
                    "title": {
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-262>"
                    },
                    "datapoint_type": {
                      "const": "urn:knx:dpt.upDown",
                      "x-parser-schema-id": "<anonymous-schema-263>"
                    },
                    "function_ref": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-264>"
                    }
                  },
                  "additionalProperties": false,
                  "x-parser-schema-id": "<anonymous-schema-259>"
                },
                {
                  "type": "object",
                  "title": "Shutter Position Length",
                  "required": [
                    "id",
                    "type",
                    "title",
                    "datapoint_type",
                    "function_ref"
                  ],
                  "properties": {
                    "id": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-266>"
                    },
                    "type": {
                      "const": "mac#ShutterPositionLength",
                      "x-parser-schema-id": "<anonymous-schema-267>"
                    },
                    "title": {
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-268>"
                    },
                    "datapoint_type": {
                      "const": "urn:knx:dpt.lengthmm",
                      "x-parser-schema-id": "<anonymous-schema-269>"
                    },
                    "function_ref": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-270>"
                    }
                  },
                  "additionalProperties": false,
                  "x-parser-schema-id": "<anonymous-schema-265>"
                },
                {
                  "type": "object",
                  "title": "Shutter Position Percentage",
                  "required": [
                    "id",
                    "type",
                    "title",
                    "datapoint_type",
                    "function_ref"
                  ],
                  "properties": {
                    "id": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-272>"
                    },
                    "type": {
                      "const": "mac#ShutterPositionPercentage",
                      "x-parser-schema-id": "<anonymous-schema-273>"
                    },
                    "title": {
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-274>"
                    },
                    "datapoint_type": {
                      "const": "urn:knx:dpt.scaling",
                      "x-parser-schema-id": "<anonymous-schema-275>"
                    },
                    "function_ref": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-276>"
                    }
                  },
                  "additionalProperties": false,
                  "x-parser-schema-id": "<anonymous-schema-271>"
                },
                {
                  "type": "object",
                  "title": "Shutter Status",
                  "required": [
                    "id",
                    "type",
                    "title",
                    "datapoint_type",
                    "function_ref"
                  ],
                  "properties": {
                    "id": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-278>"
                    },
                    "type": {
                      "const": "mac#ShutterStatus",
                      "x-parser-schema-id": "<anonymous-schema-279>"
                    },
                    "title": {
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-280>"
                    },
                    "datapoint_type": {
                      "const": "urn:knx:dpt.upDown",
                      "x-parser-schema-id": "<anonymous-schema-281>"
                    },
                    "function_ref": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-282>"
                    }
                  },
                  "additionalProperties": false,
                  "x-parser-schema-id": "<anonymous-schema-277>"
                },
                {
                  "type": "object",
                  "title": "Shutter Stop Step",
                  "required": [
                    "id",
                    "type",
                    "title",
                    "datapoint_type",
                    "function_ref"
                  ],
                  "properties": {
                    "id": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-284>"
                    },
                    "type": {
                      "const": "mac#ShutterStopStep",
                      "x-parser-schema-id": "<anonymous-schema-285>"
                    },
                    "title": {
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-286>"
                    },
                    "datapoint_type": {
                      "const": "urn:knx:dpt.step",
                      "x-parser-schema-id": "<anonymous-schema-287>"
                    },
                    "function_ref": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-288>"
                    }
                  },
                  "additionalProperties": false,
                  "x-parser-schema-id": "<anonymous-schema-283>"
                },
                {
                  "type": "object",
                  "title": "Shutter Stop Trigger",
                  "required": [
                    "id",
                    "type",
                    "title",
                    "datapoint_type",
                    "function_ref"
                  ],
                  "properties": {
                    "id": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-290>"
                    },
                    "type": {
                      "const": "mac#ShutterStopTrigger",
                      "x-parser-schema-id": "<anonymous-schema-291>"
                    },
                    "title": {
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-292>"
                    },
                    "datapoint_type": {
                      "const": "urn:knx:dpt.trigger",
                      "x-parser-schema-id": "<anonymous-schema-293>"
                    },
                    "function_ref": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-294>"
                    }
                  },
                  "additionalProperties": false,
                  "x-parser-schema-id": "<anonymous-schema-289>"
                },
                {
                  "type": "object",
                  "title": "Wind Alarm",
                  "required": [
                    "id",
                    "type",
                    "title",
                    "datapoint_type",
                    "function_ref"
                  ],
                  "properties": {
                    "id": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-296>"
                    },
                    "type": {
                      "const": "mac#WindAlarm",
                      "x-parser-schema-id": "<anonymous-schema-297>"
                    },
                    "title": {
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-298>"
                    },
                    "datapoint_type": {
                      "const": "urn:knx:dpt.alarm",
                      "x-parser-schema-id": "<anonymous-schema-299>"
                    },
                    "function_ref": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-300>"
                    }
                  },
                  "additionalProperties": false,
                  "x-parser-schema-id": "<anonymous-schema-295>"
                }
              ],
              "x-parser-schema-id": "<anonymous-schema-144>"
            },
            "x-parser-schema-id": "<anonymous-schema-143>"
          },
          "x-parser-unique-object-id": "all functionpoint instances",
          "x-parser-message-name": "all functionpoint instances"
        }
      },
      "description": "TODO:description",
      "x-parser-unique-object-id": "functionpoints-resp"
    },
    "functionpoint-req": {
      "address": "functionpoint/req/{instance_id}",
      "parameters": {
        "instance_id": {
          "description": "ID of the instance",
          "x-format": "uuid"
        }
      },
      "title": "Functionpoint Request",
      "messages": {
        "empty": {
          "payload": {
            "type": "object",
            "additionalProperties": false,
            "x-parser-schema-id": "<anonymous-schema-302>"
          },
          "x-parser-unique-object-id": "empty",
          "x-parser-message-name": "empty"
        }
      },
      "description": "TODO:description",
      "x-parser-unique-object-id": "functionpoint-req"
    },
    "functionpoint-resp": {
      "address": "functionpoint/resp/{instance_id}",
      "parameters": {
        "instance_id": {
          "description": "ID of the instance",
          "x-format": "uuid"
        }
      },
      "title": "Functionpoint Response",
      "messages": {
        "functionpoint instance": {
          "payload": {
            "oneOf": [
              {
                "type": "object",
                "title": "Blinds Move Up Down",
                "required": [
                  "id",
                  "type",
                  "title",
                  "datapoint_type",
                  "function_ref"
                ],
                "properties": {
                  "id": {
                    "type": "string",
                    "format": "uuid",
                    "x-parser-schema-id": "<anonymous-schema-306>"
                  },
                  "type": {
                    "const": "mac#BlindsMoveUpDown",
                    "x-parser-schema-id": "<anonymous-schema-307>"
                  },
                  "title": {
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-308>"
                  },
                  "datapoint_type": {
                    "const": "urn:knx:dpt.upDown",
                    "x-parser-schema-id": "<anonymous-schema-309>"
                  },
                  "function_ref": {
                    "type": "string",
                    "format": "uuid",
                    "x-parser-schema-id": "<anonymous-schema-310>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-305>"
              },
              {
                "type": "object",
                "title": "Blinds Position Length",
                "required": [
                  "id",
                  "type",
                  "title",
                  "datapoint_type",
                  "function_ref"
                ],
                "properties": {
                  "id": {
                    "type": "string",
                    "format": "uuid",
                    "x-parser-schema-id": "<anonymous-schema-312>"
                  },
                  "type": {
                    "const": "mac#BlindsPositionLength",
                    "x-parser-schema-id": "<anonymous-schema-313>"
                  },
                  "title": {
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-314>"
                  },
                  "datapoint_type": {
                    "const": "urn:knx:dpt.lengthmm",
                    "x-parser-schema-id": "<anonymous-schema-315>"
                  },
                  "function_ref": {
                    "type": "string",
                    "format": "uuid",
                    "x-parser-schema-id": "<anonymous-schema-316>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-311>"
              },
              {
                "type": "object",
                "title": "Blinds Position Percentage",
                "required": [
                  "id",
                  "type",
                  "title",
                  "datapoint_type",
                  "function_ref"
                ],
                "properties": {
                  "id": {
                    "type": "string",
                    "format": "uuid",
                    "x-parser-schema-id": "<anonymous-schema-318>"
                  },
                  "type": {
                    "const": "mac#BlindsPositionPercentage",
                    "x-parser-schema-id": "<anonymous-schema-319>"
                  },
                  "title": {
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-320>"
                  },
                  "datapoint_type": {
                    "const": "urn:knx:dpt.scaling",
                    "x-parser-schema-id": "<anonymous-schema-321>"
                  },
                  "function_ref": {
                    "type": "string",
                    "format": "uuid",
                    "x-parser-schema-id": "<anonymous-schema-322>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-317>"
              },
              {
                "type": "object",
                "title": "Blinds Slat Position Degrees",
                "required": [
                  "id",
                  "type",
                  "title",
                  "datapoint_type",
                  "function_ref"
                ],
                "properties": {
                  "id": {
                    "type": "string",
                    "format": "uuid",
                    "x-parser-schema-id": "<anonymous-schema-324>"
                  },
                  "type": {
                    "const": "mac#BlindsSlatPositionDegrees",
                    "x-parser-schema-id": "<anonymous-schema-325>"
                  },
                  "title": {
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-326>"
                  },
                  "datapoint_type": {
                    "const": "urn:knx:dpt.rotationAngle",
                    "x-parser-schema-id": "<anonymous-schema-327>"
                  },
                  "function_ref": {
                    "type": "string",
                    "format": "uuid",
                    "x-parser-schema-id": "<anonymous-schema-328>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-323>"
              },
              {
                "type": "object",
                "title": "Blinds Slat Position Percentage",
                "required": [
                  "id",
                  "type",
                  "title",
                  "datapoint_type",
                  "function_ref"
                ],
                "properties": {
                  "id": {
                    "type": "string",
                    "format": "uuid",
                    "x-parser-schema-id": "<anonymous-schema-330>"
                  },
                  "type": {
                    "const": "mac#BlindsSlatPositionPercentage",
                    "x-parser-schema-id": "<anonymous-schema-331>"
                  },
                  "title": {
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-332>"
                  },
                  "datapoint_type": {
                    "const": "urn:knx:dpt.scaling",
                    "x-parser-schema-id": "<anonymous-schema-333>"
                  },
                  "function_ref": {
                    "type": "string",
                    "format": "uuid",
                    "x-parser-schema-id": "<anonymous-schema-334>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-329>"
              },
              {
                "type": "object",
                "title": "Blinds Status",
                "required": [
                  "id",
                  "type",
                  "title",
                  "datapoint_type",
                  "function_ref"
                ],
                "properties": {
                  "id": {
                    "type": "string",
                    "format": "uuid",
                    "x-parser-schema-id": "<anonymous-schema-336>"
                  },
                  "type": {
                    "const": "mac#BlindsStatus",
                    "x-parser-schema-id": "<anonymous-schema-337>"
                  },
                  "title": {
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-338>"
                  },
                  "datapoint_type": {
                    "const": "urn:knx:dpt.upDown",
                    "x-parser-schema-id": "<anonymous-schema-339>"
                  },
                  "function_ref": {
                    "type": "string",
                    "format": "uuid",
                    "x-parser-schema-id": "<anonymous-schema-340>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-335>"
              },
              {
                "type": "object",
                "title": "Blinds Stop Step",
                "required": [
                  "id",
                  "type",
                  "title",
                  "datapoint_type",
                  "function_ref"
                ],
                "properties": {
                  "id": {
                    "type": "string",
                    "format": "uuid",
                    "x-parser-schema-id": "<anonymous-schema-342>"
                  },
                  "type": {
                    "const": "mac#BlindsStopStep",
                    "x-parser-schema-id": "<anonymous-schema-343>"
                  },
                  "title": {
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-344>"
                  },
                  "datapoint_type": {
                    "const": "urn:knx:dpt.step",
                    "x-parser-schema-id": "<anonymous-schema-345>"
                  },
                  "function_ref": {
                    "type": "string",
                    "format": "uuid",
                    "x-parser-schema-id": "<anonymous-schema-346>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-341>"
              },
              {
                "type": "object",
                "title": "Blinds Stop Trigger",
                "required": [
                  "id",
                  "type",
                  "title",
                  "datapoint_type",
                  "function_ref"
                ],
                "properties": {
                  "id": {
                    "type": "string",
                    "format": "uuid",
                    "x-parser-schema-id": "<anonymous-schema-348>"
                  },
                  "type": {
                    "const": "mac#BlindsStopTrigger",
                    "x-parser-schema-id": "<anonymous-schema-349>"
                  },
                  "title": {
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-350>"
                  },
                  "datapoint_type": {
                    "const": "urn:knx:dpt.trigger",
                    "x-parser-schema-id": "<anonymous-schema-351>"
                  },
                  "function_ref": {
                    "type": "string",
                    "format": "uuid",
                    "x-parser-schema-id": "<anonymous-schema-352>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-347>"
              },
              {
                "type": "object",
                "title": "Current Date",
                "required": [
                  "id",
                  "type",
                  "title",
                  "datapoint_type",
                  "function_ref"
                ],
                "properties": {
                  "id": {
                    "type": "string",
                    "format": "uuid",
                    "x-parser-schema-id": "<anonymous-schema-354>"
                  },
                  "type": {
                    "const": "mac#CurrentDate",
                    "x-parser-schema-id": "<anonymous-schema-355>"
                  },
                  "title": {
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-356>"
                  },
                  "datapoint_type": {
                    "const": "urn:knx:dpt.date",
                    "x-parser-schema-id": "<anonymous-schema-357>"
                  },
                  "function_ref": {
                    "type": "string",
                    "format": "uuid",
                    "x-parser-schema-id": "<anonymous-schema-358>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-353>"
              },
              {
                "type": "object",
                "title": "Current Date and Time",
                "required": [
                  "id",
                  "type",
                  "title",
                  "datapoint_type",
                  "function_ref"
                ],
                "properties": {
                  "id": {
                    "type": "string",
                    "format": "uuid",
                    "x-parser-schema-id": "<anonymous-schema-360>"
                  },
                  "type": {
                    "const": "mac#CurrentDateAndTime",
                    "x-parser-schema-id": "<anonymous-schema-361>"
                  },
                  "title": {
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-362>"
                  },
                  "datapoint_type": {
                    "const": "urn:knx:dpt.dateTime",
                    "x-parser-schema-id": "<anonymous-schema-363>"
                  },
                  "function_ref": {
                    "type": "string",
                    "format": "uuid",
                    "x-parser-schema-id": "<anonymous-schema-364>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-359>"
              },
              {
                "type": "object",
                "title": "Current Time",
                "required": [
                  "id",
                  "type",
                  "title",
                  "datapoint_type",
                  "function_ref"
                ],
                "properties": {
                  "id": {
                    "type": "string",
                    "format": "uuid",
                    "x-parser-schema-id": "<anonymous-schema-366>"
                  },
                  "type": {
                    "const": "mac#CurrentTime",
                    "x-parser-schema-id": "<anonymous-schema-367>"
                  },
                  "title": {
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-368>"
                  },
                  "datapoint_type": {
                    "const": "urn:knx:dpt.timeOfDay",
                    "x-parser-schema-id": "<anonymous-schema-369>"
                  },
                  "function_ref": {
                    "type": "string",
                    "format": "uuid",
                    "x-parser-schema-id": "<anonymous-schema-370>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-365>"
              },
              {
                "type": "object",
                "title": "Frost Alarm",
                "required": [
                  "id",
                  "type",
                  "title",
                  "datapoint_type",
                  "function_ref"
                ],
                "properties": {
                  "id": {
                    "type": "string",
                    "format": "uuid",
                    "x-parser-schema-id": "<anonymous-schema-372>"
                  },
                  "type": {
                    "const": "mac#FrostAlarm",
                    "x-parser-schema-id": "<anonymous-schema-373>"
                  },
                  "title": {
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-374>"
                  },
                  "datapoint_type": {
                    "const": "urn:knx:dpt.alarm",
                    "x-parser-schema-id": "<anonymous-schema-375>"
                  },
                  "function_ref": {
                    "type": "string",
                    "format": "uuid",
                    "x-parser-schema-id": "<anonymous-schema-376>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-371>"
              },
              {
                "type": "object",
                "title": "Light Absolute Setvalue Request",
                "required": [
                  "id",
                  "type",
                  "title",
                  "datapoint_type",
                  "function_ref"
                ],
                "properties": {
                  "id": {
                    "type": "string",
                    "format": "uuid",
                    "x-parser-schema-id": "<anonymous-schema-378>"
                  },
                  "type": {
                    "const": "mac#LightAbsoluteSetvalueRequest",
                    "x-parser-schema-id": "<anonymous-schema-379>"
                  },
                  "title": {
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-380>"
                  },
                  "datapoint_type": {
                    "const": "urn:knx:dpt.scaling",
                    "x-parser-schema-id": "<anonymous-schema-381>"
                  },
                  "function_ref": {
                    "type": "string",
                    "format": "uuid",
                    "x-parser-schema-id": "<anonymous-schema-382>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-377>"
              },
              {
                "type": "object",
                "title": "Light Current Dimming Value",
                "required": [
                  "id",
                  "type",
                  "title",
                  "datapoint_type",
                  "function_ref"
                ],
                "properties": {
                  "id": {
                    "type": "string",
                    "format": "uuid",
                    "x-parser-schema-id": "<anonymous-schema-384>"
                  },
                  "type": {
                    "const": "mac#LightCurrentDimmingValue",
                    "x-parser-schema-id": "<anonymous-schema-385>"
                  },
                  "title": {
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-386>"
                  },
                  "datapoint_type": {
                    "const": "urn:knx:dpt.scaling",
                    "x-parser-schema-id": "<anonymous-schema-387>"
                  },
                  "function_ref": {
                    "type": "string",
                    "format": "uuid",
                    "x-parser-schema-id": "<anonymous-schema-388>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-383>"
              },
              {
                "type": "object",
                "title": "Light Current Status",
                "required": [
                  "id",
                  "type",
                  "title",
                  "datapoint_type",
                  "function_ref"
                ],
                "properties": {
                  "id": {
                    "type": "string",
                    "format": "uuid",
                    "x-parser-schema-id": "<anonymous-schema-390>"
                  },
                  "type": {
                    "const": "mac#LightCurrentStatus",
                    "x-parser-schema-id": "<anonymous-schema-391>"
                  },
                  "title": {
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-392>"
                  },
                  "datapoint_type": {
                    "const": "urn:knx:dpt.switch",
                    "x-parser-schema-id": "<anonymous-schema-393>"
                  },
                  "function_ref": {
                    "type": "string",
                    "format": "uuid",
                    "x-parser-schema-id": "<anonymous-schema-394>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-389>"
              },
              {
                "type": "object",
                "title": "Light Relative Dimming Request",
                "required": [
                  "id",
                  "type",
                  "title",
                  "datapoint_type",
                  "function_ref"
                ],
                "properties": {
                  "id": {
                    "type": "string",
                    "format": "uuid",
                    "x-parser-schema-id": "<anonymous-schema-396>"
                  },
                  "type": {
                    "const": "mac#LightRelativeDimmingRequest",
                    "x-parser-schema-id": "<anonymous-schema-397>"
                  },
                  "title": {
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-398>"
                  },
                  "datapoint_type": {
                    "const": "urn:knx:dpt.controlDimming",
                    "x-parser-schema-id": "<anonymous-schema-399>"
                  },
                  "function_ref": {
                    "type": "string",
                    "format": "uuid",
                    "x-parser-schema-id": "<anonymous-schema-400>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-395>"
              },
              {
                "type": "object",
                "title": "Light Switch Request",
                "required": [
                  "id",
                  "type",
                  "title",
                  "datapoint_type",
                  "function_ref"
                ],
                "properties": {
                  "id": {
                    "type": "string",
                    "format": "uuid",
                    "x-parser-schema-id": "<anonymous-schema-402>"
                  },
                  "type": {
                    "const": "mac#LightSwitchRequest",
                    "x-parser-schema-id": "<anonymous-schema-403>"
                  },
                  "title": {
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-404>"
                  },
                  "datapoint_type": {
                    "const": "urn:knx:dpt.switch",
                    "x-parser-schema-id": "<anonymous-schema-405>"
                  },
                  "function_ref": {
                    "type": "string",
                    "format": "uuid",
                    "x-parser-schema-id": "<anonymous-schema-406>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-401>"
              },
              {
                "type": "object",
                "title": "Rain Alarm",
                "required": [
                  "id",
                  "type",
                  "title",
                  "datapoint_type",
                  "function_ref"
                ],
                "properties": {
                  "id": {
                    "type": "string",
                    "format": "uuid",
                    "x-parser-schema-id": "<anonymous-schema-408>"
                  },
                  "type": {
                    "const": "mac#RainAlarm",
                    "x-parser-schema-id": "<anonymous-schema-409>"
                  },
                  "title": {
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-410>"
                  },
                  "datapoint_type": {
                    "const": "urn:knx:dpt.alarm",
                    "x-parser-schema-id": "<anonymous-schema-411>"
                  },
                  "function_ref": {
                    "type": "string",
                    "format": "uuid",
                    "x-parser-schema-id": "<anonymous-schema-412>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-407>"
              },
              {
                "type": "object",
                "title": "Relation to GMT",
                "required": [
                  "id",
                  "type",
                  "title",
                  "datapoint_type",
                  "function_ref"
                ],
                "properties": {
                  "id": {
                    "type": "string",
                    "format": "uuid",
                    "x-parser-schema-id": "<anonymous-schema-414>"
                  },
                  "type": {
                    "const": "mac#RelationToGMT",
                    "x-parser-schema-id": "<anonymous-schema-415>"
                  },
                  "title": {
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-416>"
                  },
                  "datapoint_type": {
                    "const": "urn:knx:dpt.deltaTimeMin",
                    "x-parser-schema-id": "<anonymous-schema-417>"
                  },
                  "function_ref": {
                    "type": "string",
                    "format": "uuid",
                    "x-parser-schema-id": "<anonymous-schema-418>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-413>"
              },
              {
                "type": "object",
                "title": "Shutter Move Up Down",
                "required": [
                  "id",
                  "type",
                  "title",
                  "datapoint_type",
                  "function_ref"
                ],
                "properties": {
                  "id": {
                    "type": "string",
                    "format": "uuid",
                    "x-parser-schema-id": "<anonymous-schema-420>"
                  },
                  "type": {
                    "const": "mac#ShutterMoveUpDown",
                    "x-parser-schema-id": "<anonymous-schema-421>"
                  },
                  "title": {
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-422>"
                  },
                  "datapoint_type": {
                    "const": "urn:knx:dpt.upDown",
                    "x-parser-schema-id": "<anonymous-schema-423>"
                  },
                  "function_ref": {
                    "type": "string",
                    "format": "uuid",
                    "x-parser-schema-id": "<anonymous-schema-424>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-419>"
              },
              {
                "type": "object",
                "title": "Shutter Position Length",
                "required": [
                  "id",
                  "type",
                  "title",
                  "datapoint_type",
                  "function_ref"
                ],
                "properties": {
                  "id": {
                    "type": "string",
                    "format": "uuid",
                    "x-parser-schema-id": "<anonymous-schema-426>"
                  },
                  "type": {
                    "const": "mac#ShutterPositionLength",
                    "x-parser-schema-id": "<anonymous-schema-427>"
                  },
                  "title": {
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-428>"
                  },
                  "datapoint_type": {
                    "const": "urn:knx:dpt.lengthmm",
                    "x-parser-schema-id": "<anonymous-schema-429>"
                  },
                  "function_ref": {
                    "type": "string",
                    "format": "uuid",
                    "x-parser-schema-id": "<anonymous-schema-430>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-425>"
              },
              {
                "type": "object",
                "title": "Shutter Position Percentage",
                "required": [
                  "id",
                  "type",
                  "title",
                  "datapoint_type",
                  "function_ref"
                ],
                "properties": {
                  "id": {
                    "type": "string",
                    "format": "uuid",
                    "x-parser-schema-id": "<anonymous-schema-432>"
                  },
                  "type": {
                    "const": "mac#ShutterPositionPercentage",
                    "x-parser-schema-id": "<anonymous-schema-433>"
                  },
                  "title": {
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-434>"
                  },
                  "datapoint_type": {
                    "const": "urn:knx:dpt.scaling",
                    "x-parser-schema-id": "<anonymous-schema-435>"
                  },
                  "function_ref": {
                    "type": "string",
                    "format": "uuid",
                    "x-parser-schema-id": "<anonymous-schema-436>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-431>"
              },
              {
                "type": "object",
                "title": "Shutter Status",
                "required": [
                  "id",
                  "type",
                  "title",
                  "datapoint_type",
                  "function_ref"
                ],
                "properties": {
                  "id": {
                    "type": "string",
                    "format": "uuid",
                    "x-parser-schema-id": "<anonymous-schema-438>"
                  },
                  "type": {
                    "const": "mac#ShutterStatus",
                    "x-parser-schema-id": "<anonymous-schema-439>"
                  },
                  "title": {
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-440>"
                  },
                  "datapoint_type": {
                    "const": "urn:knx:dpt.upDown",
                    "x-parser-schema-id": "<anonymous-schema-441>"
                  },
                  "function_ref": {
                    "type": "string",
                    "format": "uuid",
                    "x-parser-schema-id": "<anonymous-schema-442>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-437>"
              },
              {
                "type": "object",
                "title": "Shutter Stop Step",
                "required": [
                  "id",
                  "type",
                  "title",
                  "datapoint_type",
                  "function_ref"
                ],
                "properties": {
                  "id": {
                    "type": "string",
                    "format": "uuid",
                    "x-parser-schema-id": "<anonymous-schema-444>"
                  },
                  "type": {
                    "const": "mac#ShutterStopStep",
                    "x-parser-schema-id": "<anonymous-schema-445>"
                  },
                  "title": {
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-446>"
                  },
                  "datapoint_type": {
                    "const": "urn:knx:dpt.step",
                    "x-parser-schema-id": "<anonymous-schema-447>"
                  },
                  "function_ref": {
                    "type": "string",
                    "format": "uuid",
                    "x-parser-schema-id": "<anonymous-schema-448>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-443>"
              },
              {
                "type": "object",
                "title": "Shutter Stop Trigger",
                "required": [
                  "id",
                  "type",
                  "title",
                  "datapoint_type",
                  "function_ref"
                ],
                "properties": {
                  "id": {
                    "type": "string",
                    "format": "uuid",
                    "x-parser-schema-id": "<anonymous-schema-450>"
                  },
                  "type": {
                    "const": "mac#ShutterStopTrigger",
                    "x-parser-schema-id": "<anonymous-schema-451>"
                  },
                  "title": {
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-452>"
                  },
                  "datapoint_type": {
                    "const": "urn:knx:dpt.trigger",
                    "x-parser-schema-id": "<anonymous-schema-453>"
                  },
                  "function_ref": {
                    "type": "string",
                    "format": "uuid",
                    "x-parser-schema-id": "<anonymous-schema-454>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-449>"
              },
              {
                "type": "object",
                "title": "Wind Alarm",
                "required": [
                  "id",
                  "type",
                  "title",
                  "datapoint_type",
                  "function_ref"
                ],
                "properties": {
                  "id": {
                    "type": "string",
                    "format": "uuid",
                    "x-parser-schema-id": "<anonymous-schema-456>"
                  },
                  "type": {
                    "const": "mac#WindAlarm",
                    "x-parser-schema-id": "<anonymous-schema-457>"
                  },
                  "title": {
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-458>"
                  },
                  "datapoint_type": {
                    "const": "urn:knx:dpt.alarm",
                    "x-parser-schema-id": "<anonymous-schema-459>"
                  },
                  "function_ref": {
                    "type": "string",
                    "format": "uuid",
                    "x-parser-schema-id": "<anonymous-schema-460>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-455>"
              }
            ],
            "x-parser-schema-id": "<anonymous-schema-304>"
          },
          "x-parser-unique-object-id": "functionpoint instance",
          "x-parser-message-name": "functionpoint instance"
        }
      },
      "description": "TODO:description",
      "x-parser-unique-object-id": "functionpoint-resp"
    },
    "locations-req": {
      "address": "locations/req/all",
      "title": "Locations Request",
      "messages": {
        "filtered locations req": {
          "payload": {
            "type": "object",
            "properties": {
              "foo": {
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-462>"
              }
            },
            "required": [
              "foo"
            ],
            "additionalProperties": false,
            "x-parser-schema-id": "<anonymous-schema-461>"
          },
          "x-parser-unique-object-id": "filtered locations req",
          "x-parser-message-name": "filtered locations req"
        }
      },
      "description": "TODO:description",
      "x-parser-unique-object-id": "locations-req"
    },
    "locations-resp": {
      "address": "locations/resp/all",
      "title": "Locations Response",
      "messages": {
        "all location instances": {
          "payload": {
            "type": "array",
            "items": {
              "title": "Location",
              "oneOf": [
                {
                  "title": "Site",
                  "allOf": [
                    {
                      "type": "object",
                      "title": "Abstract Base Location",
                      "properties": {
                        "id": {
                          "type": "string",
                          "format": "uuid",
                          "x-parser-schema-id": "<anonymous-schema-467>"
                        },
                        "name": {
                          "type": "string",
                          "x-parser-schema-id": "<anonymous-schema-468>"
                        },
                        "number": {
                          "type": "number",
                          "x-parser-schema-id": "<anonymous-schema-469>"
                        },
                        "adjacent_locations": {
                          "type": "array",
                          "items": {
                            "type": "string",
                            "format": "uuid",
                            "x-parser-schema-id": "<anonymous-schema-471>"
                          },
                          "x-parser-schema-id": "<anonymous-schema-470>"
                        },
                        "application_functions": {
                          "type": "array",
                          "items": {
                            "type": "string",
                            "format": "uuid",
                            "x-parser-schema-id": "<anonymous-schema-473>"
                          },
                          "x-parser-schema-id": "<anonymous-schema-472>"
                        },
                        "locations": {
                          "type": "array",
                          "items": {
                            "type": "string",
                            "format": "uuid",
                            "x-parser-schema-id": "<anonymous-schema-475>"
                          },
                          "x-parser-schema-id": "<anonymous-schema-474>"
                        },
                        "outsides": {
                          "type": "array",
                          "items": {
                            "type": "string",
                            "format": "uuid",
                            "x-parser-schema-id": "<anonymous-schema-477>"
                          },
                          "x-parser-schema-id": "<anonymous-schema-476>"
                        },
                        "equipments": {
                          "type": "array",
                          "items": {
                            "type": "string",
                            "format": "uuid",
                            "x-parser-schema-id": "<anonymous-schema-479>"
                          },
                          "x-parser-schema-id": "<anonymous-schema-478>"
                        },
                        "location_usage": {
                          "description": "TODO this should be tag#LocationUsage-enum",
                          "type": "string",
                          "x-parser-schema-id": "<anonymous-schema-480>"
                        }
                      },
                      "required": [
                        "id",
                        "name"
                      ],
                      "x-parser-schema-id": "<anonymous-schema-466>"
                    },
                    {
                      "type": "object",
                      "title": "Site Definition",
                      "properties": {
                        "type": {
                          "const": "urn:knx:loc.site",
                          "x-parser-schema-id": "<anonymous-schema-482>"
                        },
                        "buildings": {
                          "type": "array",
                          "items": {
                            "type": "string",
                            "format": "uuid",
                            "x-parser-schema-id": "<anonymous-schema-484>"
                          },
                          "x-parser-schema-id": "<anonymous-schema-483>"
                        },
                        "siteSegments": {
                          "type": "array",
                          "items": {
                            "type": "string",
                            "format": "uuid",
                            "x-parser-schema-id": "<anonymous-schema-486>"
                          },
                          "x-parser-schema-id": "<anonymous-schema-485>"
                        }
                      },
                      "x-parser-schema-id": "<anonymous-schema-481>"
                    }
                  ],
                  "x-parser-schema-id": "<anonymous-schema-465>"
                },
                {
                  "title": "Building",
                  "allOf": [
                    {
                      "type": "object",
                      "title": "Abstract Base Location",
                      "properties": {
                        "id": {
                          "type": "string",
                          "format": "uuid",
                          "x-parser-schema-id": "<anonymous-schema-489>"
                        },
                        "name": {
                          "type": "string",
                          "x-parser-schema-id": "<anonymous-schema-490>"
                        },
                        "number": {
                          "type": "number",
                          "x-parser-schema-id": "<anonymous-schema-491>"
                        },
                        "adjacent_locations": {
                          "type": "array",
                          "items": {
                            "type": "string",
                            "format": "uuid",
                            "x-parser-schema-id": "<anonymous-schema-493>"
                          },
                          "x-parser-schema-id": "<anonymous-schema-492>"
                        },
                        "application_functions": {
                          "type": "array",
                          "items": {
                            "type": "string",
                            "format": "uuid",
                            "x-parser-schema-id": "<anonymous-schema-495>"
                          },
                          "x-parser-schema-id": "<anonymous-schema-494>"
                        },
                        "locations": {
                          "type": "array",
                          "items": {
                            "type": "string",
                            "format": "uuid",
                            "x-parser-schema-id": "<anonymous-schema-497>"
                          },
                          "x-parser-schema-id": "<anonymous-schema-496>"
                        },
                        "outsides": {
                          "type": "array",
                          "items": {
                            "type": "string",
                            "format": "uuid",
                            "x-parser-schema-id": "<anonymous-schema-499>"
                          },
                          "x-parser-schema-id": "<anonymous-schema-498>"
                        },
                        "equipments": {
                          "type": "array",
                          "items": {
                            "type": "string",
                            "format": "uuid",
                            "x-parser-schema-id": "<anonymous-schema-501>"
                          },
                          "x-parser-schema-id": "<anonymous-schema-500>"
                        },
                        "location_usage": {
                          "description": "TODO this should be tag#LocationUsage-enum",
                          "type": "string",
                          "x-parser-schema-id": "<anonymous-schema-502>"
                        }
                      },
                      "required": [
                        "id",
                        "name"
                      ],
                      "x-parser-schema-id": "<anonymous-schema-488>"
                    },
                    {
                      "type": "object",
                      "title": "Building Definition",
                      "properties": {
                        "type": {
                          "const": "urn:knx:loc.building",
                          "x-parser-schema-id": "<anonymous-schema-504>"
                        },
                        "floors": {
                          "type": "array",
                          "items": {
                            "type": "string",
                            "format": "uuid",
                            "x-parser-schema-id": "<anonymous-schema-506>"
                          },
                          "x-parser-schema-id": "<anonymous-schema-505>"
                        },
                        "rooms": {
                          "type": "array",
                          "items": {
                            "type": "string",
                            "format": "uuid",
                            "x-parser-schema-id": "<anonymous-schema-508>"
                          },
                          "x-parser-schema-id": "<anonymous-schema-507>"
                        },
                        "address": {
                          "type": "string",
                          "x-parser-schema-id": "<anonymous-schema-509>"
                        },
                        "spaces": {
                          "type": "array",
                          "items": {
                            "type": "string",
                            "format": "uuid",
                            "x-parser-schema-id": "<anonymous-schema-511>"
                          },
                          "x-parser-schema-id": "<anonymous-schema-510>"
                        }
                      },
                      "additionalProperties": false,
                      "x-parser-schema-id": "<anonymous-schema-503>"
                    }
                  ],
                  "x-parser-schema-id": "<anonymous-schema-487>"
                },
                {
                  "title": "Floor",
                  "allOf": [
                    {
                      "type": "object",
                      "title": "Abstract Base Location",
                      "properties": {
                        "id": {
                          "type": "string",
                          "format": "uuid",
                          "x-parser-schema-id": "<anonymous-schema-514>"
                        },
                        "name": {
                          "type": "string",
                          "x-parser-schema-id": "<anonymous-schema-515>"
                        },
                        "number": {
                          "type": "number",
                          "x-parser-schema-id": "<anonymous-schema-516>"
                        },
                        "adjacent_locations": {
                          "type": "array",
                          "items": {
                            "type": "string",
                            "format": "uuid",
                            "x-parser-schema-id": "<anonymous-schema-518>"
                          },
                          "x-parser-schema-id": "<anonymous-schema-517>"
                        },
                        "application_functions": {
                          "type": "array",
                          "items": {
                            "type": "string",
                            "format": "uuid",
                            "x-parser-schema-id": "<anonymous-schema-520>"
                          },
                          "x-parser-schema-id": "<anonymous-schema-519>"
                        },
                        "locations": {
                          "type": "array",
                          "items": {
                            "type": "string",
                            "format": "uuid",
                            "x-parser-schema-id": "<anonymous-schema-522>"
                          },
                          "x-parser-schema-id": "<anonymous-schema-521>"
                        },
                        "outsides": {
                          "type": "array",
                          "items": {
                            "type": "string",
                            "format": "uuid",
                            "x-parser-schema-id": "<anonymous-schema-524>"
                          },
                          "x-parser-schema-id": "<anonymous-schema-523>"
                        },
                        "equipments": {
                          "type": "array",
                          "items": {
                            "type": "string",
                            "format": "uuid",
                            "x-parser-schema-id": "<anonymous-schema-526>"
                          },
                          "x-parser-schema-id": "<anonymous-schema-525>"
                        },
                        "location_usage": {
                          "description": "TODO this should be tag#LocationUsage-enum",
                          "type": "string",
                          "x-parser-schema-id": "<anonymous-schema-527>"
                        }
                      },
                      "required": [
                        "id",
                        "name"
                      ],
                      "x-parser-schema-id": "<anonymous-schema-513>"
                    },
                    {
                      "type": "object",
                      "title": "Floor Definition",
                      "properties": {
                        "type": {
                          "const": "urn:knx:loc.floor",
                          "x-parser-schema-id": "<anonymous-schema-529>"
                        },
                        "lower_floor": {
                          "type": "string",
                          "format": "uuid",
                          "x-parser-schema-id": "<anonymous-schema-530>"
                        },
                        "upper_floor": {
                          "type": "string",
                          "format": "uuid",
                          "x-parser-schema-id": "<anonymous-schema-531>"
                        },
                        "rooms": {
                          "type": "array",
                          "items": {
                            "type": "string",
                            "format": "uuid",
                            "x-parser-schema-id": "<anonymous-schema-533>"
                          },
                          "x-parser-schema-id": "<anonymous-schema-532>"
                        },
                        "spaces": {
                          "type": "array",
                          "items": {
                            "type": "string",
                            "format": "uuid",
                            "x-parser-schema-id": "<anonymous-schema-535>"
                          },
                          "x-parser-schema-id": "<anonymous-schema-534>"
                        }
                      },
                      "x-parser-schema-id": "<anonymous-schema-528>"
                    }
                  ],
                  "x-parser-schema-id": "<anonymous-schema-512>"
                },
                {
                  "title": "Room",
                  "allOf": [
                    {
                      "title": "Abstract Space",
                      "allOf": [
                        {
                          "type": "object",
                          "title": "Abstract Base Location",
                          "properties": {
                            "id": {
                              "type": "string",
                              "format": "uuid",
                              "x-parser-schema-id": "<anonymous-schema-539>"
                            },
                            "name": {
                              "type": "string",
                              "x-parser-schema-id": "<anonymous-schema-540>"
                            },
                            "number": {
                              "type": "number",
                              "x-parser-schema-id": "<anonymous-schema-541>"
                            },
                            "adjacent_locations": {
                              "type": "array",
                              "items": {
                                "type": "string",
                                "format": "uuid",
                                "x-parser-schema-id": "<anonymous-schema-543>"
                              },
                              "x-parser-schema-id": "<anonymous-schema-542>"
                            },
                            "application_functions": {
                              "type": "array",
                              "items": {
                                "type": "string",
                                "format": "uuid",
                                "x-parser-schema-id": "<anonymous-schema-545>"
                              },
                              "x-parser-schema-id": "<anonymous-schema-544>"
                            },
                            "locations": {
                              "type": "array",
                              "items": {
                                "type": "string",
                                "format": "uuid",
                                "x-parser-schema-id": "<anonymous-schema-547>"
                              },
                              "x-parser-schema-id": "<anonymous-schema-546>"
                            },
                            "outsides": {
                              "type": "array",
                              "items": {
                                "type": "string",
                                "format": "uuid",
                                "x-parser-schema-id": "<anonymous-schema-549>"
                              },
                              "x-parser-schema-id": "<anonymous-schema-548>"
                            },
                            "equipments": {
                              "type": "array",
                              "items": {
                                "type": "string",
                                "format": "uuid",
                                "x-parser-schema-id": "<anonymous-schema-551>"
                              },
                              "x-parser-schema-id": "<anonymous-schema-550>"
                            },
                            "location_usage": {
                              "description": "TODO this should be tag#LocationUsage-enum",
                              "type": "string",
                              "x-parser-schema-id": "<anonymous-schema-552>"
                            }
                          },
                          "required": [
                            "id",
                            "name"
                          ],
                          "x-parser-schema-id": "<anonymous-schema-538>"
                        },
                        {
                          "type": "object",
                          "title": "Space Definition",
                          "properties": {
                            "floor": {
                              "type": "string",
                              "format": "uuid",
                              "x-parser-schema-id": "<anonymous-schema-554>"
                            },
                            "rooms": {
                              "type": "array",
                              "items": {
                                "type": "string",
                                "format": "uuid",
                                "x-parser-schema-id": "<anonymous-schema-556>"
                              },
                              "x-parser-schema-id": "<anonymous-schema-555>"
                            },
                            "spaces": {
                              "type": "array",
                              "items": {
                                "type": "string",
                                "format": "uuid",
                                "x-parser-schema-id": "<anonymous-schema-558>"
                              },
                              "x-parser-schema-id": "<anonymous-schema-557>"
                            }
                          },
                          "x-parser-schema-id": "<anonymous-schema-553>"
                        }
                      ],
                      "x-parser-schema-id": "<anonymous-schema-537>"
                    },
                    {
                      "type": "object",
                      "title": "Room Definition",
                      "properties": {
                        "type": {
                          "const": "urn:knx:loc.room",
                          "x-parser-schema-id": "<anonymous-schema-560>"
                        },
                        "room_segments": {
                          "type": "array",
                          "items": {
                            "type": "string",
                            "format": "uuid",
                            "x-parser-schema-id": "<anonymous-schema-562>"
                          },
                          "x-parser-schema-id": "<anonymous-schema-561>"
                        }
                      },
                      "x-parser-schema-id": "<anonymous-schema-559>"
                    }
                  ],
                  "x-parser-schema-id": "<anonymous-schema-536>"
                },
                {
                  "title": "Room Segment",
                  "allOf": [
                    {
                      "title": "Abstract Space",
                      "allOf": [
                        {
                          "type": "object",
                          "title": "Abstract Base Location",
                          "properties": {
                            "id": {
                              "type": "string",
                              "format": "uuid",
                              "x-parser-schema-id": "<anonymous-schema-566>"
                            },
                            "name": {
                              "type": "string",
                              "x-parser-schema-id": "<anonymous-schema-567>"
                            },
                            "number": {
                              "type": "number",
                              "x-parser-schema-id": "<anonymous-schema-568>"
                            },
                            "adjacent_locations": {
                              "type": "array",
                              "items": {
                                "type": "string",
                                "format": "uuid",
                                "x-parser-schema-id": "<anonymous-schema-570>"
                              },
                              "x-parser-schema-id": "<anonymous-schema-569>"
                            },
                            "application_functions": {
                              "type": "array",
                              "items": {
                                "type": "string",
                                "format": "uuid",
                                "x-parser-schema-id": "<anonymous-schema-572>"
                              },
                              "x-parser-schema-id": "<anonymous-schema-571>"
                            },
                            "locations": {
                              "type": "array",
                              "items": {
                                "type": "string",
                                "format": "uuid",
                                "x-parser-schema-id": "<anonymous-schema-574>"
                              },
                              "x-parser-schema-id": "<anonymous-schema-573>"
                            },
                            "outsides": {
                              "type": "array",
                              "items": {
                                "type": "string",
                                "format": "uuid",
                                "x-parser-schema-id": "<anonymous-schema-576>"
                              },
                              "x-parser-schema-id": "<anonymous-schema-575>"
                            },
                            "equipments": {
                              "type": "array",
                              "items": {
                                "type": "string",
                                "format": "uuid",
                                "x-parser-schema-id": "<anonymous-schema-578>"
                              },
                              "x-parser-schema-id": "<anonymous-schema-577>"
                            },
                            "location_usage": {
                              "description": "TODO this should be tag#LocationUsage-enum",
                              "type": "string",
                              "x-parser-schema-id": "<anonymous-schema-579>"
                            }
                          },
                          "required": [
                            "id",
                            "name"
                          ],
                          "x-parser-schema-id": "<anonymous-schema-565>"
                        },
                        {
                          "type": "object",
                          "title": "Space Definition",
                          "properties": {
                            "floor": {
                              "type": "string",
                              "format": "uuid",
                              "x-parser-schema-id": "<anonymous-schema-581>"
                            },
                            "rooms": {
                              "type": "array",
                              "items": {
                                "type": "string",
                                "format": "uuid",
                                "x-parser-schema-id": "<anonymous-schema-583>"
                              },
                              "x-parser-schema-id": "<anonymous-schema-582>"
                            },
                            "spaces": {
                              "type": "array",
                              "items": {
                                "type": "string",
                                "format": "uuid",
                                "x-parser-schema-id": "<anonymous-schema-585>"
                              },
                              "x-parser-schema-id": "<anonymous-schema-584>"
                            }
                          },
                          "x-parser-schema-id": "<anonymous-schema-580>"
                        }
                      ],
                      "x-parser-schema-id": "<anonymous-schema-564>"
                    },
                    {
                      "type": "object",
                      "title": "Room Segment Definition",
                      "properties": {
                        "type": {
                          "const": "urn:knx:loc.roomsegment",
                          "x-parser-schema-id": "<anonymous-schema-587>"
                        },
                        "roomSegments": {
                          "type": "array",
                          "items": {
                            "type": "string",
                            "format": "uuid",
                            "x-parser-schema-id": "<anonymous-schema-589>"
                          },
                          "x-parser-schema-id": "<anonymous-schema-588>"
                        }
                      },
                      "x-parser-schema-id": "<anonymous-schema-586>"
                    }
                  ],
                  "x-parser-schema-id": "<anonymous-schema-563>"
                },
                {
                  "title": "Site Segment",
                  "allOf": [
                    {
                      "type": "object",
                      "title": "Abstract Base Location",
                      "properties": {
                        "id": {
                          "type": "string",
                          "format": "uuid",
                          "x-parser-schema-id": "<anonymous-schema-592>"
                        },
                        "name": {
                          "type": "string",
                          "x-parser-schema-id": "<anonymous-schema-593>"
                        },
                        "number": {
                          "type": "number",
                          "x-parser-schema-id": "<anonymous-schema-594>"
                        },
                        "adjacent_locations": {
                          "type": "array",
                          "items": {
                            "type": "string",
                            "format": "uuid",
                            "x-parser-schema-id": "<anonymous-schema-596>"
                          },
                          "x-parser-schema-id": "<anonymous-schema-595>"
                        },
                        "application_functions": {
                          "type": "array",
                          "items": {
                            "type": "string",
                            "format": "uuid",
                            "x-parser-schema-id": "<anonymous-schema-598>"
                          },
                          "x-parser-schema-id": "<anonymous-schema-597>"
                        },
                        "locations": {
                          "type": "array",
                          "items": {
                            "type": "string",
                            "format": "uuid",
                            "x-parser-schema-id": "<anonymous-schema-600>"
                          },
                          "x-parser-schema-id": "<anonymous-schema-599>"
                        },
                        "outsides": {
                          "type": "array",
                          "items": {
                            "type": "string",
                            "format": "uuid",
                            "x-parser-schema-id": "<anonymous-schema-602>"
                          },
                          "x-parser-schema-id": "<anonymous-schema-601>"
                        },
                        "equipments": {
                          "type": "array",
                          "items": {
                            "type": "string",
                            "format": "uuid",
                            "x-parser-schema-id": "<anonymous-schema-604>"
                          },
                          "x-parser-schema-id": "<anonymous-schema-603>"
                        },
                        "location_usage": {
                          "description": "TODO this should be tag#LocationUsage-enum",
                          "type": "string",
                          "x-parser-schema-id": "<anonymous-schema-605>"
                        }
                      },
                      "required": [
                        "id",
                        "name"
                      ],
                      "x-parser-schema-id": "<anonymous-schema-591>"
                    },
                    {
                      "type": "object",
                      "title": "Site Segment Definition",
                      "properties": {
                        "type": {
                          "const": "urn:knx:loc.sitesegment",
                          "x-parser-schema-id": "<anonymous-schema-607>"
                        },
                        "buildings": {
                          "type": "array",
                          "items": {
                            "type": "string",
                            "format": "uuid",
                            "x-parser-schema-id": "<anonymous-schema-609>"
                          },
                          "x-parser-schema-id": "<anonymous-schema-608>"
                        },
                        "siteSegments": {
                          "type": "array",
                          "items": {
                            "type": "string",
                            "format": "uuid",
                            "x-parser-schema-id": "<anonymous-schema-611>"
                          },
                          "x-parser-schema-id": "<anonymous-schema-610>"
                        }
                      },
                      "x-parser-schema-id": "<anonymous-schema-606>"
                    }
                  ],
                  "x-parser-schema-id": "<anonymous-schema-590>"
                },
                {
                  "title": "Outside",
                  "allOf": [
                    {
                      "type": "object",
                      "title": "Abstract Base Location",
                      "properties": {
                        "id": {
                          "type": "string",
                          "format": "uuid",
                          "x-parser-schema-id": "<anonymous-schema-614>"
                        },
                        "name": {
                          "type": "string",
                          "x-parser-schema-id": "<anonymous-schema-615>"
                        },
                        "number": {
                          "type": "number",
                          "x-parser-schema-id": "<anonymous-schema-616>"
                        },
                        "adjacent_locations": {
                          "type": "array",
                          "items": {
                            "type": "string",
                            "format": "uuid",
                            "x-parser-schema-id": "<anonymous-schema-618>"
                          },
                          "x-parser-schema-id": "<anonymous-schema-617>"
                        },
                        "application_functions": {
                          "type": "array",
                          "items": {
                            "type": "string",
                            "format": "uuid",
                            "x-parser-schema-id": "<anonymous-schema-620>"
                          },
                          "x-parser-schema-id": "<anonymous-schema-619>"
                        },
                        "locations": {
                          "type": "array",
                          "items": {
                            "type": "string",
                            "format": "uuid",
                            "x-parser-schema-id": "<anonymous-schema-622>"
                          },
                          "x-parser-schema-id": "<anonymous-schema-621>"
                        },
                        "outsides": {
                          "type": "array",
                          "items": {
                            "type": "string",
                            "format": "uuid",
                            "x-parser-schema-id": "<anonymous-schema-624>"
                          },
                          "x-parser-schema-id": "<anonymous-schema-623>"
                        },
                        "equipments": {
                          "type": "array",
                          "items": {
                            "type": "string",
                            "format": "uuid",
                            "x-parser-schema-id": "<anonymous-schema-626>"
                          },
                          "x-parser-schema-id": "<anonymous-schema-625>"
                        },
                        "location_usage": {
                          "description": "TODO this should be tag#LocationUsage-enum",
                          "type": "string",
                          "x-parser-schema-id": "<anonymous-schema-627>"
                        }
                      },
                      "required": [
                        "id",
                        "name"
                      ],
                      "x-parser-schema-id": "<anonymous-schema-613>"
                    },
                    {
                      "type": "object",
                      "title": "Outside Definition",
                      "properties": {
                        "type": {
                          "const": "urn:knx:loc.outside",
                          "x-parser-schema-id": "<anonymous-schema-629>"
                        }
                      },
                      "x-parser-schema-id": "<anonymous-schema-628>"
                    }
                  ],
                  "x-parser-schema-id": "<anonymous-schema-612>"
                }
              ],
              "x-parser-schema-id": "<anonymous-schema-464>"
            },
            "x-parser-schema-id": "<anonymous-schema-463>"
          },
          "x-parser-unique-object-id": "all location instances",
          "x-parser-message-name": "all location instances"
        }
      },
      "description": "TODO:description",
      "x-parser-unique-object-id": "locations-resp"
    },
    "location-req": {
      "address": "location/req/{instance_id}",
      "parameters": {
        "instance_id": {
          "description": "ID of the instance",
          "x-format": "uuid"
        }
      },
      "title": "Location Request",
      "messages": {
        "empty": {
          "payload": {
            "type": "object",
            "additionalProperties": false,
            "x-parser-schema-id": "<anonymous-schema-631>"
          },
          "x-parser-unique-object-id": "empty",
          "x-parser-message-name": "empty"
        }
      },
      "description": "TODO:description",
      "x-parser-unique-object-id": "location-req"
    },
    "location-resp": {
      "address": "location/resp/{instance_id}",
      "parameters": {
        "instance_id": {
          "description": "ID of the instance",
          "x-format": "uuid"
        }
      },
      "title": "Location Response",
      "messages": {
        "location instance": {
          "payload": {
            "title": "Location",
            "oneOf": [
              {
                "title": "Site",
                "allOf": [
                  {
                    "type": "object",
                    "title": "Abstract Base Location",
                    "properties": {
                      "id": {
                        "type": "string",
                        "format": "uuid",
                        "x-parser-schema-id": "<anonymous-schema-636>"
                      },
                      "name": {
                        "type": "string",
                        "x-parser-schema-id": "<anonymous-schema-637>"
                      },
                      "number": {
                        "type": "number",
                        "x-parser-schema-id": "<anonymous-schema-638>"
                      },
                      "adjacent_locations": {
                        "type": "array",
                        "items": {
                          "type": "string",
                          "format": "uuid",
                          "x-parser-schema-id": "<anonymous-schema-640>"
                        },
                        "x-parser-schema-id": "<anonymous-schema-639>"
                      },
                      "application_functions": {
                        "type": "array",
                        "items": {
                          "type": "string",
                          "format": "uuid",
                          "x-parser-schema-id": "<anonymous-schema-642>"
                        },
                        "x-parser-schema-id": "<anonymous-schema-641>"
                      },
                      "locations": {
                        "type": "array",
                        "items": {
                          "type": "string",
                          "format": "uuid",
                          "x-parser-schema-id": "<anonymous-schema-644>"
                        },
                        "x-parser-schema-id": "<anonymous-schema-643>"
                      },
                      "outsides": {
                        "type": "array",
                        "items": {
                          "type": "string",
                          "format": "uuid",
                          "x-parser-schema-id": "<anonymous-schema-646>"
                        },
                        "x-parser-schema-id": "<anonymous-schema-645>"
                      },
                      "equipments": {
                        "type": "array",
                        "items": {
                          "type": "string",
                          "format": "uuid",
                          "x-parser-schema-id": "<anonymous-schema-648>"
                        },
                        "x-parser-schema-id": "<anonymous-schema-647>"
                      },
                      "location_usage": {
                        "description": "TODO this should be tag#LocationUsage-enum",
                        "type": "string",
                        "x-parser-schema-id": "<anonymous-schema-649>"
                      }
                    },
                    "required": [
                      "id",
                      "name"
                    ],
                    "x-parser-schema-id": "<anonymous-schema-635>"
                  },
                  {
                    "type": "object",
                    "title": "Site Definition",
                    "properties": {
                      "type": {
                        "const": "urn:knx:loc.site",
                        "x-parser-schema-id": "<anonymous-schema-651>"
                      },
                      "buildings": {
                        "type": "array",
                        "items": {
                          "type": "string",
                          "format": "uuid",
                          "x-parser-schema-id": "<anonymous-schema-653>"
                        },
                        "x-parser-schema-id": "<anonymous-schema-652>"
                      },
                      "siteSegments": {
                        "type": "array",
                        "items": {
                          "type": "string",
                          "format": "uuid",
                          "x-parser-schema-id": "<anonymous-schema-655>"
                        },
                        "x-parser-schema-id": "<anonymous-schema-654>"
                      }
                    },
                    "x-parser-schema-id": "<anonymous-schema-650>"
                  }
                ],
                "x-parser-schema-id": "<anonymous-schema-634>"
              },
              {
                "title": "Building",
                "allOf": [
                  {
                    "type": "object",
                    "title": "Abstract Base Location",
                    "properties": {
                      "id": {
                        "type": "string",
                        "format": "uuid",
                        "x-parser-schema-id": "<anonymous-schema-658>"
                      },
                      "name": {
                        "type": "string",
                        "x-parser-schema-id": "<anonymous-schema-659>"
                      },
                      "number": {
                        "type": "number",
                        "x-parser-schema-id": "<anonymous-schema-660>"
                      },
                      "adjacent_locations": {
                        "type": "array",
                        "items": {
                          "type": "string",
                          "format": "uuid",
                          "x-parser-schema-id": "<anonymous-schema-662>"
                        },
                        "x-parser-schema-id": "<anonymous-schema-661>"
                      },
                      "application_functions": {
                        "type": "array",
                        "items": {
                          "type": "string",
                          "format": "uuid",
                          "x-parser-schema-id": "<anonymous-schema-664>"
                        },
                        "x-parser-schema-id": "<anonymous-schema-663>"
                      },
                      "locations": {
                        "type": "array",
                        "items": {
                          "type": "string",
                          "format": "uuid",
                          "x-parser-schema-id": "<anonymous-schema-666>"
                        },
                        "x-parser-schema-id": "<anonymous-schema-665>"
                      },
                      "outsides": {
                        "type": "array",
                        "items": {
                          "type": "string",
                          "format": "uuid",
                          "x-parser-schema-id": "<anonymous-schema-668>"
                        },
                        "x-parser-schema-id": "<anonymous-schema-667>"
                      },
                      "equipments": {
                        "type": "array",
                        "items": {
                          "type": "string",
                          "format": "uuid",
                          "x-parser-schema-id": "<anonymous-schema-670>"
                        },
                        "x-parser-schema-id": "<anonymous-schema-669>"
                      },
                      "location_usage": {
                        "description": "TODO this should be tag#LocationUsage-enum",
                        "type": "string",
                        "x-parser-schema-id": "<anonymous-schema-671>"
                      }
                    },
                    "required": [
                      "id",
                      "name"
                    ],
                    "x-parser-schema-id": "<anonymous-schema-657>"
                  },
                  {
                    "type": "object",
                    "title": "Building Definition",
                    "properties": {
                      "type": {
                        "const": "urn:knx:loc.building",
                        "x-parser-schema-id": "<anonymous-schema-673>"
                      },
                      "floors": {
                        "type": "array",
                        "items": {
                          "type": "string",
                          "format": "uuid",
                          "x-parser-schema-id": "<anonymous-schema-675>"
                        },
                        "x-parser-schema-id": "<anonymous-schema-674>"
                      },
                      "rooms": {
                        "type": "array",
                        "items": {
                          "type": "string",
                          "format": "uuid",
                          "x-parser-schema-id": "<anonymous-schema-677>"
                        },
                        "x-parser-schema-id": "<anonymous-schema-676>"
                      },
                      "address": {
                        "type": "string",
                        "x-parser-schema-id": "<anonymous-schema-678>"
                      },
                      "spaces": {
                        "type": "array",
                        "items": {
                          "type": "string",
                          "format": "uuid",
                          "x-parser-schema-id": "<anonymous-schema-680>"
                        },
                        "x-parser-schema-id": "<anonymous-schema-679>"
                      }
                    },
                    "additionalProperties": false,
                    "x-parser-schema-id": "<anonymous-schema-672>"
                  }
                ],
                "x-parser-schema-id": "<anonymous-schema-656>"
              },
              {
                "title": "Floor",
                "allOf": [
                  {
                    "type": "object",
                    "title": "Abstract Base Location",
                    "properties": {
                      "id": {
                        "type": "string",
                        "format": "uuid",
                        "x-parser-schema-id": "<anonymous-schema-683>"
                      },
                      "name": {
                        "type": "string",
                        "x-parser-schema-id": "<anonymous-schema-684>"
                      },
                      "number": {
                        "type": "number",
                        "x-parser-schema-id": "<anonymous-schema-685>"
                      },
                      "adjacent_locations": {
                        "type": "array",
                        "items": {
                          "type": "string",
                          "format": "uuid",
                          "x-parser-schema-id": "<anonymous-schema-687>"
                        },
                        "x-parser-schema-id": "<anonymous-schema-686>"
                      },
                      "application_functions": {
                        "type": "array",
                        "items": {
                          "type": "string",
                          "format": "uuid",
                          "x-parser-schema-id": "<anonymous-schema-689>"
                        },
                        "x-parser-schema-id": "<anonymous-schema-688>"
                      },
                      "locations": {
                        "type": "array",
                        "items": {
                          "type": "string",
                          "format": "uuid",
                          "x-parser-schema-id": "<anonymous-schema-691>"
                        },
                        "x-parser-schema-id": "<anonymous-schema-690>"
                      },
                      "outsides": {
                        "type": "array",
                        "items": {
                          "type": "string",
                          "format": "uuid",
                          "x-parser-schema-id": "<anonymous-schema-693>"
                        },
                        "x-parser-schema-id": "<anonymous-schema-692>"
                      },
                      "equipments": {
                        "type": "array",
                        "items": {
                          "type": "string",
                          "format": "uuid",
                          "x-parser-schema-id": "<anonymous-schema-695>"
                        },
                        "x-parser-schema-id": "<anonymous-schema-694>"
                      },
                      "location_usage": {
                        "description": "TODO this should be tag#LocationUsage-enum",
                        "type": "string",
                        "x-parser-schema-id": "<anonymous-schema-696>"
                      }
                    },
                    "required": [
                      "id",
                      "name"
                    ],
                    "x-parser-schema-id": "<anonymous-schema-682>"
                  },
                  {
                    "type": "object",
                    "title": "Floor Definition",
                    "properties": {
                      "type": {
                        "const": "urn:knx:loc.floor",
                        "x-parser-schema-id": "<anonymous-schema-698>"
                      },
                      "lower_floor": {
                        "type": "string",
                        "format": "uuid",
                        "x-parser-schema-id": "<anonymous-schema-699>"
                      },
                      "upper_floor": {
                        "type": "string",
                        "format": "uuid",
                        "x-parser-schema-id": "<anonymous-schema-700>"
                      },
                      "rooms": {
                        "type": "array",
                        "items": {
                          "type": "string",
                          "format": "uuid",
                          "x-parser-schema-id": "<anonymous-schema-702>"
                        },
                        "x-parser-schema-id": "<anonymous-schema-701>"
                      },
                      "spaces": {
                        "type": "array",
                        "items": {
                          "type": "string",
                          "format": "uuid",
                          "x-parser-schema-id": "<anonymous-schema-704>"
                        },
                        "x-parser-schema-id": "<anonymous-schema-703>"
                      }
                    },
                    "x-parser-schema-id": "<anonymous-schema-697>"
                  }
                ],
                "x-parser-schema-id": "<anonymous-schema-681>"
              },
              {
                "title": "Room",
                "allOf": [
                  {
                    "title": "Abstract Space",
                    "allOf": [
                      {
                        "type": "object",
                        "title": "Abstract Base Location",
                        "properties": {
                          "id": {
                            "type": "string",
                            "format": "uuid",
                            "x-parser-schema-id": "<anonymous-schema-708>"
                          },
                          "name": {
                            "type": "string",
                            "x-parser-schema-id": "<anonymous-schema-709>"
                          },
                          "number": {
                            "type": "number",
                            "x-parser-schema-id": "<anonymous-schema-710>"
                          },
                          "adjacent_locations": {
                            "type": "array",
                            "items": {
                              "type": "string",
                              "format": "uuid",
                              "x-parser-schema-id": "<anonymous-schema-712>"
                            },
                            "x-parser-schema-id": "<anonymous-schema-711>"
                          },
                          "application_functions": {
                            "type": "array",
                            "items": {
                              "type": "string",
                              "format": "uuid",
                              "x-parser-schema-id": "<anonymous-schema-714>"
                            },
                            "x-parser-schema-id": "<anonymous-schema-713>"
                          },
                          "locations": {
                            "type": "array",
                            "items": {
                              "type": "string",
                              "format": "uuid",
                              "x-parser-schema-id": "<anonymous-schema-716>"
                            },
                            "x-parser-schema-id": "<anonymous-schema-715>"
                          },
                          "outsides": {
                            "type": "array",
                            "items": {
                              "type": "string",
                              "format": "uuid",
                              "x-parser-schema-id": "<anonymous-schema-718>"
                            },
                            "x-parser-schema-id": "<anonymous-schema-717>"
                          },
                          "equipments": {
                            "type": "array",
                            "items": {
                              "type": "string",
                              "format": "uuid",
                              "x-parser-schema-id": "<anonymous-schema-720>"
                            },
                            "x-parser-schema-id": "<anonymous-schema-719>"
                          },
                          "location_usage": {
                            "description": "TODO this should be tag#LocationUsage-enum",
                            "type": "string",
                            "x-parser-schema-id": "<anonymous-schema-721>"
                          }
                        },
                        "required": [
                          "id",
                          "name"
                        ],
                        "x-parser-schema-id": "<anonymous-schema-707>"
                      },
                      {
                        "type": "object",
                        "title": "Space Definition",
                        "properties": {
                          "floor": {
                            "type": "string",
                            "format": "uuid",
                            "x-parser-schema-id": "<anonymous-schema-723>"
                          },
                          "rooms": {
                            "type": "array",
                            "items": {
                              "type": "string",
                              "format": "uuid",
                              "x-parser-schema-id": "<anonymous-schema-725>"
                            },
                            "x-parser-schema-id": "<anonymous-schema-724>"
                          },
                          "spaces": {
                            "type": "array",
                            "items": {
                              "type": "string",
                              "format": "uuid",
                              "x-parser-schema-id": "<anonymous-schema-727>"
                            },
                            "x-parser-schema-id": "<anonymous-schema-726>"
                          }
                        },
                        "x-parser-schema-id": "<anonymous-schema-722>"
                      }
                    ],
                    "x-parser-schema-id": "<anonymous-schema-706>"
                  },
                  {
                    "type": "object",
                    "title": "Room Definition",
                    "properties": {
                      "type": {
                        "const": "urn:knx:loc.room",
                        "x-parser-schema-id": "<anonymous-schema-729>"
                      },
                      "room_segments": {
                        "type": "array",
                        "items": {
                          "type": "string",
                          "format": "uuid",
                          "x-parser-schema-id": "<anonymous-schema-731>"
                        },
                        "x-parser-schema-id": "<anonymous-schema-730>"
                      }
                    },
                    "x-parser-schema-id": "<anonymous-schema-728>"
                  }
                ],
                "x-parser-schema-id": "<anonymous-schema-705>"
              },
              {
                "title": "Room Segment",
                "allOf": [
                  {
                    "title": "Abstract Space",
                    "allOf": [
                      {
                        "type": "object",
                        "title": "Abstract Base Location",
                        "properties": {
                          "id": {
                            "type": "string",
                            "format": "uuid",
                            "x-parser-schema-id": "<anonymous-schema-735>"
                          },
                          "name": {
                            "type": "string",
                            "x-parser-schema-id": "<anonymous-schema-736>"
                          },
                          "number": {
                            "type": "number",
                            "x-parser-schema-id": "<anonymous-schema-737>"
                          },
                          "adjacent_locations": {
                            "type": "array",
                            "items": {
                              "type": "string",
                              "format": "uuid",
                              "x-parser-schema-id": "<anonymous-schema-739>"
                            },
                            "x-parser-schema-id": "<anonymous-schema-738>"
                          },
                          "application_functions": {
                            "type": "array",
                            "items": {
                              "type": "string",
                              "format": "uuid",
                              "x-parser-schema-id": "<anonymous-schema-741>"
                            },
                            "x-parser-schema-id": "<anonymous-schema-740>"
                          },
                          "locations": {
                            "type": "array",
                            "items": {
                              "type": "string",
                              "format": "uuid",
                              "x-parser-schema-id": "<anonymous-schema-743>"
                            },
                            "x-parser-schema-id": "<anonymous-schema-742>"
                          },
                          "outsides": {
                            "type": "array",
                            "items": {
                              "type": "string",
                              "format": "uuid",
                              "x-parser-schema-id": "<anonymous-schema-745>"
                            },
                            "x-parser-schema-id": "<anonymous-schema-744>"
                          },
                          "equipments": {
                            "type": "array",
                            "items": {
                              "type": "string",
                              "format": "uuid",
                              "x-parser-schema-id": "<anonymous-schema-747>"
                            },
                            "x-parser-schema-id": "<anonymous-schema-746>"
                          },
                          "location_usage": {
                            "description": "TODO this should be tag#LocationUsage-enum",
                            "type": "string",
                            "x-parser-schema-id": "<anonymous-schema-748>"
                          }
                        },
                        "required": [
                          "id",
                          "name"
                        ],
                        "x-parser-schema-id": "<anonymous-schema-734>"
                      },
                      {
                        "type": "object",
                        "title": "Space Definition",
                        "properties": {
                          "floor": {
                            "type": "string",
                            "format": "uuid",
                            "x-parser-schema-id": "<anonymous-schema-750>"
                          },
                          "rooms": {
                            "type": "array",
                            "items": {
                              "type": "string",
                              "format": "uuid",
                              "x-parser-schema-id": "<anonymous-schema-752>"
                            },
                            "x-parser-schema-id": "<anonymous-schema-751>"
                          },
                          "spaces": {
                            "type": "array",
                            "items": {
                              "type": "string",
                              "format": "uuid",
                              "x-parser-schema-id": "<anonymous-schema-754>"
                            },
                            "x-parser-schema-id": "<anonymous-schema-753>"
                          }
                        },
                        "x-parser-schema-id": "<anonymous-schema-749>"
                      }
                    ],
                    "x-parser-schema-id": "<anonymous-schema-733>"
                  },
                  {
                    "type": "object",
                    "title": "Room Segment Definition",
                    "properties": {
                      "type": {
                        "const": "urn:knx:loc.roomsegment",
                        "x-parser-schema-id": "<anonymous-schema-756>"
                      },
                      "roomSegments": {
                        "type": "array",
                        "items": {
                          "type": "string",
                          "format": "uuid",
                          "x-parser-schema-id": "<anonymous-schema-758>"
                        },
                        "x-parser-schema-id": "<anonymous-schema-757>"
                      }
                    },
                    "x-parser-schema-id": "<anonymous-schema-755>"
                  }
                ],
                "x-parser-schema-id": "<anonymous-schema-732>"
              },
              {
                "title": "Site Segment",
                "allOf": [
                  {
                    "type": "object",
                    "title": "Abstract Base Location",
                    "properties": {
                      "id": {
                        "type": "string",
                        "format": "uuid",
                        "x-parser-schema-id": "<anonymous-schema-761>"
                      },
                      "name": {
                        "type": "string",
                        "x-parser-schema-id": "<anonymous-schema-762>"
                      },
                      "number": {
                        "type": "number",
                        "x-parser-schema-id": "<anonymous-schema-763>"
                      },
                      "adjacent_locations": {
                        "type": "array",
                        "items": {
                          "type": "string",
                          "format": "uuid",
                          "x-parser-schema-id": "<anonymous-schema-765>"
                        },
                        "x-parser-schema-id": "<anonymous-schema-764>"
                      },
                      "application_functions": {
                        "type": "array",
                        "items": {
                          "type": "string",
                          "format": "uuid",
                          "x-parser-schema-id": "<anonymous-schema-767>"
                        },
                        "x-parser-schema-id": "<anonymous-schema-766>"
                      },
                      "locations": {
                        "type": "array",
                        "items": {
                          "type": "string",
                          "format": "uuid",
                          "x-parser-schema-id": "<anonymous-schema-769>"
                        },
                        "x-parser-schema-id": "<anonymous-schema-768>"
                      },
                      "outsides": {
                        "type": "array",
                        "items": {
                          "type": "string",
                          "format": "uuid",
                          "x-parser-schema-id": "<anonymous-schema-771>"
                        },
                        "x-parser-schema-id": "<anonymous-schema-770>"
                      },
                      "equipments": {
                        "type": "array",
                        "items": {
                          "type": "string",
                          "format": "uuid",
                          "x-parser-schema-id": "<anonymous-schema-773>"
                        },
                        "x-parser-schema-id": "<anonymous-schema-772>"
                      },
                      "location_usage": {
                        "description": "TODO this should be tag#LocationUsage-enum",
                        "type": "string",
                        "x-parser-schema-id": "<anonymous-schema-774>"
                      }
                    },
                    "required": [
                      "id",
                      "name"
                    ],
                    "x-parser-schema-id": "<anonymous-schema-760>"
                  },
                  {
                    "type": "object",
                    "title": "Site Segment Definition",
                    "properties": {
                      "type": {
                        "const": "urn:knx:loc.sitesegment",
                        "x-parser-schema-id": "<anonymous-schema-776>"
                      },
                      "buildings": {
                        "type": "array",
                        "items": {
                          "type": "string",
                          "format": "uuid",
                          "x-parser-schema-id": "<anonymous-schema-778>"
                        },
                        "x-parser-schema-id": "<anonymous-schema-777>"
                      },
                      "siteSegments": {
                        "type": "array",
                        "items": {
                          "type": "string",
                          "format": "uuid",
                          "x-parser-schema-id": "<anonymous-schema-780>"
                        },
                        "x-parser-schema-id": "<anonymous-schema-779>"
                      }
                    },
                    "x-parser-schema-id": "<anonymous-schema-775>"
                  }
                ],
                "x-parser-schema-id": "<anonymous-schema-759>"
              },
              {
                "title": "Outside",
                "allOf": [
                  {
                    "type": "object",
                    "title": "Abstract Base Location",
                    "properties": {
                      "id": {
                        "type": "string",
                        "format": "uuid",
                        "x-parser-schema-id": "<anonymous-schema-783>"
                      },
                      "name": {
                        "type": "string",
                        "x-parser-schema-id": "<anonymous-schema-784>"
                      },
                      "number": {
                        "type": "number",
                        "x-parser-schema-id": "<anonymous-schema-785>"
                      },
                      "adjacent_locations": {
                        "type": "array",
                        "items": {
                          "type": "string",
                          "format": "uuid",
                          "x-parser-schema-id": "<anonymous-schema-787>"
                        },
                        "x-parser-schema-id": "<anonymous-schema-786>"
                      },
                      "application_functions": {
                        "type": "array",
                        "items": {
                          "type": "string",
                          "format": "uuid",
                          "x-parser-schema-id": "<anonymous-schema-789>"
                        },
                        "x-parser-schema-id": "<anonymous-schema-788>"
                      },
                      "locations": {
                        "type": "array",
                        "items": {
                          "type": "string",
                          "format": "uuid",
                          "x-parser-schema-id": "<anonymous-schema-791>"
                        },
                        "x-parser-schema-id": "<anonymous-schema-790>"
                      },
                      "outsides": {
                        "type": "array",
                        "items": {
                          "type": "string",
                          "format": "uuid",
                          "x-parser-schema-id": "<anonymous-schema-793>"
                        },
                        "x-parser-schema-id": "<anonymous-schema-792>"
                      },
                      "equipments": {
                        "type": "array",
                        "items": {
                          "type": "string",
                          "format": "uuid",
                          "x-parser-schema-id": "<anonymous-schema-795>"
                        },
                        "x-parser-schema-id": "<anonymous-schema-794>"
                      },
                      "location_usage": {
                        "description": "TODO this should be tag#LocationUsage-enum",
                        "type": "string",
                        "x-parser-schema-id": "<anonymous-schema-796>"
                      }
                    },
                    "required": [
                      "id",
                      "name"
                    ],
                    "x-parser-schema-id": "<anonymous-schema-782>"
                  },
                  {
                    "type": "object",
                    "title": "Outside Definition",
                    "properties": {
                      "type": {
                        "const": "urn:knx:loc.outside",
                        "x-parser-schema-id": "<anonymous-schema-798>"
                      }
                    },
                    "x-parser-schema-id": "<anonymous-schema-797>"
                  }
                ],
                "x-parser-schema-id": "<anonymous-schema-781>"
              }
            ],
            "x-parser-schema-id": "<anonymous-schema-633>"
          },
          "x-parser-unique-object-id": "location instance",
          "x-parser-message-name": "location instance"
        }
      },
      "description": "TODO:description",
      "x-parser-unique-object-id": "location-resp"
    },
    "functionpoint-write-req": {
      "address": "functionpoint-write/req/{instance_id}",
      "parameters": {
        "instance_id": {
          "description": "ID of the instance",
          "x-format": "uuid"
        }
      },
      "title": "Functionpoint Write Request",
      "messages": {
        "functionpoint write": {
          "payload": {
            "oneOf": [
              {
                "type": "object",
                "title": "write: Blinds Move Up Down",
                "required": [
                  "datapoint_type",
                  "id",
                  "type",
                  "value"
                ],
                "properties": {
                  "datapoint_type": {
                    "const": "urn:knx:dpt.upDown",
                    "x-parser-schema-id": "<anonymous-schema-802>"
                  },
                  "id": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-803>"
                  },
                  "type": {
                    "const": "mac#BlindsMoveUpDown",
                    "x-parser-schema-id": "<anonymous-schema-804>"
                  },
                  "value": {
                    "enum": [
                      "off",
                      "on"
                    ],
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-805>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-801>"
              },
              {
                "type": "object",
                "title": "write: Blinds Position Length",
                "required": [
                  "datapoint_type",
                  "id",
                  "type",
                  "value"
                ],
                "properties": {
                  "datapoint_type": {
                    "const": "urn:knx:dpt.lengthmm",
                    "x-parser-schema-id": "<anonymous-schema-807>"
                  },
                  "id": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-808>"
                  },
                  "type": {
                    "const": "mac#BlindsPositionLength",
                    "x-parser-schema-id": "<anonymous-schema-809>"
                  },
                  "value": {
                    "enum": [
                      "off",
                      "on"
                    ],
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-810>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-806>"
              },
              {
                "type": "object",
                "title": "write: Blinds Position Percentage",
                "required": [
                  "datapoint_type",
                  "id",
                  "type",
                  "value"
                ],
                "properties": {
                  "datapoint_type": {
                    "const": "urn:knx:dpt.scaling",
                    "x-parser-schema-id": "<anonymous-schema-812>"
                  },
                  "id": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-813>"
                  },
                  "type": {
                    "const": "mac#BlindsPositionPercentage",
                    "x-parser-schema-id": "<anonymous-schema-814>"
                  },
                  "value": {
                    "enum": [
                      "off",
                      "on"
                    ],
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-815>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-811>"
              },
              {
                "type": "object",
                "title": "write: Blinds Slat Position Degrees",
                "required": [
                  "datapoint_type",
                  "id",
                  "type",
                  "value"
                ],
                "properties": {
                  "datapoint_type": {
                    "const": "urn:knx:dpt.rotationAngle",
                    "x-parser-schema-id": "<anonymous-schema-817>"
                  },
                  "id": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-818>"
                  },
                  "type": {
                    "const": "mac#BlindsSlatPositionDegrees",
                    "x-parser-schema-id": "<anonymous-schema-819>"
                  },
                  "value": {
                    "enum": [
                      "off",
                      "on"
                    ],
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-820>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-816>"
              },
              {
                "type": "object",
                "title": "write: Blinds Slat Position Percentage",
                "required": [
                  "datapoint_type",
                  "id",
                  "type",
                  "value"
                ],
                "properties": {
                  "datapoint_type": {
                    "const": "urn:knx:dpt.scaling",
                    "x-parser-schema-id": "<anonymous-schema-822>"
                  },
                  "id": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-823>"
                  },
                  "type": {
                    "const": "mac#BlindsSlatPositionPercentage",
                    "x-parser-schema-id": "<anonymous-schema-824>"
                  },
                  "value": {
                    "enum": [
                      "off",
                      "on"
                    ],
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-825>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-821>"
              },
              {
                "type": "object",
                "title": "write: Blinds Status",
                "required": [
                  "datapoint_type",
                  "id",
                  "type",
                  "value"
                ],
                "properties": {
                  "datapoint_type": {
                    "const": "urn:knx:dpt.upDown",
                    "x-parser-schema-id": "<anonymous-schema-827>"
                  },
                  "id": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-828>"
                  },
                  "type": {
                    "const": "mac#BlindsStatus",
                    "x-parser-schema-id": "<anonymous-schema-829>"
                  },
                  "value": {
                    "enum": [
                      "off",
                      "on"
                    ],
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-830>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-826>"
              },
              {
                "type": "object",
                "title": "write: Blinds Stop Step",
                "required": [
                  "datapoint_type",
                  "id",
                  "type",
                  "value"
                ],
                "properties": {
                  "datapoint_type": {
                    "const": "urn:knx:dpt.step",
                    "x-parser-schema-id": "<anonymous-schema-832>"
                  },
                  "id": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-833>"
                  },
                  "type": {
                    "const": "mac#BlindsStopStep",
                    "x-parser-schema-id": "<anonymous-schema-834>"
                  },
                  "value": {
                    "enum": [
                      "off",
                      "on"
                    ],
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-835>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-831>"
              },
              {
                "type": "object",
                "title": "write: Blinds Stop Trigger",
                "required": [
                  "datapoint_type",
                  "id",
                  "type",
                  "value"
                ],
                "properties": {
                  "datapoint_type": {
                    "const": "urn:knx:dpt.trigger",
                    "x-parser-schema-id": "<anonymous-schema-837>"
                  },
                  "id": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-838>"
                  },
                  "type": {
                    "const": "mac#BlindsStopTrigger",
                    "x-parser-schema-id": "<anonymous-schema-839>"
                  },
                  "value": {
                    "enum": [
                      "off",
                      "on"
                    ],
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-840>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-836>"
              },
              {
                "type": "object",
                "title": "write: Current Date",
                "required": [
                  "datapoint_type",
                  "id",
                  "type",
                  "value"
                ],
                "properties": {
                  "datapoint_type": {
                    "const": "urn:knx:dpt.date",
                    "x-parser-schema-id": "<anonymous-schema-842>"
                  },
                  "id": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-843>"
                  },
                  "type": {
                    "const": "mac#CurrentDate",
                    "x-parser-schema-id": "<anonymous-schema-844>"
                  },
                  "value": {
                    "enum": [
                      "off",
                      "on"
                    ],
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-845>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-841>"
              },
              {
                "type": "object",
                "title": "write: Current Date and Time",
                "required": [
                  "datapoint_type",
                  "id",
                  "type",
                  "value"
                ],
                "properties": {
                  "datapoint_type": {
                    "const": "urn:knx:dpt.dateTime",
                    "x-parser-schema-id": "<anonymous-schema-847>"
                  },
                  "id": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-848>"
                  },
                  "type": {
                    "const": "mac#CurrentDateAndTime",
                    "x-parser-schema-id": "<anonymous-schema-849>"
                  },
                  "value": {
                    "enum": [
                      "off",
                      "on"
                    ],
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-850>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-846>"
              },
              {
                "type": "object",
                "title": "write: Current Time",
                "required": [
                  "datapoint_type",
                  "id",
                  "type",
                  "value"
                ],
                "properties": {
                  "datapoint_type": {
                    "const": "urn:knx:dpt.timeOfDay",
                    "x-parser-schema-id": "<anonymous-schema-852>"
                  },
                  "id": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-853>"
                  },
                  "type": {
                    "const": "mac#CurrentTime",
                    "x-parser-schema-id": "<anonymous-schema-854>"
                  },
                  "value": {
                    "enum": [
                      "off",
                      "on"
                    ],
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-855>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-851>"
              },
              {
                "type": "object",
                "title": "write: Frost Alarm",
                "required": [
                  "datapoint_type",
                  "id",
                  "type",
                  "value"
                ],
                "properties": {
                  "datapoint_type": {
                    "const": "urn:knx:dpt.alarm",
                    "x-parser-schema-id": "<anonymous-schema-857>"
                  },
                  "id": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-858>"
                  },
                  "type": {
                    "const": "mac#FrostAlarm",
                    "x-parser-schema-id": "<anonymous-schema-859>"
                  },
                  "value": {
                    "enum": [
                      "off",
                      "on"
                    ],
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-860>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-856>"
              },
              {
                "type": "object",
                "title": "write: Light Absolute Setvalue Request",
                "required": [
                  "datapoint_type",
                  "id",
                  "type",
                  "value"
                ],
                "properties": {
                  "datapoint_type": {
                    "const": "urn:knx:dpt.scaling",
                    "x-parser-schema-id": "<anonymous-schema-862>"
                  },
                  "id": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-863>"
                  },
                  "type": {
                    "const": "mac#LightAbsoluteSetvalueRequest",
                    "x-parser-schema-id": "<anonymous-schema-864>"
                  },
                  "value": {
                    "enum": [
                      "off",
                      "on"
                    ],
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-865>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-861>"
              },
              {
                "type": "object",
                "title": "write: Light Current Dimming Value",
                "required": [
                  "datapoint_type",
                  "id",
                  "type",
                  "value"
                ],
                "properties": {
                  "datapoint_type": {
                    "const": "urn:knx:dpt.scaling",
                    "x-parser-schema-id": "<anonymous-schema-867>"
                  },
                  "id": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-868>"
                  },
                  "type": {
                    "const": "mac#LightCurrentDimmingValue",
                    "x-parser-schema-id": "<anonymous-schema-869>"
                  },
                  "value": {
                    "enum": [
                      "off",
                      "on"
                    ],
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-870>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-866>"
              },
              {
                "type": "object",
                "title": "write: Light Current Status",
                "required": [
                  "datapoint_type",
                  "id",
                  "type",
                  "value"
                ],
                "properties": {
                  "datapoint_type": {
                    "const": "urn:knx:dpt.switch",
                    "x-parser-schema-id": "<anonymous-schema-872>"
                  },
                  "id": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-873>"
                  },
                  "type": {
                    "const": "mac#LightCurrentStatus",
                    "x-parser-schema-id": "<anonymous-schema-874>"
                  },
                  "value": {
                    "enum": [
                      "off",
                      "on"
                    ],
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-875>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-871>"
              },
              {
                "type": "object",
                "title": "write: Light Relative Dimming Request",
                "required": [
                  "datapoint_type",
                  "id",
                  "type",
                  "value"
                ],
                "properties": {
                  "datapoint_type": {
                    "const": "urn:knx:dpt.controlDimming",
                    "x-parser-schema-id": "<anonymous-schema-877>"
                  },
                  "id": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-878>"
                  },
                  "type": {
                    "const": "mac#LightRelativeDimmingRequest",
                    "x-parser-schema-id": "<anonymous-schema-879>"
                  },
                  "value": {
                    "enum": [
                      "off",
                      "on"
                    ],
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-880>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-876>"
              },
              {
                "type": "object",
                "title": "write: Light Switch Request",
                "required": [
                  "datapoint_type",
                  "id",
                  "type",
                  "value"
                ],
                "properties": {
                  "datapoint_type": {
                    "const": "urn:knx:dpt.switch",
                    "x-parser-schema-id": "<anonymous-schema-882>"
                  },
                  "id": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-883>"
                  },
                  "type": {
                    "const": "mac#LightSwitchRequest",
                    "x-parser-schema-id": "<anonymous-schema-884>"
                  },
                  "value": {
                    "enum": [
                      "off",
                      "on"
                    ],
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-885>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-881>"
              },
              {
                "type": "object",
                "title": "write: Rain Alarm",
                "required": [
                  "datapoint_type",
                  "id",
                  "type",
                  "value"
                ],
                "properties": {
                  "datapoint_type": {
                    "const": "urn:knx:dpt.alarm",
                    "x-parser-schema-id": "<anonymous-schema-887>"
                  },
                  "id": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-888>"
                  },
                  "type": {
                    "const": "mac#RainAlarm",
                    "x-parser-schema-id": "<anonymous-schema-889>"
                  },
                  "value": {
                    "enum": [
                      "off",
                      "on"
                    ],
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-890>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-886>"
              },
              {
                "type": "object",
                "title": "write: Relation to GMT",
                "required": [
                  "datapoint_type",
                  "id",
                  "type",
                  "value"
                ],
                "properties": {
                  "datapoint_type": {
                    "const": "urn:knx:dpt.deltaTimeMin",
                    "x-parser-schema-id": "<anonymous-schema-892>"
                  },
                  "id": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-893>"
                  },
                  "type": {
                    "const": "mac#RelationToGMT",
                    "x-parser-schema-id": "<anonymous-schema-894>"
                  },
                  "value": {
                    "enum": [
                      "off",
                      "on"
                    ],
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-895>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-891>"
              },
              {
                "type": "object",
                "title": "write: Shutter Move Up Down",
                "required": [
                  "datapoint_type",
                  "id",
                  "type",
                  "value"
                ],
                "properties": {
                  "datapoint_type": {
                    "const": "urn:knx:dpt.upDown",
                    "x-parser-schema-id": "<anonymous-schema-897>"
                  },
                  "id": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-898>"
                  },
                  "type": {
                    "const": "mac#ShutterMoveUpDown",
                    "x-parser-schema-id": "<anonymous-schema-899>"
                  },
                  "value": {
                    "enum": [
                      "off",
                      "on"
                    ],
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-900>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-896>"
              },
              {
                "type": "object",
                "title": "write: Shutter Position Length",
                "required": [
                  "datapoint_type",
                  "id",
                  "type",
                  "value"
                ],
                "properties": {
                  "datapoint_type": {
                    "const": "urn:knx:dpt.lengthmm",
                    "x-parser-schema-id": "<anonymous-schema-902>"
                  },
                  "id": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-903>"
                  },
                  "type": {
                    "const": "mac#ShutterPositionLength",
                    "x-parser-schema-id": "<anonymous-schema-904>"
                  },
                  "value": {
                    "enum": [
                      "off",
                      "on"
                    ],
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-905>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-901>"
              },
              {
                "type": "object",
                "title": "write: Shutter Position Percentage",
                "required": [
                  "datapoint_type",
                  "id",
                  "type",
                  "value"
                ],
                "properties": {
                  "datapoint_type": {
                    "const": "urn:knx:dpt.scaling",
                    "x-parser-schema-id": "<anonymous-schema-907>"
                  },
                  "id": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-908>"
                  },
                  "type": {
                    "const": "mac#ShutterPositionPercentage",
                    "x-parser-schema-id": "<anonymous-schema-909>"
                  },
                  "value": {
                    "enum": [
                      "off",
                      "on"
                    ],
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-910>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-906>"
              },
              {
                "type": "object",
                "title": "write: Shutter Status",
                "required": [
                  "datapoint_type",
                  "id",
                  "type",
                  "value"
                ],
                "properties": {
                  "datapoint_type": {
                    "const": "urn:knx:dpt.upDown",
                    "x-parser-schema-id": "<anonymous-schema-912>"
                  },
                  "id": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-913>"
                  },
                  "type": {
                    "const": "mac#ShutterStatus",
                    "x-parser-schema-id": "<anonymous-schema-914>"
                  },
                  "value": {
                    "enum": [
                      "off",
                      "on"
                    ],
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-915>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-911>"
              },
              {
                "type": "object",
                "title": "write: Shutter Stop Step",
                "required": [
                  "datapoint_type",
                  "id",
                  "type",
                  "value"
                ],
                "properties": {
                  "datapoint_type": {
                    "const": "urn:knx:dpt.step",
                    "x-parser-schema-id": "<anonymous-schema-917>"
                  },
                  "id": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-918>"
                  },
                  "type": {
                    "const": "mac#ShutterStopStep",
                    "x-parser-schema-id": "<anonymous-schema-919>"
                  },
                  "value": {
                    "enum": [
                      "off",
                      "on"
                    ],
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-920>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-916>"
              },
              {
                "type": "object",
                "title": "write: Shutter Stop Trigger",
                "required": [
                  "datapoint_type",
                  "id",
                  "type",
                  "value"
                ],
                "properties": {
                  "datapoint_type": {
                    "const": "urn:knx:dpt.trigger",
                    "x-parser-schema-id": "<anonymous-schema-922>"
                  },
                  "id": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-923>"
                  },
                  "type": {
                    "const": "mac#ShutterStopTrigger",
                    "x-parser-schema-id": "<anonymous-schema-924>"
                  },
                  "value": {
                    "enum": [
                      "off",
                      "on"
                    ],
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-925>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-921>"
              },
              {
                "type": "object",
                "title": "write: Wind Alarm",
                "required": [
                  "datapoint_type",
                  "id",
                  "type",
                  "value"
                ],
                "properties": {
                  "datapoint_type": {
                    "const": "urn:knx:dpt.alarm",
                    "x-parser-schema-id": "<anonymous-schema-927>"
                  },
                  "id": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-928>"
                  },
                  "type": {
                    "const": "mac#WindAlarm",
                    "x-parser-schema-id": "<anonymous-schema-929>"
                  },
                  "value": {
                    "enum": [
                      "off",
                      "on"
                    ],
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-930>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-926>"
              }
            ],
            "x-parser-schema-id": "<anonymous-schema-800>"
          },
          "x-parser-unique-object-id": "functionpoint write",
          "x-parser-message-name": "functionpoint write"
        }
      },
      "description": "TODO:description",
      "x-parser-unique-object-id": "functionpoint-write-req"
    },
    "functionpoint-write-ind": {
      "address": "functionpoint-write/ind/{instance_id}",
      "parameters": {
        "instance_id": {
          "description": "ID of the instance",
          "x-format": "uuid"
        }
      },
      "title": "Functionpoint Write Indication",
      "messages": {
        "functionpoint write": {
          "payload": {
            "oneOf": [
              {
                "type": "object",
                "title": "write: Blinds Move Up Down",
                "required": [
                  "datapoint_type",
                  "id",
                  "type",
                  "value"
                ],
                "properties": {
                  "datapoint_type": {
                    "const": "urn:knx:dpt.upDown",
                    "x-parser-schema-id": "<anonymous-schema-934>"
                  },
                  "id": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-935>"
                  },
                  "type": {
                    "const": "mac#BlindsMoveUpDown",
                    "x-parser-schema-id": "<anonymous-schema-936>"
                  },
                  "value": {
                    "enum": [
                      "off",
                      "on"
                    ],
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-937>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-933>"
              },
              {
                "type": "object",
                "title": "write: Blinds Position Length",
                "required": [
                  "datapoint_type",
                  "id",
                  "type",
                  "value"
                ],
                "properties": {
                  "datapoint_type": {
                    "const": "urn:knx:dpt.lengthmm",
                    "x-parser-schema-id": "<anonymous-schema-939>"
                  },
                  "id": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-940>"
                  },
                  "type": {
                    "const": "mac#BlindsPositionLength",
                    "x-parser-schema-id": "<anonymous-schema-941>"
                  },
                  "value": {
                    "enum": [
                      "off",
                      "on"
                    ],
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-942>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-938>"
              },
              {
                "type": "object",
                "title": "write: Blinds Position Percentage",
                "required": [
                  "datapoint_type",
                  "id",
                  "type",
                  "value"
                ],
                "properties": {
                  "datapoint_type": {
                    "const": "urn:knx:dpt.scaling",
                    "x-parser-schema-id": "<anonymous-schema-944>"
                  },
                  "id": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-945>"
                  },
                  "type": {
                    "const": "mac#BlindsPositionPercentage",
                    "x-parser-schema-id": "<anonymous-schema-946>"
                  },
                  "value": {
                    "enum": [
                      "off",
                      "on"
                    ],
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-947>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-943>"
              },
              {
                "type": "object",
                "title": "write: Blinds Slat Position Degrees",
                "required": [
                  "datapoint_type",
                  "id",
                  "type",
                  "value"
                ],
                "properties": {
                  "datapoint_type": {
                    "const": "urn:knx:dpt.rotationAngle",
                    "x-parser-schema-id": "<anonymous-schema-949>"
                  },
                  "id": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-950>"
                  },
                  "type": {
                    "const": "mac#BlindsSlatPositionDegrees",
                    "x-parser-schema-id": "<anonymous-schema-951>"
                  },
                  "value": {
                    "enum": [
                      "off",
                      "on"
                    ],
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-952>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-948>"
              },
              {
                "type": "object",
                "title": "write: Blinds Slat Position Percentage",
                "required": [
                  "datapoint_type",
                  "id",
                  "type",
                  "value"
                ],
                "properties": {
                  "datapoint_type": {
                    "const": "urn:knx:dpt.scaling",
                    "x-parser-schema-id": "<anonymous-schema-954>"
                  },
                  "id": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-955>"
                  },
                  "type": {
                    "const": "mac#BlindsSlatPositionPercentage",
                    "x-parser-schema-id": "<anonymous-schema-956>"
                  },
                  "value": {
                    "enum": [
                      "off",
                      "on"
                    ],
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-957>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-953>"
              },
              {
                "type": "object",
                "title": "write: Blinds Status",
                "required": [
                  "datapoint_type",
                  "id",
                  "type",
                  "value"
                ],
                "properties": {
                  "datapoint_type": {
                    "const": "urn:knx:dpt.upDown",
                    "x-parser-schema-id": "<anonymous-schema-959>"
                  },
                  "id": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-960>"
                  },
                  "type": {
                    "const": "mac#BlindsStatus",
                    "x-parser-schema-id": "<anonymous-schema-961>"
                  },
                  "value": {
                    "enum": [
                      "off",
                      "on"
                    ],
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-962>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-958>"
              },
              {
                "type": "object",
                "title": "write: Blinds Stop Step",
                "required": [
                  "datapoint_type",
                  "id",
                  "type",
                  "value"
                ],
                "properties": {
                  "datapoint_type": {
                    "const": "urn:knx:dpt.step",
                    "x-parser-schema-id": "<anonymous-schema-964>"
                  },
                  "id": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-965>"
                  },
                  "type": {
                    "const": "mac#BlindsStopStep",
                    "x-parser-schema-id": "<anonymous-schema-966>"
                  },
                  "value": {
                    "enum": [
                      "off",
                      "on"
                    ],
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-967>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-963>"
              },
              {
                "type": "object",
                "title": "write: Blinds Stop Trigger",
                "required": [
                  "datapoint_type",
                  "id",
                  "type",
                  "value"
                ],
                "properties": {
                  "datapoint_type": {
                    "const": "urn:knx:dpt.trigger",
                    "x-parser-schema-id": "<anonymous-schema-969>"
                  },
                  "id": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-970>"
                  },
                  "type": {
                    "const": "mac#BlindsStopTrigger",
                    "x-parser-schema-id": "<anonymous-schema-971>"
                  },
                  "value": {
                    "enum": [
                      "off",
                      "on"
                    ],
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-972>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-968>"
              },
              {
                "type": "object",
                "title": "write: Current Date",
                "required": [
                  "datapoint_type",
                  "id",
                  "type",
                  "value"
                ],
                "properties": {
                  "datapoint_type": {
                    "const": "urn:knx:dpt.date",
                    "x-parser-schema-id": "<anonymous-schema-974>"
                  },
                  "id": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-975>"
                  },
                  "type": {
                    "const": "mac#CurrentDate",
                    "x-parser-schema-id": "<anonymous-schema-976>"
                  },
                  "value": {
                    "enum": [
                      "off",
                      "on"
                    ],
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-977>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-973>"
              },
              {
                "type": "object",
                "title": "write: Current Date and Time",
                "required": [
                  "datapoint_type",
                  "id",
                  "type",
                  "value"
                ],
                "properties": {
                  "datapoint_type": {
                    "const": "urn:knx:dpt.dateTime",
                    "x-parser-schema-id": "<anonymous-schema-979>"
                  },
                  "id": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-980>"
                  },
                  "type": {
                    "const": "mac#CurrentDateAndTime",
                    "x-parser-schema-id": "<anonymous-schema-981>"
                  },
                  "value": {
                    "enum": [
                      "off",
                      "on"
                    ],
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-982>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-978>"
              },
              {
                "type": "object",
                "title": "write: Current Time",
                "required": [
                  "datapoint_type",
                  "id",
                  "type",
                  "value"
                ],
                "properties": {
                  "datapoint_type": {
                    "const": "urn:knx:dpt.timeOfDay",
                    "x-parser-schema-id": "<anonymous-schema-984>"
                  },
                  "id": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-985>"
                  },
                  "type": {
                    "const": "mac#CurrentTime",
                    "x-parser-schema-id": "<anonymous-schema-986>"
                  },
                  "value": {
                    "enum": [
                      "off",
                      "on"
                    ],
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-987>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-983>"
              },
              {
                "type": "object",
                "title": "write: Frost Alarm",
                "required": [
                  "datapoint_type",
                  "id",
                  "type",
                  "value"
                ],
                "properties": {
                  "datapoint_type": {
                    "const": "urn:knx:dpt.alarm",
                    "x-parser-schema-id": "<anonymous-schema-989>"
                  },
                  "id": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-990>"
                  },
                  "type": {
                    "const": "mac#FrostAlarm",
                    "x-parser-schema-id": "<anonymous-schema-991>"
                  },
                  "value": {
                    "enum": [
                      "off",
                      "on"
                    ],
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-992>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-988>"
              },
              {
                "type": "object",
                "title": "write: Light Absolute Setvalue Request",
                "required": [
                  "datapoint_type",
                  "id",
                  "type",
                  "value"
                ],
                "properties": {
                  "datapoint_type": {
                    "const": "urn:knx:dpt.scaling",
                    "x-parser-schema-id": "<anonymous-schema-994>"
                  },
                  "id": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-995>"
                  },
                  "type": {
                    "const": "mac#LightAbsoluteSetvalueRequest",
                    "x-parser-schema-id": "<anonymous-schema-996>"
                  },
                  "value": {
                    "enum": [
                      "off",
                      "on"
                    ],
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-997>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-993>"
              },
              {
                "type": "object",
                "title": "write: Light Current Dimming Value",
                "required": [
                  "datapoint_type",
                  "id",
                  "type",
                  "value"
                ],
                "properties": {
                  "datapoint_type": {
                    "const": "urn:knx:dpt.scaling",
                    "x-parser-schema-id": "<anonymous-schema-999>"
                  },
                  "id": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-1000>"
                  },
                  "type": {
                    "const": "mac#LightCurrentDimmingValue",
                    "x-parser-schema-id": "<anonymous-schema-1001>"
                  },
                  "value": {
                    "enum": [
                      "off",
                      "on"
                    ],
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-1002>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-998>"
              },
              {
                "type": "object",
                "title": "write: Light Current Status",
                "required": [
                  "datapoint_type",
                  "id",
                  "type",
                  "value"
                ],
                "properties": {
                  "datapoint_type": {
                    "const": "urn:knx:dpt.switch",
                    "x-parser-schema-id": "<anonymous-schema-1004>"
                  },
                  "id": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-1005>"
                  },
                  "type": {
                    "const": "mac#LightCurrentStatus",
                    "x-parser-schema-id": "<anonymous-schema-1006>"
                  },
                  "value": {
                    "enum": [
                      "off",
                      "on"
                    ],
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-1007>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-1003>"
              },
              {
                "type": "object",
                "title": "write: Light Relative Dimming Request",
                "required": [
                  "datapoint_type",
                  "id",
                  "type",
                  "value"
                ],
                "properties": {
                  "datapoint_type": {
                    "const": "urn:knx:dpt.controlDimming",
                    "x-parser-schema-id": "<anonymous-schema-1009>"
                  },
                  "id": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-1010>"
                  },
                  "type": {
                    "const": "mac#LightRelativeDimmingRequest",
                    "x-parser-schema-id": "<anonymous-schema-1011>"
                  },
                  "value": {
                    "enum": [
                      "off",
                      "on"
                    ],
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-1012>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-1008>"
              },
              {
                "type": "object",
                "title": "write: Light Switch Request",
                "required": [
                  "datapoint_type",
                  "id",
                  "type",
                  "value"
                ],
                "properties": {
                  "datapoint_type": {
                    "const": "urn:knx:dpt.switch",
                    "x-parser-schema-id": "<anonymous-schema-1014>"
                  },
                  "id": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-1015>"
                  },
                  "type": {
                    "const": "mac#LightSwitchRequest",
                    "x-parser-schema-id": "<anonymous-schema-1016>"
                  },
                  "value": {
                    "enum": [
                      "off",
                      "on"
                    ],
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-1017>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-1013>"
              },
              {
                "type": "object",
                "title": "write: Rain Alarm",
                "required": [
                  "datapoint_type",
                  "id",
                  "type",
                  "value"
                ],
                "properties": {
                  "datapoint_type": {
                    "const": "urn:knx:dpt.alarm",
                    "x-parser-schema-id": "<anonymous-schema-1019>"
                  },
                  "id": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-1020>"
                  },
                  "type": {
                    "const": "mac#RainAlarm",
                    "x-parser-schema-id": "<anonymous-schema-1021>"
                  },
                  "value": {
                    "enum": [
                      "off",
                      "on"
                    ],
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-1022>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-1018>"
              },
              {
                "type": "object",
                "title": "write: Relation to GMT",
                "required": [
                  "datapoint_type",
                  "id",
                  "type",
                  "value"
                ],
                "properties": {
                  "datapoint_type": {
                    "const": "urn:knx:dpt.deltaTimeMin",
                    "x-parser-schema-id": "<anonymous-schema-1024>"
                  },
                  "id": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-1025>"
                  },
                  "type": {
                    "const": "mac#RelationToGMT",
                    "x-parser-schema-id": "<anonymous-schema-1026>"
                  },
                  "value": {
                    "enum": [
                      "off",
                      "on"
                    ],
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-1027>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-1023>"
              },
              {
                "type": "object",
                "title": "write: Shutter Move Up Down",
                "required": [
                  "datapoint_type",
                  "id",
                  "type",
                  "value"
                ],
                "properties": {
                  "datapoint_type": {
                    "const": "urn:knx:dpt.upDown",
                    "x-parser-schema-id": "<anonymous-schema-1029>"
                  },
                  "id": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-1030>"
                  },
                  "type": {
                    "const": "mac#ShutterMoveUpDown",
                    "x-parser-schema-id": "<anonymous-schema-1031>"
                  },
                  "value": {
                    "enum": [
                      "off",
                      "on"
                    ],
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-1032>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-1028>"
              },
              {
                "type": "object",
                "title": "write: Shutter Position Length",
                "required": [
                  "datapoint_type",
                  "id",
                  "type",
                  "value"
                ],
                "properties": {
                  "datapoint_type": {
                    "const": "urn:knx:dpt.lengthmm",
                    "x-parser-schema-id": "<anonymous-schema-1034>"
                  },
                  "id": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-1035>"
                  },
                  "type": {
                    "const": "mac#ShutterPositionLength",
                    "x-parser-schema-id": "<anonymous-schema-1036>"
                  },
                  "value": {
                    "enum": [
                      "off",
                      "on"
                    ],
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-1037>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-1033>"
              },
              {
                "type": "object",
                "title": "write: Shutter Position Percentage",
                "required": [
                  "datapoint_type",
                  "id",
                  "type",
                  "value"
                ],
                "properties": {
                  "datapoint_type": {
                    "const": "urn:knx:dpt.scaling",
                    "x-parser-schema-id": "<anonymous-schema-1039>"
                  },
                  "id": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-1040>"
                  },
                  "type": {
                    "const": "mac#ShutterPositionPercentage",
                    "x-parser-schema-id": "<anonymous-schema-1041>"
                  },
                  "value": {
                    "enum": [
                      "off",
                      "on"
                    ],
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-1042>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-1038>"
              },
              {
                "type": "object",
                "title": "write: Shutter Status",
                "required": [
                  "datapoint_type",
                  "id",
                  "type",
                  "value"
                ],
                "properties": {
                  "datapoint_type": {
                    "const": "urn:knx:dpt.upDown",
                    "x-parser-schema-id": "<anonymous-schema-1044>"
                  },
                  "id": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-1045>"
                  },
                  "type": {
                    "const": "mac#ShutterStatus",
                    "x-parser-schema-id": "<anonymous-schema-1046>"
                  },
                  "value": {
                    "enum": [
                      "off",
                      "on"
                    ],
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-1047>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-1043>"
              },
              {
                "type": "object",
                "title": "write: Shutter Stop Step",
                "required": [
                  "datapoint_type",
                  "id",
                  "type",
                  "value"
                ],
                "properties": {
                  "datapoint_type": {
                    "const": "urn:knx:dpt.step",
                    "x-parser-schema-id": "<anonymous-schema-1049>"
                  },
                  "id": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-1050>"
                  },
                  "type": {
                    "const": "mac#ShutterStopStep",
                    "x-parser-schema-id": "<anonymous-schema-1051>"
                  },
                  "value": {
                    "enum": [
                      "off",
                      "on"
                    ],
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-1052>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-1048>"
              },
              {
                "type": "object",
                "title": "write: Shutter Stop Trigger",
                "required": [
                  "datapoint_type",
                  "id",
                  "type",
                  "value"
                ],
                "properties": {
                  "datapoint_type": {
                    "const": "urn:knx:dpt.trigger",
                    "x-parser-schema-id": "<anonymous-schema-1054>"
                  },
                  "id": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-1055>"
                  },
                  "type": {
                    "const": "mac#ShutterStopTrigger",
                    "x-parser-schema-id": "<anonymous-schema-1056>"
                  },
                  "value": {
                    "enum": [
                      "off",
                      "on"
                    ],
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-1057>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-1053>"
              },
              {
                "type": "object",
                "title": "write: Wind Alarm",
                "required": [
                  "datapoint_type",
                  "id",
                  "type",
                  "value"
                ],
                "properties": {
                  "datapoint_type": {
                    "const": "urn:knx:dpt.alarm",
                    "x-parser-schema-id": "<anonymous-schema-1059>"
                  },
                  "id": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-1060>"
                  },
                  "type": {
                    "const": "mac#WindAlarm",
                    "x-parser-schema-id": "<anonymous-schema-1061>"
                  },
                  "value": {
                    "enum": [
                      "off",
                      "on"
                    ],
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-1062>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-1058>"
              }
            ],
            "x-parser-schema-id": "<anonymous-schema-932>"
          },
          "x-parser-unique-object-id": "functionpoint write",
          "x-parser-message-name": "functionpoint write"
        }
      },
      "description": "TODO:description",
      "x-parser-unique-object-id": "functionpoint-write-ind"
    }
  },
  "operations": {
    "functionpoint-req": {
      "action": "send",
      "channel": "$ref:$.channels.functionpoint-req",
      "reply": {
        "channel": "$ref:$.channels.functionpoint-resp"
      },
      "x-parser-unique-object-id": "functionpoint-req"
    },
    "functionpoint-resp": {
      "action": "receive",
      "channel": "$ref:$.channels.functionpoint-resp",
      "x-parser-unique-object-id": "functionpoint-resp"
    },
    "functionpoints-req": {
      "action": "send",
      "channel": "$ref:$.channels.functionpoints-req",
      "reply": {
        "channel": "$ref:$.channels.functionpoints-resp"
      },
      "x-parser-unique-object-id": "functionpoints-req"
    },
    "functionpoints-resp": {
      "action": "receive",
      "channel": "$ref:$.channels.functionpoints-resp",
      "x-parser-unique-object-id": "functionpoints-resp"
    },
    "function-req": {
      "action": "send",
      "channel": "$ref:$.channels.function-req",
      "reply": {
        "channel": "$ref:$.channels.function-resp"
      },
      "x-parser-unique-object-id": "function-req"
    },
    "function-resp": {
      "action": "receive",
      "channel": "$ref:$.channels.function-resp",
      "x-parser-unique-object-id": "function-resp"
    },
    "functions-req": {
      "action": "send",
      "channel": "$ref:$.channels.functions-req",
      "reply": {
        "channel": "$ref:$.channels.functions-resp"
      },
      "x-parser-unique-object-id": "functions-req"
    },
    "functions-resp": {
      "action": "receive",
      "channel": "$ref:$.channels.functions-resp",
      "x-parser-unique-object-id": "functions-resp"
    },
    "location-req": {
      "action": "send",
      "channel": "$ref:$.channels.location-req",
      "reply": {
        "channel": "$ref:$.channels.location-resp"
      },
      "x-parser-unique-object-id": "location-req"
    },
    "location-resp": {
      "action": "receive",
      "channel": "$ref:$.channels.location-resp",
      "x-parser-unique-object-id": "location-resp"
    },
    "locations-req": {
      "action": "send",
      "channel": "$ref:$.channels.locations-req",
      "reply": {
        "channel": "$ref:$.channels.locations-resp"
      },
      "x-parser-unique-object-id": "locations-req"
    },
    "locations-resp": {
      "action": "receive",
      "channel": "$ref:$.channels.locations-resp",
      "x-parser-unique-object-id": "locations-resp"
    },
    "functionpoint-write-ind": {
      "action": "receive",
      "channel": "$ref:$.channels.functionpoint-write-ind",
      "x-parser-unique-object-id": "functionpoint-write-ind"
    },
    "functionpoint-write-req": {
      "action": "send",
      "channel": "$ref:$.channels.functionpoint-write-req",
      "x-parser-unique-object-id": "functionpoint-write-req"
    }
  },
  "components": {
    "parameters": {
      "instance_id": {
        "description": "ID of the instance",
        "x-format": "uuid"
      }
    },
    "schemas": {
      "function": {
        "oneOf": [
          {
            "type": "object",
            "title": "User Blinds Control",
            "required": [
              "id",
              "type",
              "trade",
              "name",
              "function_points",
              "function_location"
            ],
            "properties": {
              "id": {
                "format": "uuid",
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1064>"
              },
              "type": {
                "const": "urn:knx:fct.blinds",
                "x-parser-schema-id": "<anonymous-schema-1065>"
              },
              "trade": {
                "const": "tag#shading",
                "x-parser-schema-id": "<anonymous-schema-1066>"
              },
              "name": {
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1067>"
              },
              "function_points": {
                "additionalProperties": false,
                "properties": {
                  "mac#BlindsMoveUpDown": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-1069>"
                  },
                  "mac#BlindsPositionLength": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-1070>"
                  },
                  "mac#BlindsPositionPercentage": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-1071>"
                  },
                  "mac#BlindsSlatPositionDegrees": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-1072>"
                  },
                  "mac#BlindsSlatPositionPercentage": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-1073>"
                  },
                  "mac#BlindsStatus": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-1074>"
                  },
                  "mac#BlindsStopStep": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-1075>"
                  },
                  "mac#BlindsStopTrigger": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-1076>"
                  },
                  "mac#FrostAlarm": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-1077>"
                  },
                  "mac#RainAlarm": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-1078>"
                  },
                  "mac#WindAlarm": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-1079>"
                  }
                },
                "required": [
                  "mac#BlindsMoveUpDown",
                  "mac#BlindsPositionLength",
                  "mac#BlindsPositionPercentage",
                  "mac#BlindsSlatPositionDegrees",
                  "mac#BlindsSlatPositionPercentage",
                  "mac#BlindsStatus",
                  "mac#BlindsStopStep",
                  "mac#BlindsStopTrigger",
                  "mac#FrostAlarm",
                  "mac#RainAlarm",
                  "mac#WindAlarm"
                ],
                "type": "object",
                "x-parser-schema-id": "<anonymous-schema-1068>"
              },
              "function_location": {
                "format": "uuid",
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1080>"
              }
            },
            "additionalProperties": false,
            "x-parser-schema-id": "<anonymous-schema-1063>"
          },
          {
            "type": "object",
            "title": "User Light Dimming",
            "required": [
              "id",
              "type",
              "trade",
              "name",
              "function_points",
              "function_location"
            ],
            "properties": {
              "id": {
                "format": "uuid",
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1082>"
              },
              "type": {
                "const": "urn:knx:fct.dimLight",
                "x-parser-schema-id": "<anonymous-schema-1083>"
              },
              "trade": {
                "const": "tag#lighting",
                "x-parser-schema-id": "<anonymous-schema-1084>"
              },
              "name": {
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1085>"
              },
              "function_points": {
                "additionalProperties": false,
                "properties": {
                  "mac#LightAbsoluteSetvalueRequest": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-1087>"
                  },
                  "mac#LightCurrentDimmingValue": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-1088>"
                  },
                  "mac#LightRelativeDimmingRequest": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-1089>"
                  },
                  "mac#LightCurrentStatus": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-1090>"
                  },
                  "mac#LightSwitchRequest": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-1091>"
                  }
                },
                "required": [
                  "mac#LightAbsoluteSetvalueRequest",
                  "mac#LightCurrentDimmingValue",
                  "mac#LightRelativeDimmingRequest",
                  "mac#LightCurrentStatus",
                  "mac#LightSwitchRequest"
                ],
                "type": "object",
                "x-parser-schema-id": "<anonymous-schema-1086>"
              },
              "function_location": {
                "format": "uuid",
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1092>"
              }
            },
            "additionalProperties": false,
            "x-parser-schema-id": "<anonymous-schema-1081>"
          },
          {
            "type": "object",
            "title": "User Shutter Control",
            "required": [
              "id",
              "type",
              "trade",
              "name",
              "function_points",
              "function_location"
            ],
            "properties": {
              "id": {
                "format": "uuid",
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1094>"
              },
              "type": {
                "const": "urn:knx:fct.shutter",
                "x-parser-schema-id": "<anonymous-schema-1095>"
              },
              "trade": {
                "const": "tag#shading",
                "x-parser-schema-id": "<anonymous-schema-1096>"
              },
              "name": {
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1097>"
              },
              "function_points": {
                "additionalProperties": false,
                "properties": {
                  "mac#FrostAlarm": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-1099>"
                  },
                  "mac#RainAlarm": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-1100>"
                  },
                  "mac#ShutterMoveUpDown": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-1101>"
                  },
                  "mac#ShutterPositionLength": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-1102>"
                  },
                  "mac#ShutterPositionPercentage": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-1103>"
                  },
                  "mac#ShutterStatus": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-1104>"
                  },
                  "mac#ShutterStopStep": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-1105>"
                  },
                  "mac#ShutterStopTrigger": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-1106>"
                  },
                  "mac#WindAlarm": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-1107>"
                  }
                },
                "required": [
                  "mac#FrostAlarm",
                  "mac#RainAlarm",
                  "mac#ShutterMoveUpDown",
                  "mac#ShutterPositionLength",
                  "mac#ShutterPositionPercentage",
                  "mac#ShutterStatus",
                  "mac#ShutterStopStep",
                  "mac#ShutterStopTrigger",
                  "mac#WindAlarm"
                ],
                "type": "object",
                "x-parser-schema-id": "<anonymous-schema-1098>"
              },
              "function_location": {
                "format": "uuid",
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1108>"
              }
            },
            "additionalProperties": false,
            "x-parser-schema-id": "<anonymous-schema-1093>"
          },
          {
            "type": "object",
            "title": "User Light Switching",
            "required": [
              "id",
              "type",
              "trade",
              "name",
              "function_points",
              "function_location"
            ],
            "properties": {
              "id": {
                "format": "uuid",
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1110>"
              },
              "type": {
                "const": "urn:knx:fct.switchLight",
                "x-parser-schema-id": "<anonymous-schema-1111>"
              },
              "trade": {
                "const": "tag#lighting",
                "x-parser-schema-id": "<anonymous-schema-1112>"
              },
              "name": {
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1113>"
              },
              "function_points": {
                "additionalProperties": false,
                "properties": {
                  "mac#LightCurrentStatus": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-1115>"
                  },
                  "mac#LightSwitchRequest": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-1116>"
                  }
                },
                "required": [
                  "mac#LightCurrentStatus",
                  "mac#LightSwitchRequest"
                ],
                "type": "object",
                "x-parser-schema-id": "<anonymous-schema-1114>"
              },
              "function_location": {
                "format": "uuid",
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1117>"
              }
            },
            "additionalProperties": false,
            "x-parser-schema-id": "<anonymous-schema-1109>"
          },
          {
            "type": "object",
            "title": "System Clock",
            "required": [
              "id",
              "type",
              "trade",
              "name",
              "function_points",
              "function_location"
            ],
            "properties": {
              "id": {
                "format": "uuid",
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1119>"
              },
              "type": {
                "const": "urn:knx:fct.systemClock",
                "x-parser-schema-id": "<anonymous-schema-1120>"
              },
              "trade": {
                "const": null,
                "x-parser-schema-id": "<anonymous-schema-1121>"
              },
              "name": {
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1122>"
              },
              "function_points": {
                "additionalProperties": false,
                "properties": {
                  "mac#CurrentDate": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-1124>"
                  },
                  "mac#CurrentDateAndTime": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-1125>"
                  },
                  "mac#CurrentTime": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-1126>"
                  },
                  "mac#RelationToGMT": {
                    "format": "uuid",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-1127>"
                  }
                },
                "required": [
                  "mac#CurrentDate",
                  "mac#CurrentDateAndTime",
                  "mac#CurrentTime",
                  "mac#RelationToGMT"
                ],
                "type": "object",
                "x-parser-schema-id": "<anonymous-schema-1123>"
              },
              "function_location": {
                "format": "uuid",
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1128>"
              }
            },
            "additionalProperties": false,
            "x-parser-schema-id": "<anonymous-schema-1118>"
          }
        ],
        "x-parser-schema-id": "function"
      },
      "functionpoint": {
        "oneOf": [
          {
            "type": "object",
            "title": "Blinds Move Up Down",
            "required": [
              "id",
              "type",
              "title",
              "datapoint_type",
              "function_ref"
            ],
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid",
                "x-parser-schema-id": "<anonymous-schema-1130>"
              },
              "type": {
                "const": "mac#BlindsMoveUpDown",
                "x-parser-schema-id": "<anonymous-schema-1131>"
              },
              "title": {
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1132>"
              },
              "datapoint_type": {
                "const": "urn:knx:dpt.upDown",
                "x-parser-schema-id": "<anonymous-schema-1133>"
              },
              "function_ref": {
                "type": "string",
                "format": "uuid",
                "x-parser-schema-id": "<anonymous-schema-1134>"
              }
            },
            "additionalProperties": false,
            "x-parser-schema-id": "<anonymous-schema-1129>"
          },
          {
            "type": "object",
            "title": "Blinds Position Length",
            "required": [
              "id",
              "type",
              "title",
              "datapoint_type",
              "function_ref"
            ],
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid",
                "x-parser-schema-id": "<anonymous-schema-1136>"
              },
              "type": {
                "const": "mac#BlindsPositionLength",
                "x-parser-schema-id": "<anonymous-schema-1137>"
              },
              "title": {
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1138>"
              },
              "datapoint_type": {
                "const": "urn:knx:dpt.lengthmm",
                "x-parser-schema-id": "<anonymous-schema-1139>"
              },
              "function_ref": {
                "type": "string",
                "format": "uuid",
                "x-parser-schema-id": "<anonymous-schema-1140>"
              }
            },
            "additionalProperties": false,
            "x-parser-schema-id": "<anonymous-schema-1135>"
          },
          {
            "type": "object",
            "title": "Blinds Position Percentage",
            "required": [
              "id",
              "type",
              "title",
              "datapoint_type",
              "function_ref"
            ],
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid",
                "x-parser-schema-id": "<anonymous-schema-1142>"
              },
              "type": {
                "const": "mac#BlindsPositionPercentage",
                "x-parser-schema-id": "<anonymous-schema-1143>"
              },
              "title": {
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1144>"
              },
              "datapoint_type": {
                "const": "urn:knx:dpt.scaling",
                "x-parser-schema-id": "<anonymous-schema-1145>"
              },
              "function_ref": {
                "type": "string",
                "format": "uuid",
                "x-parser-schema-id": "<anonymous-schema-1146>"
              }
            },
            "additionalProperties": false,
            "x-parser-schema-id": "<anonymous-schema-1141>"
          },
          {
            "type": "object",
            "title": "Blinds Slat Position Degrees",
            "required": [
              "id",
              "type",
              "title",
              "datapoint_type",
              "function_ref"
            ],
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid",
                "x-parser-schema-id": "<anonymous-schema-1148>"
              },
              "type": {
                "const": "mac#BlindsSlatPositionDegrees",
                "x-parser-schema-id": "<anonymous-schema-1149>"
              },
              "title": {
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1150>"
              },
              "datapoint_type": {
                "const": "urn:knx:dpt.rotationAngle",
                "x-parser-schema-id": "<anonymous-schema-1151>"
              },
              "function_ref": {
                "type": "string",
                "format": "uuid",
                "x-parser-schema-id": "<anonymous-schema-1152>"
              }
            },
            "additionalProperties": false,
            "x-parser-schema-id": "<anonymous-schema-1147>"
          },
          {
            "type": "object",
            "title": "Blinds Slat Position Percentage",
            "required": [
              "id",
              "type",
              "title",
              "datapoint_type",
              "function_ref"
            ],
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid",
                "x-parser-schema-id": "<anonymous-schema-1154>"
              },
              "type": {
                "const": "mac#BlindsSlatPositionPercentage",
                "x-parser-schema-id": "<anonymous-schema-1155>"
              },
              "title": {
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1156>"
              },
              "datapoint_type": {
                "const": "urn:knx:dpt.scaling",
                "x-parser-schema-id": "<anonymous-schema-1157>"
              },
              "function_ref": {
                "type": "string",
                "format": "uuid",
                "x-parser-schema-id": "<anonymous-schema-1158>"
              }
            },
            "additionalProperties": false,
            "x-parser-schema-id": "<anonymous-schema-1153>"
          },
          {
            "type": "object",
            "title": "Blinds Status",
            "required": [
              "id",
              "type",
              "title",
              "datapoint_type",
              "function_ref"
            ],
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid",
                "x-parser-schema-id": "<anonymous-schema-1160>"
              },
              "type": {
                "const": "mac#BlindsStatus",
                "x-parser-schema-id": "<anonymous-schema-1161>"
              },
              "title": {
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1162>"
              },
              "datapoint_type": {
                "const": "urn:knx:dpt.upDown",
                "x-parser-schema-id": "<anonymous-schema-1163>"
              },
              "function_ref": {
                "type": "string",
                "format": "uuid",
                "x-parser-schema-id": "<anonymous-schema-1164>"
              }
            },
            "additionalProperties": false,
            "x-parser-schema-id": "<anonymous-schema-1159>"
          },
          {
            "type": "object",
            "title": "Blinds Stop Step",
            "required": [
              "id",
              "type",
              "title",
              "datapoint_type",
              "function_ref"
            ],
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid",
                "x-parser-schema-id": "<anonymous-schema-1166>"
              },
              "type": {
                "const": "mac#BlindsStopStep",
                "x-parser-schema-id": "<anonymous-schema-1167>"
              },
              "title": {
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1168>"
              },
              "datapoint_type": {
                "const": "urn:knx:dpt.step",
                "x-parser-schema-id": "<anonymous-schema-1169>"
              },
              "function_ref": {
                "type": "string",
                "format": "uuid",
                "x-parser-schema-id": "<anonymous-schema-1170>"
              }
            },
            "additionalProperties": false,
            "x-parser-schema-id": "<anonymous-schema-1165>"
          },
          {
            "type": "object",
            "title": "Blinds Stop Trigger",
            "required": [
              "id",
              "type",
              "title",
              "datapoint_type",
              "function_ref"
            ],
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid",
                "x-parser-schema-id": "<anonymous-schema-1172>"
              },
              "type": {
                "const": "mac#BlindsStopTrigger",
                "x-parser-schema-id": "<anonymous-schema-1173>"
              },
              "title": {
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1174>"
              },
              "datapoint_type": {
                "const": "urn:knx:dpt.trigger",
                "x-parser-schema-id": "<anonymous-schema-1175>"
              },
              "function_ref": {
                "type": "string",
                "format": "uuid",
                "x-parser-schema-id": "<anonymous-schema-1176>"
              }
            },
            "additionalProperties": false,
            "x-parser-schema-id": "<anonymous-schema-1171>"
          },
          {
            "type": "object",
            "title": "Current Date",
            "required": [
              "id",
              "type",
              "title",
              "datapoint_type",
              "function_ref"
            ],
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid",
                "x-parser-schema-id": "<anonymous-schema-1178>"
              },
              "type": {
                "const": "mac#CurrentDate",
                "x-parser-schema-id": "<anonymous-schema-1179>"
              },
              "title": {
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1180>"
              },
              "datapoint_type": {
                "const": "urn:knx:dpt.date",
                "x-parser-schema-id": "<anonymous-schema-1181>"
              },
              "function_ref": {
                "type": "string",
                "format": "uuid",
                "x-parser-schema-id": "<anonymous-schema-1182>"
              }
            },
            "additionalProperties": false,
            "x-parser-schema-id": "<anonymous-schema-1177>"
          },
          {
            "type": "object",
            "title": "Current Date and Time",
            "required": [
              "id",
              "type",
              "title",
              "datapoint_type",
              "function_ref"
            ],
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid",
                "x-parser-schema-id": "<anonymous-schema-1184>"
              },
              "type": {
                "const": "mac#CurrentDateAndTime",
                "x-parser-schema-id": "<anonymous-schema-1185>"
              },
              "title": {
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1186>"
              },
              "datapoint_type": {
                "const": "urn:knx:dpt.dateTime",
                "x-parser-schema-id": "<anonymous-schema-1187>"
              },
              "function_ref": {
                "type": "string",
                "format": "uuid",
                "x-parser-schema-id": "<anonymous-schema-1188>"
              }
            },
            "additionalProperties": false,
            "x-parser-schema-id": "<anonymous-schema-1183>"
          },
          {
            "type": "object",
            "title": "Current Time",
            "required": [
              "id",
              "type",
              "title",
              "datapoint_type",
              "function_ref"
            ],
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid",
                "x-parser-schema-id": "<anonymous-schema-1190>"
              },
              "type": {
                "const": "mac#CurrentTime",
                "x-parser-schema-id": "<anonymous-schema-1191>"
              },
              "title": {
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1192>"
              },
              "datapoint_type": {
                "const": "urn:knx:dpt.timeOfDay",
                "x-parser-schema-id": "<anonymous-schema-1193>"
              },
              "function_ref": {
                "type": "string",
                "format": "uuid",
                "x-parser-schema-id": "<anonymous-schema-1194>"
              }
            },
            "additionalProperties": false,
            "x-parser-schema-id": "<anonymous-schema-1189>"
          },
          {
            "type": "object",
            "title": "Frost Alarm",
            "required": [
              "id",
              "type",
              "title",
              "datapoint_type",
              "function_ref"
            ],
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid",
                "x-parser-schema-id": "<anonymous-schema-1196>"
              },
              "type": {
                "const": "mac#FrostAlarm",
                "x-parser-schema-id": "<anonymous-schema-1197>"
              },
              "title": {
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1198>"
              },
              "datapoint_type": {
                "const": "urn:knx:dpt.alarm",
                "x-parser-schema-id": "<anonymous-schema-1199>"
              },
              "function_ref": {
                "type": "string",
                "format": "uuid",
                "x-parser-schema-id": "<anonymous-schema-1200>"
              }
            },
            "additionalProperties": false,
            "x-parser-schema-id": "<anonymous-schema-1195>"
          },
          {
            "type": "object",
            "title": "Light Absolute Setvalue Request",
            "required": [
              "id",
              "type",
              "title",
              "datapoint_type",
              "function_ref"
            ],
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid",
                "x-parser-schema-id": "<anonymous-schema-1202>"
              },
              "type": {
                "const": "mac#LightAbsoluteSetvalueRequest",
                "x-parser-schema-id": "<anonymous-schema-1203>"
              },
              "title": {
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1204>"
              },
              "datapoint_type": {
                "const": "urn:knx:dpt.scaling",
                "x-parser-schema-id": "<anonymous-schema-1205>"
              },
              "function_ref": {
                "type": "string",
                "format": "uuid",
                "x-parser-schema-id": "<anonymous-schema-1206>"
              }
            },
            "additionalProperties": false,
            "x-parser-schema-id": "<anonymous-schema-1201>"
          },
          {
            "type": "object",
            "title": "Light Current Dimming Value",
            "required": [
              "id",
              "type",
              "title",
              "datapoint_type",
              "function_ref"
            ],
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid",
                "x-parser-schema-id": "<anonymous-schema-1208>"
              },
              "type": {
                "const": "mac#LightCurrentDimmingValue",
                "x-parser-schema-id": "<anonymous-schema-1209>"
              },
              "title": {
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1210>"
              },
              "datapoint_type": {
                "const": "urn:knx:dpt.scaling",
                "x-parser-schema-id": "<anonymous-schema-1211>"
              },
              "function_ref": {
                "type": "string",
                "format": "uuid",
                "x-parser-schema-id": "<anonymous-schema-1212>"
              }
            },
            "additionalProperties": false,
            "x-parser-schema-id": "<anonymous-schema-1207>"
          },
          {
            "type": "object",
            "title": "Light Current Status",
            "required": [
              "id",
              "type",
              "title",
              "datapoint_type",
              "function_ref"
            ],
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid",
                "x-parser-schema-id": "<anonymous-schema-1214>"
              },
              "type": {
                "const": "mac#LightCurrentStatus",
                "x-parser-schema-id": "<anonymous-schema-1215>"
              },
              "title": {
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1216>"
              },
              "datapoint_type": {
                "const": "urn:knx:dpt.switch",
                "x-parser-schema-id": "<anonymous-schema-1217>"
              },
              "function_ref": {
                "type": "string",
                "format": "uuid",
                "x-parser-schema-id": "<anonymous-schema-1218>"
              }
            },
            "additionalProperties": false,
            "x-parser-schema-id": "<anonymous-schema-1213>"
          },
          {
            "type": "object",
            "title": "Light Relative Dimming Request",
            "required": [
              "id",
              "type",
              "title",
              "datapoint_type",
              "function_ref"
            ],
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid",
                "x-parser-schema-id": "<anonymous-schema-1220>"
              },
              "type": {
                "const": "mac#LightRelativeDimmingRequest",
                "x-parser-schema-id": "<anonymous-schema-1221>"
              },
              "title": {
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1222>"
              },
              "datapoint_type": {
                "const": "urn:knx:dpt.controlDimming",
                "x-parser-schema-id": "<anonymous-schema-1223>"
              },
              "function_ref": {
                "type": "string",
                "format": "uuid",
                "x-parser-schema-id": "<anonymous-schema-1224>"
              }
            },
            "additionalProperties": false,
            "x-parser-schema-id": "<anonymous-schema-1219>"
          },
          {
            "type": "object",
            "title": "Light Switch Request",
            "required": [
              "id",
              "type",
              "title",
              "datapoint_type",
              "function_ref"
            ],
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid",
                "x-parser-schema-id": "<anonymous-schema-1226>"
              },
              "type": {
                "const": "mac#LightSwitchRequest",
                "x-parser-schema-id": "<anonymous-schema-1227>"
              },
              "title": {
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1228>"
              },
              "datapoint_type": {
                "const": "urn:knx:dpt.switch",
                "x-parser-schema-id": "<anonymous-schema-1229>"
              },
              "function_ref": {
                "type": "string",
                "format": "uuid",
                "x-parser-schema-id": "<anonymous-schema-1230>"
              }
            },
            "additionalProperties": false,
            "x-parser-schema-id": "<anonymous-schema-1225>"
          },
          {
            "type": "object",
            "title": "Rain Alarm",
            "required": [
              "id",
              "type",
              "title",
              "datapoint_type",
              "function_ref"
            ],
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid",
                "x-parser-schema-id": "<anonymous-schema-1232>"
              },
              "type": {
                "const": "mac#RainAlarm",
                "x-parser-schema-id": "<anonymous-schema-1233>"
              },
              "title": {
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1234>"
              },
              "datapoint_type": {
                "const": "urn:knx:dpt.alarm",
                "x-parser-schema-id": "<anonymous-schema-1235>"
              },
              "function_ref": {
                "type": "string",
                "format": "uuid",
                "x-parser-schema-id": "<anonymous-schema-1236>"
              }
            },
            "additionalProperties": false,
            "x-parser-schema-id": "<anonymous-schema-1231>"
          },
          {
            "type": "object",
            "title": "Relation to GMT",
            "required": [
              "id",
              "type",
              "title",
              "datapoint_type",
              "function_ref"
            ],
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid",
                "x-parser-schema-id": "<anonymous-schema-1238>"
              },
              "type": {
                "const": "mac#RelationToGMT",
                "x-parser-schema-id": "<anonymous-schema-1239>"
              },
              "title": {
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1240>"
              },
              "datapoint_type": {
                "const": "urn:knx:dpt.deltaTimeMin",
                "x-parser-schema-id": "<anonymous-schema-1241>"
              },
              "function_ref": {
                "type": "string",
                "format": "uuid",
                "x-parser-schema-id": "<anonymous-schema-1242>"
              }
            },
            "additionalProperties": false,
            "x-parser-schema-id": "<anonymous-schema-1237>"
          },
          {
            "type": "object",
            "title": "Shutter Move Up Down",
            "required": [
              "id",
              "type",
              "title",
              "datapoint_type",
              "function_ref"
            ],
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid",
                "x-parser-schema-id": "<anonymous-schema-1244>"
              },
              "type": {
                "const": "mac#ShutterMoveUpDown",
                "x-parser-schema-id": "<anonymous-schema-1245>"
              },
              "title": {
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1246>"
              },
              "datapoint_type": {
                "const": "urn:knx:dpt.upDown",
                "x-parser-schema-id": "<anonymous-schema-1247>"
              },
              "function_ref": {
                "type": "string",
                "format": "uuid",
                "x-parser-schema-id": "<anonymous-schema-1248>"
              }
            },
            "additionalProperties": false,
            "x-parser-schema-id": "<anonymous-schema-1243>"
          },
          {
            "type": "object",
            "title": "Shutter Position Length",
            "required": [
              "id",
              "type",
              "title",
              "datapoint_type",
              "function_ref"
            ],
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid",
                "x-parser-schema-id": "<anonymous-schema-1250>"
              },
              "type": {
                "const": "mac#ShutterPositionLength",
                "x-parser-schema-id": "<anonymous-schema-1251>"
              },
              "title": {
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1252>"
              },
              "datapoint_type": {
                "const": "urn:knx:dpt.lengthmm",
                "x-parser-schema-id": "<anonymous-schema-1253>"
              },
              "function_ref": {
                "type": "string",
                "format": "uuid",
                "x-parser-schema-id": "<anonymous-schema-1254>"
              }
            },
            "additionalProperties": false,
            "x-parser-schema-id": "<anonymous-schema-1249>"
          },
          {
            "type": "object",
            "title": "Shutter Position Percentage",
            "required": [
              "id",
              "type",
              "title",
              "datapoint_type",
              "function_ref"
            ],
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid",
                "x-parser-schema-id": "<anonymous-schema-1256>"
              },
              "type": {
                "const": "mac#ShutterPositionPercentage",
                "x-parser-schema-id": "<anonymous-schema-1257>"
              },
              "title": {
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1258>"
              },
              "datapoint_type": {
                "const": "urn:knx:dpt.scaling",
                "x-parser-schema-id": "<anonymous-schema-1259>"
              },
              "function_ref": {
                "type": "string",
                "format": "uuid",
                "x-parser-schema-id": "<anonymous-schema-1260>"
              }
            },
            "additionalProperties": false,
            "x-parser-schema-id": "<anonymous-schema-1255>"
          },
          {
            "type": "object",
            "title": "Shutter Status",
            "required": [
              "id",
              "type",
              "title",
              "datapoint_type",
              "function_ref"
            ],
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid",
                "x-parser-schema-id": "<anonymous-schema-1262>"
              },
              "type": {
                "const": "mac#ShutterStatus",
                "x-parser-schema-id": "<anonymous-schema-1263>"
              },
              "title": {
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1264>"
              },
              "datapoint_type": {
                "const": "urn:knx:dpt.upDown",
                "x-parser-schema-id": "<anonymous-schema-1265>"
              },
              "function_ref": {
                "type": "string",
                "format": "uuid",
                "x-parser-schema-id": "<anonymous-schema-1266>"
              }
            },
            "additionalProperties": false,
            "x-parser-schema-id": "<anonymous-schema-1261>"
          },
          {
            "type": "object",
            "title": "Shutter Stop Step",
            "required": [
              "id",
              "type",
              "title",
              "datapoint_type",
              "function_ref"
            ],
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid",
                "x-parser-schema-id": "<anonymous-schema-1268>"
              },
              "type": {
                "const": "mac#ShutterStopStep",
                "x-parser-schema-id": "<anonymous-schema-1269>"
              },
              "title": {
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1270>"
              },
              "datapoint_type": {
                "const": "urn:knx:dpt.step",
                "x-parser-schema-id": "<anonymous-schema-1271>"
              },
              "function_ref": {
                "type": "string",
                "format": "uuid",
                "x-parser-schema-id": "<anonymous-schema-1272>"
              }
            },
            "additionalProperties": false,
            "x-parser-schema-id": "<anonymous-schema-1267>"
          },
          {
            "type": "object",
            "title": "Shutter Stop Trigger",
            "required": [
              "id",
              "type",
              "title",
              "datapoint_type",
              "function_ref"
            ],
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid",
                "x-parser-schema-id": "<anonymous-schema-1274>"
              },
              "type": {
                "const": "mac#ShutterStopTrigger",
                "x-parser-schema-id": "<anonymous-schema-1275>"
              },
              "title": {
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1276>"
              },
              "datapoint_type": {
                "const": "urn:knx:dpt.trigger",
                "x-parser-schema-id": "<anonymous-schema-1277>"
              },
              "function_ref": {
                "type": "string",
                "format": "uuid",
                "x-parser-schema-id": "<anonymous-schema-1278>"
              }
            },
            "additionalProperties": false,
            "x-parser-schema-id": "<anonymous-schema-1273>"
          },
          {
            "type": "object",
            "title": "Wind Alarm",
            "required": [
              "id",
              "type",
              "title",
              "datapoint_type",
              "function_ref"
            ],
            "properties": {
              "id": {
                "type": "string",
                "format": "uuid",
                "x-parser-schema-id": "<anonymous-schema-1280>"
              },
              "type": {
                "const": "mac#WindAlarm",
                "x-parser-schema-id": "<anonymous-schema-1281>"
              },
              "title": {
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1282>"
              },
              "datapoint_type": {
                "const": "urn:knx:dpt.alarm",
                "x-parser-schema-id": "<anonymous-schema-1283>"
              },
              "function_ref": {
                "type": "string",
                "format": "uuid",
                "x-parser-schema-id": "<anonymous-schema-1284>"
              }
            },
            "additionalProperties": false,
            "x-parser-schema-id": "<anonymous-schema-1279>"
          }
        ],
        "x-parser-schema-id": "functionpoint"
      },
      "functionpoint-write": {
        "oneOf": [
          {
            "type": "object",
            "title": "write: Blinds Move Up Down",
            "required": [
              "datapoint_type",
              "id",
              "type",
              "value"
            ],
            "properties": {
              "datapoint_type": {
                "const": "urn:knx:dpt.upDown",
                "x-parser-schema-id": "<anonymous-schema-1286>"
              },
              "id": {
                "format": "uuid",
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1287>"
              },
              "type": {
                "const": "mac#BlindsMoveUpDown",
                "x-parser-schema-id": "<anonymous-schema-1288>"
              },
              "value": {
                "enum": [
                  "off",
                  "on"
                ],
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1289>"
              }
            },
            "additionalProperties": false,
            "x-parser-schema-id": "<anonymous-schema-1285>"
          },
          {
            "type": "object",
            "title": "write: Blinds Position Length",
            "required": [
              "datapoint_type",
              "id",
              "type",
              "value"
            ],
            "properties": {
              "datapoint_type": {
                "const": "urn:knx:dpt.lengthmm",
                "x-parser-schema-id": "<anonymous-schema-1291>"
              },
              "id": {
                "format": "uuid",
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1292>"
              },
              "type": {
                "const": "mac#BlindsPositionLength",
                "x-parser-schema-id": "<anonymous-schema-1293>"
              },
              "value": {
                "enum": [
                  "off",
                  "on"
                ],
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1294>"
              }
            },
            "additionalProperties": false,
            "x-parser-schema-id": "<anonymous-schema-1290>"
          },
          {
            "type": "object",
            "title": "write: Blinds Position Percentage",
            "required": [
              "datapoint_type",
              "id",
              "type",
              "value"
            ],
            "properties": {
              "datapoint_type": {
                "const": "urn:knx:dpt.scaling",
                "x-parser-schema-id": "<anonymous-schema-1296>"
              },
              "id": {
                "format": "uuid",
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1297>"
              },
              "type": {
                "const": "mac#BlindsPositionPercentage",
                "x-parser-schema-id": "<anonymous-schema-1298>"
              },
              "value": {
                "enum": [
                  "off",
                  "on"
                ],
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1299>"
              }
            },
            "additionalProperties": false,
            "x-parser-schema-id": "<anonymous-schema-1295>"
          },
          {
            "type": "object",
            "title": "write: Blinds Slat Position Degrees",
            "required": [
              "datapoint_type",
              "id",
              "type",
              "value"
            ],
            "properties": {
              "datapoint_type": {
                "const": "urn:knx:dpt.rotationAngle",
                "x-parser-schema-id": "<anonymous-schema-1301>"
              },
              "id": {
                "format": "uuid",
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1302>"
              },
              "type": {
                "const": "mac#BlindsSlatPositionDegrees",
                "x-parser-schema-id": "<anonymous-schema-1303>"
              },
              "value": {
                "enum": [
                  "off",
                  "on"
                ],
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1304>"
              }
            },
            "additionalProperties": false,
            "x-parser-schema-id": "<anonymous-schema-1300>"
          },
          {
            "type": "object",
            "title": "write: Blinds Slat Position Percentage",
            "required": [
              "datapoint_type",
              "id",
              "type",
              "value"
            ],
            "properties": {
              "datapoint_type": {
                "const": "urn:knx:dpt.scaling",
                "x-parser-schema-id": "<anonymous-schema-1306>"
              },
              "id": {
                "format": "uuid",
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1307>"
              },
              "type": {
                "const": "mac#BlindsSlatPositionPercentage",
                "x-parser-schema-id": "<anonymous-schema-1308>"
              },
              "value": {
                "enum": [
                  "off",
                  "on"
                ],
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1309>"
              }
            },
            "additionalProperties": false,
            "x-parser-schema-id": "<anonymous-schema-1305>"
          },
          {
            "type": "object",
            "title": "write: Blinds Status",
            "required": [
              "datapoint_type",
              "id",
              "type",
              "value"
            ],
            "properties": {
              "datapoint_type": {
                "const": "urn:knx:dpt.upDown",
                "x-parser-schema-id": "<anonymous-schema-1311>"
              },
              "id": {
                "format": "uuid",
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1312>"
              },
              "type": {
                "const": "mac#BlindsStatus",
                "x-parser-schema-id": "<anonymous-schema-1313>"
              },
              "value": {
                "enum": [
                  "off",
                  "on"
                ],
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1314>"
              }
            },
            "additionalProperties": false,
            "x-parser-schema-id": "<anonymous-schema-1310>"
          },
          {
            "type": "object",
            "title": "write: Blinds Stop Step",
            "required": [
              "datapoint_type",
              "id",
              "type",
              "value"
            ],
            "properties": {
              "datapoint_type": {
                "const": "urn:knx:dpt.step",
                "x-parser-schema-id": "<anonymous-schema-1316>"
              },
              "id": {
                "format": "uuid",
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1317>"
              },
              "type": {
                "const": "mac#BlindsStopStep",
                "x-parser-schema-id": "<anonymous-schema-1318>"
              },
              "value": {
                "enum": [
                  "off",
                  "on"
                ],
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1319>"
              }
            },
            "additionalProperties": false,
            "x-parser-schema-id": "<anonymous-schema-1315>"
          },
          {
            "type": "object",
            "title": "write: Blinds Stop Trigger",
            "required": [
              "datapoint_type",
              "id",
              "type",
              "value"
            ],
            "properties": {
              "datapoint_type": {
                "const": "urn:knx:dpt.trigger",
                "x-parser-schema-id": "<anonymous-schema-1321>"
              },
              "id": {
                "format": "uuid",
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1322>"
              },
              "type": {
                "const": "mac#BlindsStopTrigger",
                "x-parser-schema-id": "<anonymous-schema-1323>"
              },
              "value": {
                "enum": [
                  "off",
                  "on"
                ],
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1324>"
              }
            },
            "additionalProperties": false,
            "x-parser-schema-id": "<anonymous-schema-1320>"
          },
          {
            "type": "object",
            "title": "write: Current Date",
            "required": [
              "datapoint_type",
              "id",
              "type",
              "value"
            ],
            "properties": {
              "datapoint_type": {
                "const": "urn:knx:dpt.date",
                "x-parser-schema-id": "<anonymous-schema-1326>"
              },
              "id": {
                "format": "uuid",
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1327>"
              },
              "type": {
                "const": "mac#CurrentDate",
                "x-parser-schema-id": "<anonymous-schema-1328>"
              },
              "value": {
                "enum": [
                  "off",
                  "on"
                ],
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1329>"
              }
            },
            "additionalProperties": false,
            "x-parser-schema-id": "<anonymous-schema-1325>"
          },
          {
            "type": "object",
            "title": "write: Current Date and Time",
            "required": [
              "datapoint_type",
              "id",
              "type",
              "value"
            ],
            "properties": {
              "datapoint_type": {
                "const": "urn:knx:dpt.dateTime",
                "x-parser-schema-id": "<anonymous-schema-1331>"
              },
              "id": {
                "format": "uuid",
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1332>"
              },
              "type": {
                "const": "mac#CurrentDateAndTime",
                "x-parser-schema-id": "<anonymous-schema-1333>"
              },
              "value": {
                "enum": [
                  "off",
                  "on"
                ],
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1334>"
              }
            },
            "additionalProperties": false,
            "x-parser-schema-id": "<anonymous-schema-1330>"
          },
          {
            "type": "object",
            "title": "write: Current Time",
            "required": [
              "datapoint_type",
              "id",
              "type",
              "value"
            ],
            "properties": {
              "datapoint_type": {
                "const": "urn:knx:dpt.timeOfDay",
                "x-parser-schema-id": "<anonymous-schema-1336>"
              },
              "id": {
                "format": "uuid",
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1337>"
              },
              "type": {
                "const": "mac#CurrentTime",
                "x-parser-schema-id": "<anonymous-schema-1338>"
              },
              "value": {
                "enum": [
                  "off",
                  "on"
                ],
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1339>"
              }
            },
            "additionalProperties": false,
            "x-parser-schema-id": "<anonymous-schema-1335>"
          },
          {
            "type": "object",
            "title": "write: Frost Alarm",
            "required": [
              "datapoint_type",
              "id",
              "type",
              "value"
            ],
            "properties": {
              "datapoint_type": {
                "const": "urn:knx:dpt.alarm",
                "x-parser-schema-id": "<anonymous-schema-1341>"
              },
              "id": {
                "format": "uuid",
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1342>"
              },
              "type": {
                "const": "mac#FrostAlarm",
                "x-parser-schema-id": "<anonymous-schema-1343>"
              },
              "value": {
                "enum": [
                  "off",
                  "on"
                ],
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1344>"
              }
            },
            "additionalProperties": false,
            "x-parser-schema-id": "<anonymous-schema-1340>"
          },
          {
            "type": "object",
            "title": "write: Light Absolute Setvalue Request",
            "required": [
              "datapoint_type",
              "id",
              "type",
              "value"
            ],
            "properties": {
              "datapoint_type": {
                "const": "urn:knx:dpt.scaling",
                "x-parser-schema-id": "<anonymous-schema-1346>"
              },
              "id": {
                "format": "uuid",
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1347>"
              },
              "type": {
                "const": "mac#LightAbsoluteSetvalueRequest",
                "x-parser-schema-id": "<anonymous-schema-1348>"
              },
              "value": {
                "enum": [
                  "off",
                  "on"
                ],
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1349>"
              }
            },
            "additionalProperties": false,
            "x-parser-schema-id": "<anonymous-schema-1345>"
          },
          {
            "type": "object",
            "title": "write: Light Current Dimming Value",
            "required": [
              "datapoint_type",
              "id",
              "type",
              "value"
            ],
            "properties": {
              "datapoint_type": {
                "const": "urn:knx:dpt.scaling",
                "x-parser-schema-id": "<anonymous-schema-1351>"
              },
              "id": {
                "format": "uuid",
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1352>"
              },
              "type": {
                "const": "mac#LightCurrentDimmingValue",
                "x-parser-schema-id": "<anonymous-schema-1353>"
              },
              "value": {
                "enum": [
                  "off",
                  "on"
                ],
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1354>"
              }
            },
            "additionalProperties": false,
            "x-parser-schema-id": "<anonymous-schema-1350>"
          },
          {
            "type": "object",
            "title": "write: Light Current Status",
            "required": [
              "datapoint_type",
              "id",
              "type",
              "value"
            ],
            "properties": {
              "datapoint_type": {
                "const": "urn:knx:dpt.switch",
                "x-parser-schema-id": "<anonymous-schema-1356>"
              },
              "id": {
                "format": "uuid",
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1357>"
              },
              "type": {
                "const": "mac#LightCurrentStatus",
                "x-parser-schema-id": "<anonymous-schema-1358>"
              },
              "value": {
                "enum": [
                  "off",
                  "on"
                ],
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1359>"
              }
            },
            "additionalProperties": false,
            "x-parser-schema-id": "<anonymous-schema-1355>"
          },
          {
            "type": "object",
            "title": "write: Light Relative Dimming Request",
            "required": [
              "datapoint_type",
              "id",
              "type",
              "value"
            ],
            "properties": {
              "datapoint_type": {
                "const": "urn:knx:dpt.controlDimming",
                "x-parser-schema-id": "<anonymous-schema-1361>"
              },
              "id": {
                "format": "uuid",
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1362>"
              },
              "type": {
                "const": "mac#LightRelativeDimmingRequest",
                "x-parser-schema-id": "<anonymous-schema-1363>"
              },
              "value": {
                "enum": [
                  "off",
                  "on"
                ],
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1364>"
              }
            },
            "additionalProperties": false,
            "x-parser-schema-id": "<anonymous-schema-1360>"
          },
          {
            "type": "object",
            "title": "write: Light Switch Request",
            "required": [
              "datapoint_type",
              "id",
              "type",
              "value"
            ],
            "properties": {
              "datapoint_type": {
                "const": "urn:knx:dpt.switch",
                "x-parser-schema-id": "<anonymous-schema-1366>"
              },
              "id": {
                "format": "uuid",
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1367>"
              },
              "type": {
                "const": "mac#LightSwitchRequest",
                "x-parser-schema-id": "<anonymous-schema-1368>"
              },
              "value": {
                "enum": [
                  "off",
                  "on"
                ],
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1369>"
              }
            },
            "additionalProperties": false,
            "x-parser-schema-id": "<anonymous-schema-1365>"
          },
          {
            "type": "object",
            "title": "write: Rain Alarm",
            "required": [
              "datapoint_type",
              "id",
              "type",
              "value"
            ],
            "properties": {
              "datapoint_type": {
                "const": "urn:knx:dpt.alarm",
                "x-parser-schema-id": "<anonymous-schema-1371>"
              },
              "id": {
                "format": "uuid",
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1372>"
              },
              "type": {
                "const": "mac#RainAlarm",
                "x-parser-schema-id": "<anonymous-schema-1373>"
              },
              "value": {
                "enum": [
                  "off",
                  "on"
                ],
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1374>"
              }
            },
            "additionalProperties": false,
            "x-parser-schema-id": "<anonymous-schema-1370>"
          },
          {
            "type": "object",
            "title": "write: Relation to GMT",
            "required": [
              "datapoint_type",
              "id",
              "type",
              "value"
            ],
            "properties": {
              "datapoint_type": {
                "const": "urn:knx:dpt.deltaTimeMin",
                "x-parser-schema-id": "<anonymous-schema-1376>"
              },
              "id": {
                "format": "uuid",
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1377>"
              },
              "type": {
                "const": "mac#RelationToGMT",
                "x-parser-schema-id": "<anonymous-schema-1378>"
              },
              "value": {
                "enum": [
                  "off",
                  "on"
                ],
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1379>"
              }
            },
            "additionalProperties": false,
            "x-parser-schema-id": "<anonymous-schema-1375>"
          },
          {
            "type": "object",
            "title": "write: Shutter Move Up Down",
            "required": [
              "datapoint_type",
              "id",
              "type",
              "value"
            ],
            "properties": {
              "datapoint_type": {
                "const": "urn:knx:dpt.upDown",
                "x-parser-schema-id": "<anonymous-schema-1381>"
              },
              "id": {
                "format": "uuid",
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1382>"
              },
              "type": {
                "const": "mac#ShutterMoveUpDown",
                "x-parser-schema-id": "<anonymous-schema-1383>"
              },
              "value": {
                "enum": [
                  "off",
                  "on"
                ],
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1384>"
              }
            },
            "additionalProperties": false,
            "x-parser-schema-id": "<anonymous-schema-1380>"
          },
          {
            "type": "object",
            "title": "write: Shutter Position Length",
            "required": [
              "datapoint_type",
              "id",
              "type",
              "value"
            ],
            "properties": {
              "datapoint_type": {
                "const": "urn:knx:dpt.lengthmm",
                "x-parser-schema-id": "<anonymous-schema-1386>"
              },
              "id": {
                "format": "uuid",
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1387>"
              },
              "type": {
                "const": "mac#ShutterPositionLength",
                "x-parser-schema-id": "<anonymous-schema-1388>"
              },
              "value": {
                "enum": [
                  "off",
                  "on"
                ],
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1389>"
              }
            },
            "additionalProperties": false,
            "x-parser-schema-id": "<anonymous-schema-1385>"
          },
          {
            "type": "object",
            "title": "write: Shutter Position Percentage",
            "required": [
              "datapoint_type",
              "id",
              "type",
              "value"
            ],
            "properties": {
              "datapoint_type": {
                "const": "urn:knx:dpt.scaling",
                "x-parser-schema-id": "<anonymous-schema-1391>"
              },
              "id": {
                "format": "uuid",
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1392>"
              },
              "type": {
                "const": "mac#ShutterPositionPercentage",
                "x-parser-schema-id": "<anonymous-schema-1393>"
              },
              "value": {
                "enum": [
                  "off",
                  "on"
                ],
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1394>"
              }
            },
            "additionalProperties": false,
            "x-parser-schema-id": "<anonymous-schema-1390>"
          },
          {
            "type": "object",
            "title": "write: Shutter Status",
            "required": [
              "datapoint_type",
              "id",
              "type",
              "value"
            ],
            "properties": {
              "datapoint_type": {
                "const": "urn:knx:dpt.upDown",
                "x-parser-schema-id": "<anonymous-schema-1396>"
              },
              "id": {
                "format": "uuid",
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1397>"
              },
              "type": {
                "const": "mac#ShutterStatus",
                "x-parser-schema-id": "<anonymous-schema-1398>"
              },
              "value": {
                "enum": [
                  "off",
                  "on"
                ],
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1399>"
              }
            },
            "additionalProperties": false,
            "x-parser-schema-id": "<anonymous-schema-1395>"
          },
          {
            "type": "object",
            "title": "write: Shutter Stop Step",
            "required": [
              "datapoint_type",
              "id",
              "type",
              "value"
            ],
            "properties": {
              "datapoint_type": {
                "const": "urn:knx:dpt.step",
                "x-parser-schema-id": "<anonymous-schema-1401>"
              },
              "id": {
                "format": "uuid",
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1402>"
              },
              "type": {
                "const": "mac#ShutterStopStep",
                "x-parser-schema-id": "<anonymous-schema-1403>"
              },
              "value": {
                "enum": [
                  "off",
                  "on"
                ],
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1404>"
              }
            },
            "additionalProperties": false,
            "x-parser-schema-id": "<anonymous-schema-1400>"
          },
          {
            "type": "object",
            "title": "write: Shutter Stop Trigger",
            "required": [
              "datapoint_type",
              "id",
              "type",
              "value"
            ],
            "properties": {
              "datapoint_type": {
                "const": "urn:knx:dpt.trigger",
                "x-parser-schema-id": "<anonymous-schema-1406>"
              },
              "id": {
                "format": "uuid",
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1407>"
              },
              "type": {
                "const": "mac#ShutterStopTrigger",
                "x-parser-schema-id": "<anonymous-schema-1408>"
              },
              "value": {
                "enum": [
                  "off",
                  "on"
                ],
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1409>"
              }
            },
            "additionalProperties": false,
            "x-parser-schema-id": "<anonymous-schema-1405>"
          },
          {
            "type": "object",
            "title": "write: Wind Alarm",
            "required": [
              "datapoint_type",
              "id",
              "type",
              "value"
            ],
            "properties": {
              "datapoint_type": {
                "const": "urn:knx:dpt.alarm",
                "x-parser-schema-id": "<anonymous-schema-1411>"
              },
              "id": {
                "format": "uuid",
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1412>"
              },
              "type": {
                "const": "mac#WindAlarm",
                "x-parser-schema-id": "<anonymous-schema-1413>"
              },
              "value": {
                "enum": [
                  "off",
                  "on"
                ],
                "type": "string",
                "x-parser-schema-id": "<anonymous-schema-1414>"
              }
            },
            "additionalProperties": false,
            "x-parser-schema-id": "<anonymous-schema-1410>"
          }
        ],
        "x-parser-schema-id": "functionpoint-write"
      },
      "functions": {
        "type": "array",
        "items": {
          "oneOf": [
            {
              "type": "object",
              "title": "User Blinds Control",
              "required": [
                "id",
                "type",
                "trade",
                "name",
                "function_points",
                "function_location"
              ],
              "properties": {
                "id": {
                  "format": "uuid",
                  "type": "string",
                  "x-parser-schema-id": "<anonymous-schema-1417>"
                },
                "type": {
                  "const": "urn:knx:fct.blinds",
                  "x-parser-schema-id": "<anonymous-schema-1418>"
                },
                "trade": {
                  "const": "tag#shading",
                  "x-parser-schema-id": "<anonymous-schema-1419>"
                },
                "name": {
                  "type": "string",
                  "x-parser-schema-id": "<anonymous-schema-1420>"
                },
                "function_points": {
                  "additionalProperties": false,
                  "properties": {
                    "mac#BlindsMoveUpDown": {
                      "format": "uuid",
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-1422>"
                    },
                    "mac#BlindsPositionLength": {
                      "format": "uuid",
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-1423>"
                    },
                    "mac#BlindsPositionPercentage": {
                      "format": "uuid",
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-1424>"
                    },
                    "mac#BlindsSlatPositionDegrees": {
                      "format": "uuid",
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-1425>"
                    },
                    "mac#BlindsSlatPositionPercentage": {
                      "format": "uuid",
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-1426>"
                    },
                    "mac#BlindsStatus": {
                      "format": "uuid",
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-1427>"
                    },
                    "mac#BlindsStopStep": {
                      "format": "uuid",
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-1428>"
                    },
                    "mac#BlindsStopTrigger": {
                      "format": "uuid",
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-1429>"
                    },
                    "mac#FrostAlarm": {
                      "format": "uuid",
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-1430>"
                    },
                    "mac#RainAlarm": {
                      "format": "uuid",
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-1431>"
                    },
                    "mac#WindAlarm": {
                      "format": "uuid",
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-1432>"
                    }
                  },
                  "required": [
                    "mac#BlindsMoveUpDown",
                    "mac#BlindsPositionLength",
                    "mac#BlindsPositionPercentage",
                    "mac#BlindsSlatPositionDegrees",
                    "mac#BlindsSlatPositionPercentage",
                    "mac#BlindsStatus",
                    "mac#BlindsStopStep",
                    "mac#BlindsStopTrigger",
                    "mac#FrostAlarm",
                    "mac#RainAlarm",
                    "mac#WindAlarm"
                  ],
                  "type": "object",
                  "x-parser-schema-id": "<anonymous-schema-1421>"
                },
                "function_location": {
                  "format": "uuid",
                  "type": "string",
                  "x-parser-schema-id": "<anonymous-schema-1433>"
                }
              },
              "additionalProperties": false,
              "x-parser-schema-id": "<anonymous-schema-1416>"
            },
            {
              "type": "object",
              "title": "User Light Dimming",
              "required": [
                "id",
                "type",
                "trade",
                "name",
                "function_points",
                "function_location"
              ],
              "properties": {
                "id": {
                  "format": "uuid",
                  "type": "string",
                  "x-parser-schema-id": "<anonymous-schema-1435>"
                },
                "type": {
                  "const": "urn:knx:fct.dimLight",
                  "x-parser-schema-id": "<anonymous-schema-1436>"
                },
                "trade": {
                  "const": "tag#lighting",
                  "x-parser-schema-id": "<anonymous-schema-1437>"
                },
                "name": {
                  "type": "string",
                  "x-parser-schema-id": "<anonymous-schema-1438>"
                },
                "function_points": {
                  "additionalProperties": false,
                  "properties": {
                    "mac#LightAbsoluteSetvalueRequest": {
                      "format": "uuid",
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-1440>"
                    },
                    "mac#LightCurrentDimmingValue": {
                      "format": "uuid",
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-1441>"
                    },
                    "mac#LightRelativeDimmingRequest": {
                      "format": "uuid",
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-1442>"
                    },
                    "mac#LightCurrentStatus": {
                      "format": "uuid",
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-1443>"
                    },
                    "mac#LightSwitchRequest": {
                      "format": "uuid",
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-1444>"
                    }
                  },
                  "required": [
                    "mac#LightAbsoluteSetvalueRequest",
                    "mac#LightCurrentDimmingValue",
                    "mac#LightRelativeDimmingRequest",
                    "mac#LightCurrentStatus",
                    "mac#LightSwitchRequest"
                  ],
                  "type": "object",
                  "x-parser-schema-id": "<anonymous-schema-1439>"
                },
                "function_location": {
                  "format": "uuid",
                  "type": "string",
                  "x-parser-schema-id": "<anonymous-schema-1445>"
                }
              },
              "additionalProperties": false,
              "x-parser-schema-id": "<anonymous-schema-1434>"
            },
            {
              "type": "object",
              "title": "User Shutter Control",
              "required": [
                "id",
                "type",
                "trade",
                "name",
                "function_points",
                "function_location"
              ],
              "properties": {
                "id": {
                  "format": "uuid",
                  "type": "string",
                  "x-parser-schema-id": "<anonymous-schema-1447>"
                },
                "type": {
                  "const": "urn:knx:fct.shutter",
                  "x-parser-schema-id": "<anonymous-schema-1448>"
                },
                "trade": {
                  "const": "tag#shading",
                  "x-parser-schema-id": "<anonymous-schema-1449>"
                },
                "name": {
                  "type": "string",
                  "x-parser-schema-id": "<anonymous-schema-1450>"
                },
                "function_points": {
                  "additionalProperties": false,
                  "properties": {
                    "mac#FrostAlarm": {
                      "format": "uuid",
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-1452>"
                    },
                    "mac#RainAlarm": {
                      "format": "uuid",
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-1453>"
                    },
                    "mac#ShutterMoveUpDown": {
                      "format": "uuid",
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-1454>"
                    },
                    "mac#ShutterPositionLength": {
                      "format": "uuid",
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-1455>"
                    },
                    "mac#ShutterPositionPercentage": {
                      "format": "uuid",
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-1456>"
                    },
                    "mac#ShutterStatus": {
                      "format": "uuid",
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-1457>"
                    },
                    "mac#ShutterStopStep": {
                      "format": "uuid",
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-1458>"
                    },
                    "mac#ShutterStopTrigger": {
                      "format": "uuid",
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-1459>"
                    },
                    "mac#WindAlarm": {
                      "format": "uuid",
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-1460>"
                    }
                  },
                  "required": [
                    "mac#FrostAlarm",
                    "mac#RainAlarm",
                    "mac#ShutterMoveUpDown",
                    "mac#ShutterPositionLength",
                    "mac#ShutterPositionPercentage",
                    "mac#ShutterStatus",
                    "mac#ShutterStopStep",
                    "mac#ShutterStopTrigger",
                    "mac#WindAlarm"
                  ],
                  "type": "object",
                  "x-parser-schema-id": "<anonymous-schema-1451>"
                },
                "function_location": {
                  "format": "uuid",
                  "type": "string",
                  "x-parser-schema-id": "<anonymous-schema-1461>"
                }
              },
              "additionalProperties": false,
              "x-parser-schema-id": "<anonymous-schema-1446>"
            },
            {
              "type": "object",
              "title": "User Light Switching",
              "required": [
                "id",
                "type",
                "trade",
                "name",
                "function_points",
                "function_location"
              ],
              "properties": {
                "id": {
                  "format": "uuid",
                  "type": "string",
                  "x-parser-schema-id": "<anonymous-schema-1463>"
                },
                "type": {
                  "const": "urn:knx:fct.switchLight",
                  "x-parser-schema-id": "<anonymous-schema-1464>"
                },
                "trade": {
                  "const": "tag#lighting",
                  "x-parser-schema-id": "<anonymous-schema-1465>"
                },
                "name": {
                  "type": "string",
                  "x-parser-schema-id": "<anonymous-schema-1466>"
                },
                "function_points": {
                  "additionalProperties": false,
                  "properties": {
                    "mac#LightCurrentStatus": {
                      "format": "uuid",
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-1468>"
                    },
                    "mac#LightSwitchRequest": {
                      "format": "uuid",
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-1469>"
                    }
                  },
                  "required": [
                    "mac#LightCurrentStatus",
                    "mac#LightSwitchRequest"
                  ],
                  "type": "object",
                  "x-parser-schema-id": "<anonymous-schema-1467>"
                },
                "function_location": {
                  "format": "uuid",
                  "type": "string",
                  "x-parser-schema-id": "<anonymous-schema-1470>"
                }
              },
              "additionalProperties": false,
              "x-parser-schema-id": "<anonymous-schema-1462>"
            },
            {
              "type": "object",
              "title": "System Clock",
              "required": [
                "id",
                "type",
                "trade",
                "name",
                "function_points",
                "function_location"
              ],
              "properties": {
                "id": {
                  "format": "uuid",
                  "type": "string",
                  "x-parser-schema-id": "<anonymous-schema-1472>"
                },
                "type": {
                  "const": "urn:knx:fct.systemClock",
                  "x-parser-schema-id": "<anonymous-schema-1473>"
                },
                "trade": {
                  "const": null,
                  "x-parser-schema-id": "<anonymous-schema-1474>"
                },
                "name": {
                  "type": "string",
                  "x-parser-schema-id": "<anonymous-schema-1475>"
                },
                "function_points": {
                  "additionalProperties": false,
                  "properties": {
                    "mac#CurrentDate": {
                      "format": "uuid",
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-1477>"
                    },
                    "mac#CurrentDateAndTime": {
                      "format": "uuid",
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-1478>"
                    },
                    "mac#CurrentTime": {
                      "format": "uuid",
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-1479>"
                    },
                    "mac#RelationToGMT": {
                      "format": "uuid",
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-1480>"
                    }
                  },
                  "required": [
                    "mac#CurrentDate",
                    "mac#CurrentDateAndTime",
                    "mac#CurrentTime",
                    "mac#RelationToGMT"
                  ],
                  "type": "object",
                  "x-parser-schema-id": "<anonymous-schema-1476>"
                },
                "function_location": {
                  "format": "uuid",
                  "type": "string",
                  "x-parser-schema-id": "<anonymous-schema-1481>"
                }
              },
              "additionalProperties": false,
              "x-parser-schema-id": "<anonymous-schema-1471>"
            }
          ],
          "x-parser-schema-id": "<anonymous-schema-1415>"
        },
        "x-parser-schema-id": "functions"
      },
      "functionpoints": {
        "type": "array",
        "items": {
          "oneOf": [
            {
              "type": "object",
              "title": "Blinds Move Up Down",
              "required": [
                "id",
                "type",
                "title",
                "datapoint_type",
                "function_ref"
              ],
              "properties": {
                "id": {
                  "type": "string",
                  "format": "uuid",
                  "x-parser-schema-id": "<anonymous-schema-1484>"
                },
                "type": {
                  "const": "mac#BlindsMoveUpDown",
                  "x-parser-schema-id": "<anonymous-schema-1485>"
                },
                "title": {
                  "type": "string",
                  "x-parser-schema-id": "<anonymous-schema-1486>"
                },
                "datapoint_type": {
                  "const": "urn:knx:dpt.upDown",
                  "x-parser-schema-id": "<anonymous-schema-1487>"
                },
                "function_ref": {
                  "type": "string",
                  "format": "uuid",
                  "x-parser-schema-id": "<anonymous-schema-1488>"
                }
              },
              "additionalProperties": false,
              "x-parser-schema-id": "<anonymous-schema-1483>"
            },
            {
              "type": "object",
              "title": "Blinds Position Length",
              "required": [
                "id",
                "type",
                "title",
                "datapoint_type",
                "function_ref"
              ],
              "properties": {
                "id": {
                  "type": "string",
                  "format": "uuid",
                  "x-parser-schema-id": "<anonymous-schema-1490>"
                },
                "type": {
                  "const": "mac#BlindsPositionLength",
                  "x-parser-schema-id": "<anonymous-schema-1491>"
                },
                "title": {
                  "type": "string",
                  "x-parser-schema-id": "<anonymous-schema-1492>"
                },
                "datapoint_type": {
                  "const": "urn:knx:dpt.lengthmm",
                  "x-parser-schema-id": "<anonymous-schema-1493>"
                },
                "function_ref": {
                  "type": "string",
                  "format": "uuid",
                  "x-parser-schema-id": "<anonymous-schema-1494>"
                }
              },
              "additionalProperties": false,
              "x-parser-schema-id": "<anonymous-schema-1489>"
            },
            {
              "type": "object",
              "title": "Blinds Position Percentage",
              "required": [
                "id",
                "type",
                "title",
                "datapoint_type",
                "function_ref"
              ],
              "properties": {
                "id": {
                  "type": "string",
                  "format": "uuid",
                  "x-parser-schema-id": "<anonymous-schema-1496>"
                },
                "type": {
                  "const": "mac#BlindsPositionPercentage",
                  "x-parser-schema-id": "<anonymous-schema-1497>"
                },
                "title": {
                  "type": "string",
                  "x-parser-schema-id": "<anonymous-schema-1498>"
                },
                "datapoint_type": {
                  "const": "urn:knx:dpt.scaling",
                  "x-parser-schema-id": "<anonymous-schema-1499>"
                },
                "function_ref": {
                  "type": "string",
                  "format": "uuid",
                  "x-parser-schema-id": "<anonymous-schema-1500>"
                }
              },
              "additionalProperties": false,
              "x-parser-schema-id": "<anonymous-schema-1495>"
            },
            {
              "type": "object",
              "title": "Blinds Slat Position Degrees",
              "required": [
                "id",
                "type",
                "title",
                "datapoint_type",
                "function_ref"
              ],
              "properties": {
                "id": {
                  "type": "string",
                  "format": "uuid",
                  "x-parser-schema-id": "<anonymous-schema-1502>"
                },
                "type": {
                  "const": "mac#BlindsSlatPositionDegrees",
                  "x-parser-schema-id": "<anonymous-schema-1503>"
                },
                "title": {
                  "type": "string",
                  "x-parser-schema-id": "<anonymous-schema-1504>"
                },
                "datapoint_type": {
                  "const": "urn:knx:dpt.rotationAngle",
                  "x-parser-schema-id": "<anonymous-schema-1505>"
                },
                "function_ref": {
                  "type": "string",
                  "format": "uuid",
                  "x-parser-schema-id": "<anonymous-schema-1506>"
                }
              },
              "additionalProperties": false,
              "x-parser-schema-id": "<anonymous-schema-1501>"
            },
            {
              "type": "object",
              "title": "Blinds Slat Position Percentage",
              "required": [
                "id",
                "type",
                "title",
                "datapoint_type",
                "function_ref"
              ],
              "properties": {
                "id": {
                  "type": "string",
                  "format": "uuid",
                  "x-parser-schema-id": "<anonymous-schema-1508>"
                },
                "type": {
                  "const": "mac#BlindsSlatPositionPercentage",
                  "x-parser-schema-id": "<anonymous-schema-1509>"
                },
                "title": {
                  "type": "string",
                  "x-parser-schema-id": "<anonymous-schema-1510>"
                },
                "datapoint_type": {
                  "const": "urn:knx:dpt.scaling",
                  "x-parser-schema-id": "<anonymous-schema-1511>"
                },
                "function_ref": {
                  "type": "string",
                  "format": "uuid",
                  "x-parser-schema-id": "<anonymous-schema-1512>"
                }
              },
              "additionalProperties": false,
              "x-parser-schema-id": "<anonymous-schema-1507>"
            },
            {
              "type": "object",
              "title": "Blinds Status",
              "required": [
                "id",
                "type",
                "title",
                "datapoint_type",
                "function_ref"
              ],
              "properties": {
                "id": {
                  "type": "string",
                  "format": "uuid",
                  "x-parser-schema-id": "<anonymous-schema-1514>"
                },
                "type": {
                  "const": "mac#BlindsStatus",
                  "x-parser-schema-id": "<anonymous-schema-1515>"
                },
                "title": {
                  "type": "string",
                  "x-parser-schema-id": "<anonymous-schema-1516>"
                },
                "datapoint_type": {
                  "const": "urn:knx:dpt.upDown",
                  "x-parser-schema-id": "<anonymous-schema-1517>"
                },
                "function_ref": {
                  "type": "string",
                  "format": "uuid",
                  "x-parser-schema-id": "<anonymous-schema-1518>"
                }
              },
              "additionalProperties": false,
              "x-parser-schema-id": "<anonymous-schema-1513>"
            },
            {
              "type": "object",
              "title": "Blinds Stop Step",
              "required": [
                "id",
                "type",
                "title",
                "datapoint_type",
                "function_ref"
              ],
              "properties": {
                "id": {
                  "type": "string",
                  "format": "uuid",
                  "x-parser-schema-id": "<anonymous-schema-1520>"
                },
                "type": {
                  "const": "mac#BlindsStopStep",
                  "x-parser-schema-id": "<anonymous-schema-1521>"
                },
                "title": {
                  "type": "string",
                  "x-parser-schema-id": "<anonymous-schema-1522>"
                },
                "datapoint_type": {
                  "const": "urn:knx:dpt.step",
                  "x-parser-schema-id": "<anonymous-schema-1523>"
                },
                "function_ref": {
                  "type": "string",
                  "format": "uuid",
                  "x-parser-schema-id": "<anonymous-schema-1524>"
                }
              },
              "additionalProperties": false,
              "x-parser-schema-id": "<anonymous-schema-1519>"
            },
            {
              "type": "object",
              "title": "Blinds Stop Trigger",
              "required": [
                "id",
                "type",
                "title",
                "datapoint_type",
                "function_ref"
              ],
              "properties": {
                "id": {
                  "type": "string",
                  "format": "uuid",
                  "x-parser-schema-id": "<anonymous-schema-1526>"
                },
                "type": {
                  "const": "mac#BlindsStopTrigger",
                  "x-parser-schema-id": "<anonymous-schema-1527>"
                },
                "title": {
                  "type": "string",
                  "x-parser-schema-id": "<anonymous-schema-1528>"
                },
                "datapoint_type": {
                  "const": "urn:knx:dpt.trigger",
                  "x-parser-schema-id": "<anonymous-schema-1529>"
                },
                "function_ref": {
                  "type": "string",
                  "format": "uuid",
                  "x-parser-schema-id": "<anonymous-schema-1530>"
                }
              },
              "additionalProperties": false,
              "x-parser-schema-id": "<anonymous-schema-1525>"
            },
            {
              "type": "object",
              "title": "Current Date",
              "required": [
                "id",
                "type",
                "title",
                "datapoint_type",
                "function_ref"
              ],
              "properties": {
                "id": {
                  "type": "string",
                  "format": "uuid",
                  "x-parser-schema-id": "<anonymous-schema-1532>"
                },
                "type": {
                  "const": "mac#CurrentDate",
                  "x-parser-schema-id": "<anonymous-schema-1533>"
                },
                "title": {
                  "type": "string",
                  "x-parser-schema-id": "<anonymous-schema-1534>"
                },
                "datapoint_type": {
                  "const": "urn:knx:dpt.date",
                  "x-parser-schema-id": "<anonymous-schema-1535>"
                },
                "function_ref": {
                  "type": "string",
                  "format": "uuid",
                  "x-parser-schema-id": "<anonymous-schema-1536>"
                }
              },
              "additionalProperties": false,
              "x-parser-schema-id": "<anonymous-schema-1531>"
            },
            {
              "type": "object",
              "title": "Current Date and Time",
              "required": [
                "id",
                "type",
                "title",
                "datapoint_type",
                "function_ref"
              ],
              "properties": {
                "id": {
                  "type": "string",
                  "format": "uuid",
                  "x-parser-schema-id": "<anonymous-schema-1538>"
                },
                "type": {
                  "const": "mac#CurrentDateAndTime",
                  "x-parser-schema-id": "<anonymous-schema-1539>"
                },
                "title": {
                  "type": "string",
                  "x-parser-schema-id": "<anonymous-schema-1540>"
                },
                "datapoint_type": {
                  "const": "urn:knx:dpt.dateTime",
                  "x-parser-schema-id": "<anonymous-schema-1541>"
                },
                "function_ref": {
                  "type": "string",
                  "format": "uuid",
                  "x-parser-schema-id": "<anonymous-schema-1542>"
                }
              },
              "additionalProperties": false,
              "x-parser-schema-id": "<anonymous-schema-1537>"
            },
            {
              "type": "object",
              "title": "Current Time",
              "required": [
                "id",
                "type",
                "title",
                "datapoint_type",
                "function_ref"
              ],
              "properties": {
                "id": {
                  "type": "string",
                  "format": "uuid",
                  "x-parser-schema-id": "<anonymous-schema-1544>"
                },
                "type": {
                  "const": "mac#CurrentTime",
                  "x-parser-schema-id": "<anonymous-schema-1545>"
                },
                "title": {
                  "type": "string",
                  "x-parser-schema-id": "<anonymous-schema-1546>"
                },
                "datapoint_type": {
                  "const": "urn:knx:dpt.timeOfDay",
                  "x-parser-schema-id": "<anonymous-schema-1547>"
                },
                "function_ref": {
                  "type": "string",
                  "format": "uuid",
                  "x-parser-schema-id": "<anonymous-schema-1548>"
                }
              },
              "additionalProperties": false,
              "x-parser-schema-id": "<anonymous-schema-1543>"
            },
            {
              "type": "object",
              "title": "Frost Alarm",
              "required": [
                "id",
                "type",
                "title",
                "datapoint_type",
                "function_ref"
              ],
              "properties": {
                "id": {
                  "type": "string",
                  "format": "uuid",
                  "x-parser-schema-id": "<anonymous-schema-1550>"
                },
                "type": {
                  "const": "mac#FrostAlarm",
                  "x-parser-schema-id": "<anonymous-schema-1551>"
                },
                "title": {
                  "type": "string",
                  "x-parser-schema-id": "<anonymous-schema-1552>"
                },
                "datapoint_type": {
                  "const": "urn:knx:dpt.alarm",
                  "x-parser-schema-id": "<anonymous-schema-1553>"
                },
                "function_ref": {
                  "type": "string",
                  "format": "uuid",
                  "x-parser-schema-id": "<anonymous-schema-1554>"
                }
              },
              "additionalProperties": false,
              "x-parser-schema-id": "<anonymous-schema-1549>"
            },
            {
              "type": "object",
              "title": "Light Absolute Setvalue Request",
              "required": [
                "id",
                "type",
                "title",
                "datapoint_type",
                "function_ref"
              ],
              "properties": {
                "id": {
                  "type": "string",
                  "format": "uuid",
                  "x-parser-schema-id": "<anonymous-schema-1556>"
                },
                "type": {
                  "const": "mac#LightAbsoluteSetvalueRequest",
                  "x-parser-schema-id": "<anonymous-schema-1557>"
                },
                "title": {
                  "type": "string",
                  "x-parser-schema-id": "<anonymous-schema-1558>"
                },
                "datapoint_type": {
                  "const": "urn:knx:dpt.scaling",
                  "x-parser-schema-id": "<anonymous-schema-1559>"
                },
                "function_ref": {
                  "type": "string",
                  "format": "uuid",
                  "x-parser-schema-id": "<anonymous-schema-1560>"
                }
              },
              "additionalProperties": false,
              "x-parser-schema-id": "<anonymous-schema-1555>"
            },
            {
              "type": "object",
              "title": "Light Current Dimming Value",
              "required": [
                "id",
                "type",
                "title",
                "datapoint_type",
                "function_ref"
              ],
              "properties": {
                "id": {
                  "type": "string",
                  "format": "uuid",
                  "x-parser-schema-id": "<anonymous-schema-1562>"
                },
                "type": {
                  "const": "mac#LightCurrentDimmingValue",
                  "x-parser-schema-id": "<anonymous-schema-1563>"
                },
                "title": {
                  "type": "string",
                  "x-parser-schema-id": "<anonymous-schema-1564>"
                },
                "datapoint_type": {
                  "const": "urn:knx:dpt.scaling",
                  "x-parser-schema-id": "<anonymous-schema-1565>"
                },
                "function_ref": {
                  "type": "string",
                  "format": "uuid",
                  "x-parser-schema-id": "<anonymous-schema-1566>"
                }
              },
              "additionalProperties": false,
              "x-parser-schema-id": "<anonymous-schema-1561>"
            },
            {
              "type": "object",
              "title": "Light Current Status",
              "required": [
                "id",
                "type",
                "title",
                "datapoint_type",
                "function_ref"
              ],
              "properties": {
                "id": {
                  "type": "string",
                  "format": "uuid",
                  "x-parser-schema-id": "<anonymous-schema-1568>"
                },
                "type": {
                  "const": "mac#LightCurrentStatus",
                  "x-parser-schema-id": "<anonymous-schema-1569>"
                },
                "title": {
                  "type": "string",
                  "x-parser-schema-id": "<anonymous-schema-1570>"
                },
                "datapoint_type": {
                  "const": "urn:knx:dpt.switch",
                  "x-parser-schema-id": "<anonymous-schema-1571>"
                },
                "function_ref": {
                  "type": "string",
                  "format": "uuid",
                  "x-parser-schema-id": "<anonymous-schema-1572>"
                }
              },
              "additionalProperties": false,
              "x-parser-schema-id": "<anonymous-schema-1567>"
            },
            {
              "type": "object",
              "title": "Light Relative Dimming Request",
              "required": [
                "id",
                "type",
                "title",
                "datapoint_type",
                "function_ref"
              ],
              "properties": {
                "id": {
                  "type": "string",
                  "format": "uuid",
                  "x-parser-schema-id": "<anonymous-schema-1574>"
                },
                "type": {
                  "const": "mac#LightRelativeDimmingRequest",
                  "x-parser-schema-id": "<anonymous-schema-1575>"
                },
                "title": {
                  "type": "string",
                  "x-parser-schema-id": "<anonymous-schema-1576>"
                },
                "datapoint_type": {
                  "const": "urn:knx:dpt.controlDimming",
                  "x-parser-schema-id": "<anonymous-schema-1577>"
                },
                "function_ref": {
                  "type": "string",
                  "format": "uuid",
                  "x-parser-schema-id": "<anonymous-schema-1578>"
                }
              },
              "additionalProperties": false,
              "x-parser-schema-id": "<anonymous-schema-1573>"
            },
            {
              "type": "object",
              "title": "Light Switch Request",
              "required": [
                "id",
                "type",
                "title",
                "datapoint_type",
                "function_ref"
              ],
              "properties": {
                "id": {
                  "type": "string",
                  "format": "uuid",
                  "x-parser-schema-id": "<anonymous-schema-1580>"
                },
                "type": {
                  "const": "mac#LightSwitchRequest",
                  "x-parser-schema-id": "<anonymous-schema-1581>"
                },
                "title": {
                  "type": "string",
                  "x-parser-schema-id": "<anonymous-schema-1582>"
                },
                "datapoint_type": {
                  "const": "urn:knx:dpt.switch",
                  "x-parser-schema-id": "<anonymous-schema-1583>"
                },
                "function_ref": {
                  "type": "string",
                  "format": "uuid",
                  "x-parser-schema-id": "<anonymous-schema-1584>"
                }
              },
              "additionalProperties": false,
              "x-parser-schema-id": "<anonymous-schema-1579>"
            },
            {
              "type": "object",
              "title": "Rain Alarm",
              "required": [
                "id",
                "type",
                "title",
                "datapoint_type",
                "function_ref"
              ],
              "properties": {
                "id": {
                  "type": "string",
                  "format": "uuid",
                  "x-parser-schema-id": "<anonymous-schema-1586>"
                },
                "type": {
                  "const": "mac#RainAlarm",
                  "x-parser-schema-id": "<anonymous-schema-1587>"
                },
                "title": {
                  "type": "string",
                  "x-parser-schema-id": "<anonymous-schema-1588>"
                },
                "datapoint_type": {
                  "const": "urn:knx:dpt.alarm",
                  "x-parser-schema-id": "<anonymous-schema-1589>"
                },
                "function_ref": {
                  "type": "string",
                  "format": "uuid",
                  "x-parser-schema-id": "<anonymous-schema-1590>"
                }
              },
              "additionalProperties": false,
              "x-parser-schema-id": "<anonymous-schema-1585>"
            },
            {
              "type": "object",
              "title": "Relation to GMT",
              "required": [
                "id",
                "type",
                "title",
                "datapoint_type",
                "function_ref"
              ],
              "properties": {
                "id": {
                  "type": "string",
                  "format": "uuid",
                  "x-parser-schema-id": "<anonymous-schema-1592>"
                },
                "type": {
                  "const": "mac#RelationToGMT",
                  "x-parser-schema-id": "<anonymous-schema-1593>"
                },
                "title": {
                  "type": "string",
                  "x-parser-schema-id": "<anonymous-schema-1594>"
                },
                "datapoint_type": {
                  "const": "urn:knx:dpt.deltaTimeMin",
                  "x-parser-schema-id": "<anonymous-schema-1595>"
                },
                "function_ref": {
                  "type": "string",
                  "format": "uuid",
                  "x-parser-schema-id": "<anonymous-schema-1596>"
                }
              },
              "additionalProperties": false,
              "x-parser-schema-id": "<anonymous-schema-1591>"
            },
            {
              "type": "object",
              "title": "Shutter Move Up Down",
              "required": [
                "id",
                "type",
                "title",
                "datapoint_type",
                "function_ref"
              ],
              "properties": {
                "id": {
                  "type": "string",
                  "format": "uuid",
                  "x-parser-schema-id": "<anonymous-schema-1598>"
                },
                "type": {
                  "const": "mac#ShutterMoveUpDown",
                  "x-parser-schema-id": "<anonymous-schema-1599>"
                },
                "title": {
                  "type": "string",
                  "x-parser-schema-id": "<anonymous-schema-1600>"
                },
                "datapoint_type": {
                  "const": "urn:knx:dpt.upDown",
                  "x-parser-schema-id": "<anonymous-schema-1601>"
                },
                "function_ref": {
                  "type": "string",
                  "format": "uuid",
                  "x-parser-schema-id": "<anonymous-schema-1602>"
                }
              },
              "additionalProperties": false,
              "x-parser-schema-id": "<anonymous-schema-1597>"
            },
            {
              "type": "object",
              "title": "Shutter Position Length",
              "required": [
                "id",
                "type",
                "title",
                "datapoint_type",
                "function_ref"
              ],
              "properties": {
                "id": {
                  "type": "string",
                  "format": "uuid",
                  "x-parser-schema-id": "<anonymous-schema-1604>"
                },
                "type": {
                  "const": "mac#ShutterPositionLength",
                  "x-parser-schema-id": "<anonymous-schema-1605>"
                },
                "title": {
                  "type": "string",
                  "x-parser-schema-id": "<anonymous-schema-1606>"
                },
                "datapoint_type": {
                  "const": "urn:knx:dpt.lengthmm",
                  "x-parser-schema-id": "<anonymous-schema-1607>"
                },
                "function_ref": {
                  "type": "string",
                  "format": "uuid",
                  "x-parser-schema-id": "<anonymous-schema-1608>"
                }
              },
              "additionalProperties": false,
              "x-parser-schema-id": "<anonymous-schema-1603>"
            },
            {
              "type": "object",
              "title": "Shutter Position Percentage",
              "required": [
                "id",
                "type",
                "title",
                "datapoint_type",
                "function_ref"
              ],
              "properties": {
                "id": {
                  "type": "string",
                  "format": "uuid",
                  "x-parser-schema-id": "<anonymous-schema-1610>"
                },
                "type": {
                  "const": "mac#ShutterPositionPercentage",
                  "x-parser-schema-id": "<anonymous-schema-1611>"
                },
                "title": {
                  "type": "string",
                  "x-parser-schema-id": "<anonymous-schema-1612>"
                },
                "datapoint_type": {
                  "const": "urn:knx:dpt.scaling",
                  "x-parser-schema-id": "<anonymous-schema-1613>"
                },
                "function_ref": {
                  "type": "string",
                  "format": "uuid",
                  "x-parser-schema-id": "<anonymous-schema-1614>"
                }
              },
              "additionalProperties": false,
              "x-parser-schema-id": "<anonymous-schema-1609>"
            },
            {
              "type": "object",
              "title": "Shutter Status",
              "required": [
                "id",
                "type",
                "title",
                "datapoint_type",
                "function_ref"
              ],
              "properties": {
                "id": {
                  "type": "string",
                  "format": "uuid",
                  "x-parser-schema-id": "<anonymous-schema-1616>"
                },
                "type": {
                  "const": "mac#ShutterStatus",
                  "x-parser-schema-id": "<anonymous-schema-1617>"
                },
                "title": {
                  "type": "string",
                  "x-parser-schema-id": "<anonymous-schema-1618>"
                },
                "datapoint_type": {
                  "const": "urn:knx:dpt.upDown",
                  "x-parser-schema-id": "<anonymous-schema-1619>"
                },
                "function_ref": {
                  "type": "string",
                  "format": "uuid",
                  "x-parser-schema-id": "<anonymous-schema-1620>"
                }
              },
              "additionalProperties": false,
              "x-parser-schema-id": "<anonymous-schema-1615>"
            },
            {
              "type": "object",
              "title": "Shutter Stop Step",
              "required": [
                "id",
                "type",
                "title",
                "datapoint_type",
                "function_ref"
              ],
              "properties": {
                "id": {
                  "type": "string",
                  "format": "uuid",
                  "x-parser-schema-id": "<anonymous-schema-1622>"
                },
                "type": {
                  "const": "mac#ShutterStopStep",
                  "x-parser-schema-id": "<anonymous-schema-1623>"
                },
                "title": {
                  "type": "string",
                  "x-parser-schema-id": "<anonymous-schema-1624>"
                },
                "datapoint_type": {
                  "const": "urn:knx:dpt.step",
                  "x-parser-schema-id": "<anonymous-schema-1625>"
                },
                "function_ref": {
                  "type": "string",
                  "format": "uuid",
                  "x-parser-schema-id": "<anonymous-schema-1626>"
                }
              },
              "additionalProperties": false,
              "x-parser-schema-id": "<anonymous-schema-1621>"
            },
            {
              "type": "object",
              "title": "Shutter Stop Trigger",
              "required": [
                "id",
                "type",
                "title",
                "datapoint_type",
                "function_ref"
              ],
              "properties": {
                "id": {
                  "type": "string",
                  "format": "uuid",
                  "x-parser-schema-id": "<anonymous-schema-1628>"
                },
                "type": {
                  "const": "mac#ShutterStopTrigger",
                  "x-parser-schema-id": "<anonymous-schema-1629>"
                },
                "title": {
                  "type": "string",
                  "x-parser-schema-id": "<anonymous-schema-1630>"
                },
                "datapoint_type": {
                  "const": "urn:knx:dpt.trigger",
                  "x-parser-schema-id": "<anonymous-schema-1631>"
                },
                "function_ref": {
                  "type": "string",
                  "format": "uuid",
                  "x-parser-schema-id": "<anonymous-schema-1632>"
                }
              },
              "additionalProperties": false,
              "x-parser-schema-id": "<anonymous-schema-1627>"
            },
            {
              "type": "object",
              "title": "Wind Alarm",
              "required": [
                "id",
                "type",
                "title",
                "datapoint_type",
                "function_ref"
              ],
              "properties": {
                "id": {
                  "type": "string",
                  "format": "uuid",
                  "x-parser-schema-id": "<anonymous-schema-1634>"
                },
                "type": {
                  "const": "mac#WindAlarm",
                  "x-parser-schema-id": "<anonymous-schema-1635>"
                },
                "title": {
                  "type": "string",
                  "x-parser-schema-id": "<anonymous-schema-1636>"
                },
                "datapoint_type": {
                  "const": "urn:knx:dpt.alarm",
                  "x-parser-schema-id": "<anonymous-schema-1637>"
                },
                "function_ref": {
                  "type": "string",
                  "format": "uuid",
                  "x-parser-schema-id": "<anonymous-schema-1638>"
                }
              },
              "additionalProperties": false,
              "x-parser-schema-id": "<anonymous-schema-1633>"
            }
          ],
          "x-parser-schema-id": "<anonymous-schema-1482>"
        },
        "x-parser-schema-id": "functionpoints"
      },
      "location": {
        "title": "Location",
        "oneOf": [
          {
            "title": "Site",
            "allOf": [
              {
                "type": "object",
                "title": "Abstract Base Location",
                "properties": {
                  "id": {
                    "type": "string",
                    "format": "uuid",
                    "x-parser-schema-id": "<anonymous-schema-1641>"
                  },
                  "name": {
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-1642>"
                  },
                  "number": {
                    "type": "number",
                    "x-parser-schema-id": "<anonymous-schema-1643>"
                  },
                  "adjacent_locations": {
                    "type": "array",
                    "items": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-1645>"
                    },
                    "x-parser-schema-id": "<anonymous-schema-1644>"
                  },
                  "application_functions": {
                    "type": "array",
                    "items": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-1647>"
                    },
                    "x-parser-schema-id": "<anonymous-schema-1646>"
                  },
                  "locations": {
                    "type": "array",
                    "items": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-1649>"
                    },
                    "x-parser-schema-id": "<anonymous-schema-1648>"
                  },
                  "outsides": {
                    "type": "array",
                    "items": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-1651>"
                    },
                    "x-parser-schema-id": "<anonymous-schema-1650>"
                  },
                  "equipments": {
                    "type": "array",
                    "items": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-1653>"
                    },
                    "x-parser-schema-id": "<anonymous-schema-1652>"
                  },
                  "location_usage": {
                    "description": "TODO this should be tag#LocationUsage-enum",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-1654>"
                  }
                },
                "required": [
                  "id",
                  "name"
                ],
                "x-parser-schema-id": "<anonymous-schema-1640>"
              },
              {
                "type": "object",
                "title": "Site Definition",
                "properties": {
                  "type": {
                    "const": "urn:knx:loc.site",
                    "x-parser-schema-id": "<anonymous-schema-1656>"
                  },
                  "buildings": {
                    "type": "array",
                    "items": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-1658>"
                    },
                    "x-parser-schema-id": "<anonymous-schema-1657>"
                  },
                  "siteSegments": {
                    "type": "array",
                    "items": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-1660>"
                    },
                    "x-parser-schema-id": "<anonymous-schema-1659>"
                  }
                },
                "x-parser-schema-id": "<anonymous-schema-1655>"
              }
            ],
            "x-parser-schema-id": "<anonymous-schema-1639>"
          },
          {
            "title": "Building",
            "allOf": [
              {
                "type": "object",
                "title": "Abstract Base Location",
                "properties": {
                  "id": {
                    "type": "string",
                    "format": "uuid",
                    "x-parser-schema-id": "<anonymous-schema-1663>"
                  },
                  "name": {
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-1664>"
                  },
                  "number": {
                    "type": "number",
                    "x-parser-schema-id": "<anonymous-schema-1665>"
                  },
                  "adjacent_locations": {
                    "type": "array",
                    "items": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-1667>"
                    },
                    "x-parser-schema-id": "<anonymous-schema-1666>"
                  },
                  "application_functions": {
                    "type": "array",
                    "items": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-1669>"
                    },
                    "x-parser-schema-id": "<anonymous-schema-1668>"
                  },
                  "locations": {
                    "type": "array",
                    "items": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-1671>"
                    },
                    "x-parser-schema-id": "<anonymous-schema-1670>"
                  },
                  "outsides": {
                    "type": "array",
                    "items": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-1673>"
                    },
                    "x-parser-schema-id": "<anonymous-schema-1672>"
                  },
                  "equipments": {
                    "type": "array",
                    "items": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-1675>"
                    },
                    "x-parser-schema-id": "<anonymous-schema-1674>"
                  },
                  "location_usage": {
                    "description": "TODO this should be tag#LocationUsage-enum",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-1676>"
                  }
                },
                "required": [
                  "id",
                  "name"
                ],
                "x-parser-schema-id": "<anonymous-schema-1662>"
              },
              {
                "type": "object",
                "title": "Building Definition",
                "properties": {
                  "type": {
                    "const": "urn:knx:loc.building",
                    "x-parser-schema-id": "<anonymous-schema-1678>"
                  },
                  "floors": {
                    "type": "array",
                    "items": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-1680>"
                    },
                    "x-parser-schema-id": "<anonymous-schema-1679>"
                  },
                  "rooms": {
                    "type": "array",
                    "items": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-1682>"
                    },
                    "x-parser-schema-id": "<anonymous-schema-1681>"
                  },
                  "address": {
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-1683>"
                  },
                  "spaces": {
                    "type": "array",
                    "items": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-1685>"
                    },
                    "x-parser-schema-id": "<anonymous-schema-1684>"
                  }
                },
                "additionalProperties": false,
                "x-parser-schema-id": "<anonymous-schema-1677>"
              }
            ],
            "x-parser-schema-id": "<anonymous-schema-1661>"
          },
          {
            "title": "Floor",
            "allOf": [
              {
                "type": "object",
                "title": "Abstract Base Location",
                "properties": {
                  "id": {
                    "type": "string",
                    "format": "uuid",
                    "x-parser-schema-id": "<anonymous-schema-1688>"
                  },
                  "name": {
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-1689>"
                  },
                  "number": {
                    "type": "number",
                    "x-parser-schema-id": "<anonymous-schema-1690>"
                  },
                  "adjacent_locations": {
                    "type": "array",
                    "items": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-1692>"
                    },
                    "x-parser-schema-id": "<anonymous-schema-1691>"
                  },
                  "application_functions": {
                    "type": "array",
                    "items": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-1694>"
                    },
                    "x-parser-schema-id": "<anonymous-schema-1693>"
                  },
                  "locations": {
                    "type": "array",
                    "items": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-1696>"
                    },
                    "x-parser-schema-id": "<anonymous-schema-1695>"
                  },
                  "outsides": {
                    "type": "array",
                    "items": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-1698>"
                    },
                    "x-parser-schema-id": "<anonymous-schema-1697>"
                  },
                  "equipments": {
                    "type": "array",
                    "items": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-1700>"
                    },
                    "x-parser-schema-id": "<anonymous-schema-1699>"
                  },
                  "location_usage": {
                    "description": "TODO this should be tag#LocationUsage-enum",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-1701>"
                  }
                },
                "required": [
                  "id",
                  "name"
                ],
                "x-parser-schema-id": "<anonymous-schema-1687>"
              },
              {
                "type": "object",
                "title": "Floor Definition",
                "properties": {
                  "type": {
                    "const": "urn:knx:loc.floor",
                    "x-parser-schema-id": "<anonymous-schema-1703>"
                  },
                  "lower_floor": {
                    "type": "string",
                    "format": "uuid",
                    "x-parser-schema-id": "<anonymous-schema-1704>"
                  },
                  "upper_floor": {
                    "type": "string",
                    "format": "uuid",
                    "x-parser-schema-id": "<anonymous-schema-1705>"
                  },
                  "rooms": {
                    "type": "array",
                    "items": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-1707>"
                    },
                    "x-parser-schema-id": "<anonymous-schema-1706>"
                  },
                  "spaces": {
                    "type": "array",
                    "items": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-1709>"
                    },
                    "x-parser-schema-id": "<anonymous-schema-1708>"
                  }
                },
                "x-parser-schema-id": "<anonymous-schema-1702>"
              }
            ],
            "x-parser-schema-id": "<anonymous-schema-1686>"
          },
          {
            "title": "Room",
            "allOf": [
              {
                "title": "Abstract Space",
                "allOf": [
                  {
                    "type": "object",
                    "title": "Abstract Base Location",
                    "properties": {
                      "id": {
                        "type": "string",
                        "format": "uuid",
                        "x-parser-schema-id": "<anonymous-schema-1713>"
                      },
                      "name": {
                        "type": "string",
                        "x-parser-schema-id": "<anonymous-schema-1714>"
                      },
                      "number": {
                        "type": "number",
                        "x-parser-schema-id": "<anonymous-schema-1715>"
                      },
                      "adjacent_locations": {
                        "type": "array",
                        "items": {
                          "type": "string",
                          "format": "uuid",
                          "x-parser-schema-id": "<anonymous-schema-1717>"
                        },
                        "x-parser-schema-id": "<anonymous-schema-1716>"
                      },
                      "application_functions": {
                        "type": "array",
                        "items": {
                          "type": "string",
                          "format": "uuid",
                          "x-parser-schema-id": "<anonymous-schema-1719>"
                        },
                        "x-parser-schema-id": "<anonymous-schema-1718>"
                      },
                      "locations": {
                        "type": "array",
                        "items": {
                          "type": "string",
                          "format": "uuid",
                          "x-parser-schema-id": "<anonymous-schema-1721>"
                        },
                        "x-parser-schema-id": "<anonymous-schema-1720>"
                      },
                      "outsides": {
                        "type": "array",
                        "items": {
                          "type": "string",
                          "format": "uuid",
                          "x-parser-schema-id": "<anonymous-schema-1723>"
                        },
                        "x-parser-schema-id": "<anonymous-schema-1722>"
                      },
                      "equipments": {
                        "type": "array",
                        "items": {
                          "type": "string",
                          "format": "uuid",
                          "x-parser-schema-id": "<anonymous-schema-1725>"
                        },
                        "x-parser-schema-id": "<anonymous-schema-1724>"
                      },
                      "location_usage": {
                        "description": "TODO this should be tag#LocationUsage-enum",
                        "type": "string",
                        "x-parser-schema-id": "<anonymous-schema-1726>"
                      }
                    },
                    "required": [
                      "id",
                      "name"
                    ],
                    "x-parser-schema-id": "<anonymous-schema-1712>"
                  },
                  {
                    "type": "object",
                    "title": "Space Definition",
                    "properties": {
                      "floor": {
                        "type": "string",
                        "format": "uuid",
                        "x-parser-schema-id": "<anonymous-schema-1728>"
                      },
                      "rooms": {
                        "type": "array",
                        "items": {
                          "type": "string",
                          "format": "uuid",
                          "x-parser-schema-id": "<anonymous-schema-1730>"
                        },
                        "x-parser-schema-id": "<anonymous-schema-1729>"
                      },
                      "spaces": {
                        "type": "array",
                        "items": {
                          "type": "string",
                          "format": "uuid",
                          "x-parser-schema-id": "<anonymous-schema-1732>"
                        },
                        "x-parser-schema-id": "<anonymous-schema-1731>"
                      }
                    },
                    "x-parser-schema-id": "<anonymous-schema-1727>"
                  }
                ],
                "x-parser-schema-id": "<anonymous-schema-1711>"
              },
              {
                "type": "object",
                "title": "Room Definition",
                "properties": {
                  "type": {
                    "const": "urn:knx:loc.room",
                    "x-parser-schema-id": "<anonymous-schema-1734>"
                  },
                  "room_segments": {
                    "type": "array",
                    "items": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-1736>"
                    },
                    "x-parser-schema-id": "<anonymous-schema-1735>"
                  }
                },
                "x-parser-schema-id": "<anonymous-schema-1733>"
              }
            ],
            "x-parser-schema-id": "<anonymous-schema-1710>"
          },
          {
            "title": "Room Segment",
            "allOf": [
              {
                "title": "Abstract Space",
                "allOf": [
                  {
                    "type": "object",
                    "title": "Abstract Base Location",
                    "properties": {
                      "id": {
                        "type": "string",
                        "format": "uuid",
                        "x-parser-schema-id": "<anonymous-schema-1740>"
                      },
                      "name": {
                        "type": "string",
                        "x-parser-schema-id": "<anonymous-schema-1741>"
                      },
                      "number": {
                        "type": "number",
                        "x-parser-schema-id": "<anonymous-schema-1742>"
                      },
                      "adjacent_locations": {
                        "type": "array",
                        "items": {
                          "type": "string",
                          "format": "uuid",
                          "x-parser-schema-id": "<anonymous-schema-1744>"
                        },
                        "x-parser-schema-id": "<anonymous-schema-1743>"
                      },
                      "application_functions": {
                        "type": "array",
                        "items": {
                          "type": "string",
                          "format": "uuid",
                          "x-parser-schema-id": "<anonymous-schema-1746>"
                        },
                        "x-parser-schema-id": "<anonymous-schema-1745>"
                      },
                      "locations": {
                        "type": "array",
                        "items": {
                          "type": "string",
                          "format": "uuid",
                          "x-parser-schema-id": "<anonymous-schema-1748>"
                        },
                        "x-parser-schema-id": "<anonymous-schema-1747>"
                      },
                      "outsides": {
                        "type": "array",
                        "items": {
                          "type": "string",
                          "format": "uuid",
                          "x-parser-schema-id": "<anonymous-schema-1750>"
                        },
                        "x-parser-schema-id": "<anonymous-schema-1749>"
                      },
                      "equipments": {
                        "type": "array",
                        "items": {
                          "type": "string",
                          "format": "uuid",
                          "x-parser-schema-id": "<anonymous-schema-1752>"
                        },
                        "x-parser-schema-id": "<anonymous-schema-1751>"
                      },
                      "location_usage": {
                        "description": "TODO this should be tag#LocationUsage-enum",
                        "type": "string",
                        "x-parser-schema-id": "<anonymous-schema-1753>"
                      }
                    },
                    "required": [
                      "id",
                      "name"
                    ],
                    "x-parser-schema-id": "<anonymous-schema-1739>"
                  },
                  {
                    "type": "object",
                    "title": "Space Definition",
                    "properties": {
                      "floor": {
                        "type": "string",
                        "format": "uuid",
                        "x-parser-schema-id": "<anonymous-schema-1755>"
                      },
                      "rooms": {
                        "type": "array",
                        "items": {
                          "type": "string",
                          "format": "uuid",
                          "x-parser-schema-id": "<anonymous-schema-1757>"
                        },
                        "x-parser-schema-id": "<anonymous-schema-1756>"
                      },
                      "spaces": {
                        "type": "array",
                        "items": {
                          "type": "string",
                          "format": "uuid",
                          "x-parser-schema-id": "<anonymous-schema-1759>"
                        },
                        "x-parser-schema-id": "<anonymous-schema-1758>"
                      }
                    },
                    "x-parser-schema-id": "<anonymous-schema-1754>"
                  }
                ],
                "x-parser-schema-id": "<anonymous-schema-1738>"
              },
              {
                "type": "object",
                "title": "Room Segment Definition",
                "properties": {
                  "type": {
                    "const": "urn:knx:loc.roomsegment",
                    "x-parser-schema-id": "<anonymous-schema-1761>"
                  },
                  "roomSegments": {
                    "type": "array",
                    "items": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-1763>"
                    },
                    "x-parser-schema-id": "<anonymous-schema-1762>"
                  }
                },
                "x-parser-schema-id": "<anonymous-schema-1760>"
              }
            ],
            "x-parser-schema-id": "<anonymous-schema-1737>"
          },
          {
            "title": "Site Segment",
            "allOf": [
              {
                "type": "object",
                "title": "Abstract Base Location",
                "properties": {
                  "id": {
                    "type": "string",
                    "format": "uuid",
                    "x-parser-schema-id": "<anonymous-schema-1766>"
                  },
                  "name": {
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-1767>"
                  },
                  "number": {
                    "type": "number",
                    "x-parser-schema-id": "<anonymous-schema-1768>"
                  },
                  "adjacent_locations": {
                    "type": "array",
                    "items": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-1770>"
                    },
                    "x-parser-schema-id": "<anonymous-schema-1769>"
                  },
                  "application_functions": {
                    "type": "array",
                    "items": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-1772>"
                    },
                    "x-parser-schema-id": "<anonymous-schema-1771>"
                  },
                  "locations": {
                    "type": "array",
                    "items": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-1774>"
                    },
                    "x-parser-schema-id": "<anonymous-schema-1773>"
                  },
                  "outsides": {
                    "type": "array",
                    "items": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-1776>"
                    },
                    "x-parser-schema-id": "<anonymous-schema-1775>"
                  },
                  "equipments": {
                    "type": "array",
                    "items": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-1778>"
                    },
                    "x-parser-schema-id": "<anonymous-schema-1777>"
                  },
                  "location_usage": {
                    "description": "TODO this should be tag#LocationUsage-enum",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-1779>"
                  }
                },
                "required": [
                  "id",
                  "name"
                ],
                "x-parser-schema-id": "<anonymous-schema-1765>"
              },
              {
                "type": "object",
                "title": "Site Segment Definition",
                "properties": {
                  "type": {
                    "const": "urn:knx:loc.sitesegment",
                    "x-parser-schema-id": "<anonymous-schema-1781>"
                  },
                  "buildings": {
                    "type": "array",
                    "items": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-1783>"
                    },
                    "x-parser-schema-id": "<anonymous-schema-1782>"
                  },
                  "siteSegments": {
                    "type": "array",
                    "items": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-1785>"
                    },
                    "x-parser-schema-id": "<anonymous-schema-1784>"
                  }
                },
                "x-parser-schema-id": "<anonymous-schema-1780>"
              }
            ],
            "x-parser-schema-id": "<anonymous-schema-1764>"
          },
          {
            "title": "Outside",
            "allOf": [
              {
                "type": "object",
                "title": "Abstract Base Location",
                "properties": {
                  "id": {
                    "type": "string",
                    "format": "uuid",
                    "x-parser-schema-id": "<anonymous-schema-1788>"
                  },
                  "name": {
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-1789>"
                  },
                  "number": {
                    "type": "number",
                    "x-parser-schema-id": "<anonymous-schema-1790>"
                  },
                  "adjacent_locations": {
                    "type": "array",
                    "items": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-1792>"
                    },
                    "x-parser-schema-id": "<anonymous-schema-1791>"
                  },
                  "application_functions": {
                    "type": "array",
                    "items": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-1794>"
                    },
                    "x-parser-schema-id": "<anonymous-schema-1793>"
                  },
                  "locations": {
                    "type": "array",
                    "items": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-1796>"
                    },
                    "x-parser-schema-id": "<anonymous-schema-1795>"
                  },
                  "outsides": {
                    "type": "array",
                    "items": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-1798>"
                    },
                    "x-parser-schema-id": "<anonymous-schema-1797>"
                  },
                  "equipments": {
                    "type": "array",
                    "items": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-1800>"
                    },
                    "x-parser-schema-id": "<anonymous-schema-1799>"
                  },
                  "location_usage": {
                    "description": "TODO this should be tag#LocationUsage-enum",
                    "type": "string",
                    "x-parser-schema-id": "<anonymous-schema-1801>"
                  }
                },
                "required": [
                  "id",
                  "name"
                ],
                "x-parser-schema-id": "<anonymous-schema-1787>"
              },
              {
                "type": "object",
                "title": "Outside Definition",
                "properties": {
                  "type": {
                    "const": "urn:knx:loc.outside",
                    "x-parser-schema-id": "<anonymous-schema-1803>"
                  }
                },
                "x-parser-schema-id": "<anonymous-schema-1802>"
              }
            ],
            "x-parser-schema-id": "<anonymous-schema-1786>"
          }
        ],
        "x-parser-schema-id": "location"
      },
      "locations": {
        "type": "array",
        "items": {
          "title": "Location",
          "oneOf": [
            {
              "title": "Site",
              "allOf": [
                {
                  "type": "object",
                  "title": "Abstract Base Location",
                  "properties": {
                    "id": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-1807>"
                    },
                    "name": {
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-1808>"
                    },
                    "number": {
                      "type": "number",
                      "x-parser-schema-id": "<anonymous-schema-1809>"
                    },
                    "adjacent_locations": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "format": "uuid",
                        "x-parser-schema-id": "<anonymous-schema-1811>"
                      },
                      "x-parser-schema-id": "<anonymous-schema-1810>"
                    },
                    "application_functions": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "format": "uuid",
                        "x-parser-schema-id": "<anonymous-schema-1813>"
                      },
                      "x-parser-schema-id": "<anonymous-schema-1812>"
                    },
                    "locations": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "format": "uuid",
                        "x-parser-schema-id": "<anonymous-schema-1815>"
                      },
                      "x-parser-schema-id": "<anonymous-schema-1814>"
                    },
                    "outsides": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "format": "uuid",
                        "x-parser-schema-id": "<anonymous-schema-1817>"
                      },
                      "x-parser-schema-id": "<anonymous-schema-1816>"
                    },
                    "equipments": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "format": "uuid",
                        "x-parser-schema-id": "<anonymous-schema-1819>"
                      },
                      "x-parser-schema-id": "<anonymous-schema-1818>"
                    },
                    "location_usage": {
                      "description": "TODO this should be tag#LocationUsage-enum",
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-1820>"
                    }
                  },
                  "required": [
                    "id",
                    "name"
                  ],
                  "x-parser-schema-id": "<anonymous-schema-1806>"
                },
                {
                  "type": "object",
                  "title": "Site Definition",
                  "properties": {
                    "type": {
                      "const": "urn:knx:loc.site",
                      "x-parser-schema-id": "<anonymous-schema-1822>"
                    },
                    "buildings": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "format": "uuid",
                        "x-parser-schema-id": "<anonymous-schema-1824>"
                      },
                      "x-parser-schema-id": "<anonymous-schema-1823>"
                    },
                    "siteSegments": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "format": "uuid",
                        "x-parser-schema-id": "<anonymous-schema-1826>"
                      },
                      "x-parser-schema-id": "<anonymous-schema-1825>"
                    }
                  },
                  "x-parser-schema-id": "<anonymous-schema-1821>"
                }
              ],
              "x-parser-schema-id": "<anonymous-schema-1805>"
            },
            {
              "title": "Building",
              "allOf": [
                {
                  "type": "object",
                  "title": "Abstract Base Location",
                  "properties": {
                    "id": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-1829>"
                    },
                    "name": {
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-1830>"
                    },
                    "number": {
                      "type": "number",
                      "x-parser-schema-id": "<anonymous-schema-1831>"
                    },
                    "adjacent_locations": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "format": "uuid",
                        "x-parser-schema-id": "<anonymous-schema-1833>"
                      },
                      "x-parser-schema-id": "<anonymous-schema-1832>"
                    },
                    "application_functions": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "format": "uuid",
                        "x-parser-schema-id": "<anonymous-schema-1835>"
                      },
                      "x-parser-schema-id": "<anonymous-schema-1834>"
                    },
                    "locations": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "format": "uuid",
                        "x-parser-schema-id": "<anonymous-schema-1837>"
                      },
                      "x-parser-schema-id": "<anonymous-schema-1836>"
                    },
                    "outsides": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "format": "uuid",
                        "x-parser-schema-id": "<anonymous-schema-1839>"
                      },
                      "x-parser-schema-id": "<anonymous-schema-1838>"
                    },
                    "equipments": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "format": "uuid",
                        "x-parser-schema-id": "<anonymous-schema-1841>"
                      },
                      "x-parser-schema-id": "<anonymous-schema-1840>"
                    },
                    "location_usage": {
                      "description": "TODO this should be tag#LocationUsage-enum",
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-1842>"
                    }
                  },
                  "required": [
                    "id",
                    "name"
                  ],
                  "x-parser-schema-id": "<anonymous-schema-1828>"
                },
                {
                  "type": "object",
                  "title": "Building Definition",
                  "properties": {
                    "type": {
                      "const": "urn:knx:loc.building",
                      "x-parser-schema-id": "<anonymous-schema-1844>"
                    },
                    "floors": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "format": "uuid",
                        "x-parser-schema-id": "<anonymous-schema-1846>"
                      },
                      "x-parser-schema-id": "<anonymous-schema-1845>"
                    },
                    "rooms": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "format": "uuid",
                        "x-parser-schema-id": "<anonymous-schema-1848>"
                      },
                      "x-parser-schema-id": "<anonymous-schema-1847>"
                    },
                    "address": {
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-1849>"
                    },
                    "spaces": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "format": "uuid",
                        "x-parser-schema-id": "<anonymous-schema-1851>"
                      },
                      "x-parser-schema-id": "<anonymous-schema-1850>"
                    }
                  },
                  "additionalProperties": false,
                  "x-parser-schema-id": "<anonymous-schema-1843>"
                }
              ],
              "x-parser-schema-id": "<anonymous-schema-1827>"
            },
            {
              "title": "Floor",
              "allOf": [
                {
                  "type": "object",
                  "title": "Abstract Base Location",
                  "properties": {
                    "id": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-1854>"
                    },
                    "name": {
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-1855>"
                    },
                    "number": {
                      "type": "number",
                      "x-parser-schema-id": "<anonymous-schema-1856>"
                    },
                    "adjacent_locations": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "format": "uuid",
                        "x-parser-schema-id": "<anonymous-schema-1858>"
                      },
                      "x-parser-schema-id": "<anonymous-schema-1857>"
                    },
                    "application_functions": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "format": "uuid",
                        "x-parser-schema-id": "<anonymous-schema-1860>"
                      },
                      "x-parser-schema-id": "<anonymous-schema-1859>"
                    },
                    "locations": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "format": "uuid",
                        "x-parser-schema-id": "<anonymous-schema-1862>"
                      },
                      "x-parser-schema-id": "<anonymous-schema-1861>"
                    },
                    "outsides": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "format": "uuid",
                        "x-parser-schema-id": "<anonymous-schema-1864>"
                      },
                      "x-parser-schema-id": "<anonymous-schema-1863>"
                    },
                    "equipments": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "format": "uuid",
                        "x-parser-schema-id": "<anonymous-schema-1866>"
                      },
                      "x-parser-schema-id": "<anonymous-schema-1865>"
                    },
                    "location_usage": {
                      "description": "TODO this should be tag#LocationUsage-enum",
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-1867>"
                    }
                  },
                  "required": [
                    "id",
                    "name"
                  ],
                  "x-parser-schema-id": "<anonymous-schema-1853>"
                },
                {
                  "type": "object",
                  "title": "Floor Definition",
                  "properties": {
                    "type": {
                      "const": "urn:knx:loc.floor",
                      "x-parser-schema-id": "<anonymous-schema-1869>"
                    },
                    "lower_floor": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-1870>"
                    },
                    "upper_floor": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-1871>"
                    },
                    "rooms": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "format": "uuid",
                        "x-parser-schema-id": "<anonymous-schema-1873>"
                      },
                      "x-parser-schema-id": "<anonymous-schema-1872>"
                    },
                    "spaces": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "format": "uuid",
                        "x-parser-schema-id": "<anonymous-schema-1875>"
                      },
                      "x-parser-schema-id": "<anonymous-schema-1874>"
                    }
                  },
                  "x-parser-schema-id": "<anonymous-schema-1868>"
                }
              ],
              "x-parser-schema-id": "<anonymous-schema-1852>"
            },
            {
              "title": "Room",
              "allOf": [
                {
                  "title": "Abstract Space",
                  "allOf": [
                    {
                      "type": "object",
                      "title": "Abstract Base Location",
                      "properties": {
                        "id": {
                          "type": "string",
                          "format": "uuid",
                          "x-parser-schema-id": "<anonymous-schema-1879>"
                        },
                        "name": {
                          "type": "string",
                          "x-parser-schema-id": "<anonymous-schema-1880>"
                        },
                        "number": {
                          "type": "number",
                          "x-parser-schema-id": "<anonymous-schema-1881>"
                        },
                        "adjacent_locations": {
                          "type": "array",
                          "items": {
                            "type": "string",
                            "format": "uuid",
                            "x-parser-schema-id": "<anonymous-schema-1883>"
                          },
                          "x-parser-schema-id": "<anonymous-schema-1882>"
                        },
                        "application_functions": {
                          "type": "array",
                          "items": {
                            "type": "string",
                            "format": "uuid",
                            "x-parser-schema-id": "<anonymous-schema-1885>"
                          },
                          "x-parser-schema-id": "<anonymous-schema-1884>"
                        },
                        "locations": {
                          "type": "array",
                          "items": {
                            "type": "string",
                            "format": "uuid",
                            "x-parser-schema-id": "<anonymous-schema-1887>"
                          },
                          "x-parser-schema-id": "<anonymous-schema-1886>"
                        },
                        "outsides": {
                          "type": "array",
                          "items": {
                            "type": "string",
                            "format": "uuid",
                            "x-parser-schema-id": "<anonymous-schema-1889>"
                          },
                          "x-parser-schema-id": "<anonymous-schema-1888>"
                        },
                        "equipments": {
                          "type": "array",
                          "items": {
                            "type": "string",
                            "format": "uuid",
                            "x-parser-schema-id": "<anonymous-schema-1891>"
                          },
                          "x-parser-schema-id": "<anonymous-schema-1890>"
                        },
                        "location_usage": {
                          "description": "TODO this should be tag#LocationUsage-enum",
                          "type": "string",
                          "x-parser-schema-id": "<anonymous-schema-1892>"
                        }
                      },
                      "required": [
                        "id",
                        "name"
                      ],
                      "x-parser-schema-id": "<anonymous-schema-1878>"
                    },
                    {
                      "type": "object",
                      "title": "Space Definition",
                      "properties": {
                        "floor": {
                          "type": "string",
                          "format": "uuid",
                          "x-parser-schema-id": "<anonymous-schema-1894>"
                        },
                        "rooms": {
                          "type": "array",
                          "items": {
                            "type": "string",
                            "format": "uuid",
                            "x-parser-schema-id": "<anonymous-schema-1896>"
                          },
                          "x-parser-schema-id": "<anonymous-schema-1895>"
                        },
                        "spaces": {
                          "type": "array",
                          "items": {
                            "type": "string",
                            "format": "uuid",
                            "x-parser-schema-id": "<anonymous-schema-1898>"
                          },
                          "x-parser-schema-id": "<anonymous-schema-1897>"
                        }
                      },
                      "x-parser-schema-id": "<anonymous-schema-1893>"
                    }
                  ],
                  "x-parser-schema-id": "<anonymous-schema-1877>"
                },
                {
                  "type": "object",
                  "title": "Room Definition",
                  "properties": {
                    "type": {
                      "const": "urn:knx:loc.room",
                      "x-parser-schema-id": "<anonymous-schema-1900>"
                    },
                    "room_segments": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "format": "uuid",
                        "x-parser-schema-id": "<anonymous-schema-1902>"
                      },
                      "x-parser-schema-id": "<anonymous-schema-1901>"
                    }
                  },
                  "x-parser-schema-id": "<anonymous-schema-1899>"
                }
              ],
              "x-parser-schema-id": "<anonymous-schema-1876>"
            },
            {
              "title": "Room Segment",
              "allOf": [
                {
                  "title": "Abstract Space",
                  "allOf": [
                    {
                      "type": "object",
                      "title": "Abstract Base Location",
                      "properties": {
                        "id": {
                          "type": "string",
                          "format": "uuid",
                          "x-parser-schema-id": "<anonymous-schema-1906>"
                        },
                        "name": {
                          "type": "string",
                          "x-parser-schema-id": "<anonymous-schema-1907>"
                        },
                        "number": {
                          "type": "number",
                          "x-parser-schema-id": "<anonymous-schema-1908>"
                        },
                        "adjacent_locations": {
                          "type": "array",
                          "items": {
                            "type": "string",
                            "format": "uuid",
                            "x-parser-schema-id": "<anonymous-schema-1910>"
                          },
                          "x-parser-schema-id": "<anonymous-schema-1909>"
                        },
                        "application_functions": {
                          "type": "array",
                          "items": {
                            "type": "string",
                            "format": "uuid",
                            "x-parser-schema-id": "<anonymous-schema-1912>"
                          },
                          "x-parser-schema-id": "<anonymous-schema-1911>"
                        },
                        "locations": {
                          "type": "array",
                          "items": {
                            "type": "string",
                            "format": "uuid",
                            "x-parser-schema-id": "<anonymous-schema-1914>"
                          },
                          "x-parser-schema-id": "<anonymous-schema-1913>"
                        },
                        "outsides": {
                          "type": "array",
                          "items": {
                            "type": "string",
                            "format": "uuid",
                            "x-parser-schema-id": "<anonymous-schema-1916>"
                          },
                          "x-parser-schema-id": "<anonymous-schema-1915>"
                        },
                        "equipments": {
                          "type": "array",
                          "items": {
                            "type": "string",
                            "format": "uuid",
                            "x-parser-schema-id": "<anonymous-schema-1918>"
                          },
                          "x-parser-schema-id": "<anonymous-schema-1917>"
                        },
                        "location_usage": {
                          "description": "TODO this should be tag#LocationUsage-enum",
                          "type": "string",
                          "x-parser-schema-id": "<anonymous-schema-1919>"
                        }
                      },
                      "required": [
                        "id",
                        "name"
                      ],
                      "x-parser-schema-id": "<anonymous-schema-1905>"
                    },
                    {
                      "type": "object",
                      "title": "Space Definition",
                      "properties": {
                        "floor": {
                          "type": "string",
                          "format": "uuid",
                          "x-parser-schema-id": "<anonymous-schema-1921>"
                        },
                        "rooms": {
                          "type": "array",
                          "items": {
                            "type": "string",
                            "format": "uuid",
                            "x-parser-schema-id": "<anonymous-schema-1923>"
                          },
                          "x-parser-schema-id": "<anonymous-schema-1922>"
                        },
                        "spaces": {
                          "type": "array",
                          "items": {
                            "type": "string",
                            "format": "uuid",
                            "x-parser-schema-id": "<anonymous-schema-1925>"
                          },
                          "x-parser-schema-id": "<anonymous-schema-1924>"
                        }
                      },
                      "x-parser-schema-id": "<anonymous-schema-1920>"
                    }
                  ],
                  "x-parser-schema-id": "<anonymous-schema-1904>"
                },
                {
                  "type": "object",
                  "title": "Room Segment Definition",
                  "properties": {
                    "type": {
                      "const": "urn:knx:loc.roomsegment",
                      "x-parser-schema-id": "<anonymous-schema-1927>"
                    },
                    "roomSegments": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "format": "uuid",
                        "x-parser-schema-id": "<anonymous-schema-1929>"
                      },
                      "x-parser-schema-id": "<anonymous-schema-1928>"
                    }
                  },
                  "x-parser-schema-id": "<anonymous-schema-1926>"
                }
              ],
              "x-parser-schema-id": "<anonymous-schema-1903>"
            },
            {
              "title": "Site Segment",
              "allOf": [
                {
                  "type": "object",
                  "title": "Abstract Base Location",
                  "properties": {
                    "id": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-1932>"
                    },
                    "name": {
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-1933>"
                    },
                    "number": {
                      "type": "number",
                      "x-parser-schema-id": "<anonymous-schema-1934>"
                    },
                    "adjacent_locations": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "format": "uuid",
                        "x-parser-schema-id": "<anonymous-schema-1936>"
                      },
                      "x-parser-schema-id": "<anonymous-schema-1935>"
                    },
                    "application_functions": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "format": "uuid",
                        "x-parser-schema-id": "<anonymous-schema-1938>"
                      },
                      "x-parser-schema-id": "<anonymous-schema-1937>"
                    },
                    "locations": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "format": "uuid",
                        "x-parser-schema-id": "<anonymous-schema-1940>"
                      },
                      "x-parser-schema-id": "<anonymous-schema-1939>"
                    },
                    "outsides": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "format": "uuid",
                        "x-parser-schema-id": "<anonymous-schema-1942>"
                      },
                      "x-parser-schema-id": "<anonymous-schema-1941>"
                    },
                    "equipments": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "format": "uuid",
                        "x-parser-schema-id": "<anonymous-schema-1944>"
                      },
                      "x-parser-schema-id": "<anonymous-schema-1943>"
                    },
                    "location_usage": {
                      "description": "TODO this should be tag#LocationUsage-enum",
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-1945>"
                    }
                  },
                  "required": [
                    "id",
                    "name"
                  ],
                  "x-parser-schema-id": "<anonymous-schema-1931>"
                },
                {
                  "type": "object",
                  "title": "Site Segment Definition",
                  "properties": {
                    "type": {
                      "const": "urn:knx:loc.sitesegment",
                      "x-parser-schema-id": "<anonymous-schema-1947>"
                    },
                    "buildings": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "format": "uuid",
                        "x-parser-schema-id": "<anonymous-schema-1949>"
                      },
                      "x-parser-schema-id": "<anonymous-schema-1948>"
                    },
                    "siteSegments": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "format": "uuid",
                        "x-parser-schema-id": "<anonymous-schema-1951>"
                      },
                      "x-parser-schema-id": "<anonymous-schema-1950>"
                    }
                  },
                  "x-parser-schema-id": "<anonymous-schema-1946>"
                }
              ],
              "x-parser-schema-id": "<anonymous-schema-1930>"
            },
            {
              "title": "Outside",
              "allOf": [
                {
                  "type": "object",
                  "title": "Abstract Base Location",
                  "properties": {
                    "id": {
                      "type": "string",
                      "format": "uuid",
                      "x-parser-schema-id": "<anonymous-schema-1954>"
                    },
                    "name": {
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-1955>"
                    },
                    "number": {
                      "type": "number",
                      "x-parser-schema-id": "<anonymous-schema-1956>"
                    },
                    "adjacent_locations": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "format": "uuid",
                        "x-parser-schema-id": "<anonymous-schema-1958>"
                      },
                      "x-parser-schema-id": "<anonymous-schema-1957>"
                    },
                    "application_functions": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "format": "uuid",
                        "x-parser-schema-id": "<anonymous-schema-1960>"
                      },
                      "x-parser-schema-id": "<anonymous-schema-1959>"
                    },
                    "locations": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "format": "uuid",
                        "x-parser-schema-id": "<anonymous-schema-1962>"
                      },
                      "x-parser-schema-id": "<anonymous-schema-1961>"
                    },
                    "outsides": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "format": "uuid",
                        "x-parser-schema-id": "<anonymous-schema-1964>"
                      },
                      "x-parser-schema-id": "<anonymous-schema-1963>"
                    },
                    "equipments": {
                      "type": "array",
                      "items": {
                        "type": "string",
                        "format": "uuid",
                        "x-parser-schema-id": "<anonymous-schema-1966>"
                      },
                      "x-parser-schema-id": "<anonymous-schema-1965>"
                    },
                    "location_usage": {
                      "description": "TODO this should be tag#LocationUsage-enum",
                      "type": "string",
                      "x-parser-schema-id": "<anonymous-schema-1967>"
                    }
                  },
                  "required": [
                    "id",
                    "name"
                  ],
                  "x-parser-schema-id": "<anonymous-schema-1953>"
                },
                {
                  "type": "object",
                  "title": "Outside Definition",
                  "properties": {
                    "type": {
                      "const": "urn:knx:loc.outside",
                      "x-parser-schema-id": "<anonymous-schema-1969>"
                    }
                  },
                  "x-parser-schema-id": "<anonymous-schema-1968>"
                }
              ],
              "x-parser-schema-id": "<anonymous-schema-1952>"
            }
          ],
          "x-parser-schema-id": "<anonymous-schema-1804>"
        },
        "x-parser-schema-id": "locations"
      },
      "filter": {
        "type": "object",
        "properties": {
          "foo": {
            "type": "string",
            "x-parser-schema-id": "<anonymous-schema-1970>"
          }
        },
        "required": [
          "foo"
        ],
        "additionalProperties": false,
        "x-parser-schema-id": "filter"
      },
      "empty": {
        "type": "object",
        "additionalProperties": false,
        "x-parser-schema-id": "empty"
      }
    }
  },
  "x-parser-spec-parsed": true,
  "x-parser-api-version": 3,
  "x-parser-spec-stringified": true
};
    const config = {"show":{"sidebar":true},"sidebar":{"showOperations":"byDefault"}};
    const appRoot = document.getElementById('root');
    AsyncApiStandalone.render(
        { schema, config, }, appRoot
    );
  