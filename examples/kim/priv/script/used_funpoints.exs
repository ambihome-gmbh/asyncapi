[
  %{
    "ActsOnPhenomenonQualityKind" => ["tag#qk_ph_temporal_datevalue_site"],
    "AdjustsEquipmentQualityKind" => [],
    "FunctionPoint" => "mac#CurrentDate",
    "IsStatusOf" => [],
    "Label" => "Current Date",
    "MeasuresEquipmentQualityKind" => [],
    "ObservesPhenomenonQualityKind" => [],
    "OperationKinds" => [
      %{
        "cardinality" => "1",
        "properties" => %{
          "core#refersTo" => ["tag#qk_ph_temporal_datevalue_site"],
          "tag#hasPointFunctionType" => ["tag#pv"],
          "tag#hasPointOperation" => ["tag#absoluteValue"]
        }
      }
    ],
    "datapointType" => "knx#date"
  },
  %{
    "ActsOnPhenomenonQualityKind" => ["tag#qk_ph_temporal_datevalue_site",
     "tag#qk_ph_temporal_time_site"],
    "AdjustsEquipmentQualityKind" => [],
    "FunctionPoint" => "mac#CurrentDateAndTime",
    "IsStatusOf" => [],
    "Label" => "Current Date and Time",
    "MeasuresEquipmentQualityKind" => [],
    "ObservesPhenomenonQualityKind" => [],
    "OperationKinds" => [
      %{
        "cardinality" => "1",
        "properties" => %{
          "core#refersTo" => ["tag#qk_ph_temporal_datevalue_site"],
          "tag#hasPointFunctionType" => ["tag#pv"],
          "tag#hasPointOperation" => ["tag#absoluteValue"]
        }
      },
      %{
        "cardinality" => "1",
        "properties" => %{
          "core#refersTo" => ["tag#qk_ph_temporal_time_site"],
          "tag#hasPointFunctionType" => ["tag#pv"],
          "tag#hasPointOperation" => ["tag#absoluteValue"]
        }
      }
    ],
    "datapointType" => "knx#dateTime"
  },
  %{
    "ActsOnPhenomenonQualityKind" => ["tag#qk_ph_temporal_time_site"],
    "AdjustsEquipmentQualityKind" => [],
    "FunctionPoint" => "mac#CurrentTime",
    "IsStatusOf" => [],
    "Label" => "Current Time",
    "MeasuresEquipmentQualityKind" => [],
    "ObservesPhenomenonQualityKind" => [],
    "OperationKinds" => [
      %{
        "cardinality" => "1",
        "properties" => %{
          "core#refersTo" => ["tag#qk_ph_temporal_time_site"],
          "tag#hasPointFunctionType" => ["tag#pv"],
          "tag#hasPointOperation" => ["tag#absoluteValue"]
        }
      }
    ],
    "datapointType" => "knx#timeOfDay"
  },
  %{
    "ActsOnPhenomenonQualityKind" => ["tag#qk_ph_temporal_time_site"],
    "AdjustsEquipmentQualityKind" => [],
    "FunctionPoint" => "mac#RelationToGMT",
    "IsStatusOf" => [],
    "Label" => "Relation to GMT",
    "MeasuresEquipmentQualityKind" => [],
    "ObservesPhenomenonQualityKind" => [],
    "OperationKinds" => [
      %{
        "cardinality" => "1",
        "properties" => %{
          "core#refersTo" => ["tag#qk_ph_temporal_time_site"],
          "tag#hasPointFunctionType" => ["tag#pv"],
          "tag#hasPointOperation" => ["tag#relativeValue"]
        }
      }
    ],
    "datapointType" => "knx#deltaTimeMin"
  },
  %{
    "ActsOnPhenomenonQualityKind" => ["tag#qk_ph_light_illuminance_room"],
    "AdjustsEquipmentQualityKind" => ["tag#qk_eq_blindsactuator_positionvector"],
    "FunctionPoint" => "mac#BlindsMoveUpDown",
    "IsStatusOf" => [],
    "Label" => "Blinds Move Up Down",
    "MeasuresEquipmentQualityKind" => [],
    "ObservesPhenomenonQualityKind" => [],
    "OperationKinds" => [
      %{
        "cardinality" => "1",
        "properties" => %{
          "core#refersTo" => ["tag#qk_eq_blindsactuator_positionvector"],
          "tag#hasOrigin" => ["tag#user"],
          "tag#hasPointFunctionType" => ["tag#activation"],
          "tag#hasPointOperation" => ["tag#enumeration"],
          "tag#hasStateType" => ["tag#downwards", "tag#upwards"]
        }
      }
    ],
    "datapointType" => "knx#upDown"
  },
  %{
    "ActsOnPhenomenonQualityKind" => ["tag#qk_ph_light_illuminance_room"],
    "AdjustsEquipmentQualityKind" => ["tag#qk_eq_blindsactuator_positionvector"],
    "FunctionPoint" => "mac#BlindsPositionLength",
    "IsStatusOf" => [],
    "Label" => "Blinds Position Length",
    "MeasuresEquipmentQualityKind" => [],
    "ObservesPhenomenonQualityKind" => [],
    "OperationKinds" => [
      %{
        "cardinality" => "1",
        "properties" => %{
          "core#refersTo" => ["tag#qk_eq_blindsactuator_positionvector"],
          "tag#hasOrigin" => ["tag#user"],
          "tag#hasPointFunctionType" => ["tag#cmd"],
          "tag#hasPointOperation" => ["tag#absoluteValue"]
        }
      }
    ],
    "datapointType" => "knx#lengthmm"
  },
  %{
    "ActsOnPhenomenonQualityKind" => ["tag#qk_ph_light_illuminance_room"],
    "AdjustsEquipmentQualityKind" => ["tag#qk_eq_blindsactuator_positionvector"],
    "FunctionPoint" => "mac#BlindsPositionPercentage",
    "IsStatusOf" => [],
    "Label" => "Blinds Position Percentage",
    "MeasuresEquipmentQualityKind" => [],
    "ObservesPhenomenonQualityKind" => [],
    "OperationKinds" => [
      %{
        "cardinality" => "1",
        "properties" => %{
          "core#refersTo" => ["tag#qk_eq_blindsactuator_positionvector"],
          "tag#hasOrigin" => ["tag#user"],
          "tag#hasPointFunctionType" => ["tag#cmd"],
          "tag#hasPointOperation" => ["tag#absoluteValue"]
        }
      }
    ],
    "datapointType" => "knx#scaling"
  },
  %{
    "ActsOnPhenomenonQualityKind" => ["tag#qk_ph_light_illuminance_room"],
    "AdjustsEquipmentQualityKind" => ["tag#qk_eq_slatsactuator_positionvector"],
    "FunctionPoint" => "mac#BlindsSlatPositionDegrees",
    "IsStatusOf" => [],
    "Label" => "Blinds Slat Position Degrees",
    "MeasuresEquipmentQualityKind" => [],
    "ObservesPhenomenonQualityKind" => [],
    "OperationKinds" => [
      %{
        "cardinality" => "1",
        "properties" => %{
          "core#refersTo" => ["tag#qk_eq_slatsactuator_positionvector"],
          "tag#hasOrigin" => ["tag#user"],
          "tag#hasPointFunctionType" => ["tag#cmd"],
          "tag#hasPointOperation" => ["tag#absoluteValue"]
        }
      }
    ],
    "datapointType" => "knx#rotationAngle"
  },
  %{
    "ActsOnPhenomenonQualityKind" => ["tag#qk_ph_light_illuminance_room"],
    "AdjustsEquipmentQualityKind" => ["tag#qk_eq_slatsactuator_positionvector"],
    "FunctionPoint" => "mac#BlindsSlatPositionPercentage",
    "IsStatusOf" => [],
    "Label" => "Blinds Slat Position Percentage",
    "MeasuresEquipmentQualityKind" => [],
    "ObservesPhenomenonQualityKind" => [],
    "OperationKinds" => [
      %{
        "cardinality" => "1",
        "properties" => %{
          "core#refersTo" => ["tag#qk_eq_slatsactuator_positionvector"],
          "tag#hasOrigin" => ["tag#user"],
          "tag#hasPointFunctionType" => ["tag#cmd"],
          "tag#hasPointOperation" => ["tag#absoluteValue"]
        }
      }
    ],
    "datapointType" => "knx#scaling"
  },
  %{
    "ActsOnPhenomenonQualityKind" => [],
    "AdjustsEquipmentQualityKind" => [],
    "FunctionPoint" => "mac#BlindsStatus",
    "IsStatusOf" => [],
    "Label" => "Blinds Status",
    "MeasuresEquipmentQualityKind" => ["tag#qk_eq_blindsactuator_positionvector"],
    "ObservesPhenomenonQualityKind" => ["tag#qk_ph_light_illuminance_room"],
    "OperationKinds" => [
      %{
        "cardinality" => "1",
        "properties" => %{
          "core#refersTo" => ["tag#qk_eq_blindsactuator_positionvector"],
          "tag#hasPointFunctionType" => ["tag#situation"],
          "tag#hasPointOperation" => ["tag#enumeration"],
          "tag#hasStateType" => ["tag#downwards", "tag#upwards"]
        }
      }
    ],
    "datapointType" => "knx#upDown"
  },
  %{
    "ActsOnPhenomenonQualityKind" => ["tag#qk_ph_light_illuminance_room"],
    "AdjustsEquipmentQualityKind" => ["tag#qk_eq_blindsactuator_positionvector",
     "tag#qk_eq_slatsactuator_positionvector"],
    "FunctionPoint" => "mac#BlindsStopStep",
    "IsStatusOf" => [],
    "Label" => "Blinds Stop Step",
    "MeasuresEquipmentQualityKind" => [],
    "ObservesPhenomenonQualityKind" => [],
    "OperationKinds" => [
      %{
        "cardinality" => "1",
        "properties" => %{
          "core#refersTo" => ["tag#qk_eq_slatsactuator_positionvector"],
          "tag#hasOrigin" => ["tag#user"],
          "tag#hasPointFunctionType" => ["tag#activation"],
          "tag#hasPointOperation" => ["tag#enumeration"],
          "tag#hasStateType" => ["tag#downwards", "tag#stopped", "tag#upwards"]
        }
      },
      %{
        "cardinality" => "1",
        "properties" => %{
          "core#refersTo" => ["tag#qk_eq_blindsactuator_positionvector"],
          "tag#hasOrigin" => ["tag#user"],
          "tag#hasPointFunctionType" => ["tag#activation"],
          "tag#hasPointOperation" => ["tag#enumeration"],
          "tag#hasStateType" => ["tag#downwards", "tag#stopped", "tag#upwards"]
        }
      }
    ],
    "datapointType" => "knx#step"
  },
  %{
    "ActsOnPhenomenonQualityKind" => ["tag#qk_ph_light_illuminance_room"],
    "AdjustsEquipmentQualityKind" => ["tag#qk_eq_blindsactuator_positionvector"],
    "FunctionPoint" => "mac#BlindsStopTrigger",
    "IsStatusOf" => [],
    "Label" => "Blinds Stop Trigger",
    "MeasuresEquipmentQualityKind" => [],
    "ObservesPhenomenonQualityKind" => [],
    "OperationKinds" => [
      %{
        "cardinality" => "1",
        "properties" => %{
          "core#refersTo" => ["tag#qk_eq_blindsactuator_positionvector"],
          "tag#hasOrigin" => ["tag#user"],
          "tag#hasPointFunctionType" => ["tag#activation"],
          "tag#hasPointOperation" => ["tag#trigger"],
          "tag#hasStateType" => ["tag#stopped"]
        }
      }
    ],
    "datapointType" => "knx#trigger"
  },
  %{
    "ActsOnPhenomenonQualityKind" => [],
    "AdjustsEquipmentQualityKind" => [],
    "FunctionPoint" => "mac#LightCurrentDimmingValue",
    "IsStatusOf" => [],
    "Label" => "Light Current Dimming Value",
    "MeasuresEquipmentQualityKind" => ["tag#qk_eq_luminaire_dimmlevel"],
    "ObservesPhenomenonQualityKind" => ["tag#qk_ph_light_illuminance"],
    "OperationKinds" => [
      %{
        "cardinality" => "1",
        "properties" => %{
          "core#refersTo" => ["tag#qk_eq_luminaire_dimmlevel"],
          "tag#hasPointFunctionType" => ["tag#pv"],
          "tag#hasPointOperation" => ["tag#absoluteValue"]
        }
      }
    ],
    "datapointType" => "knx#scaling"
  },
  %{
    "ActsOnPhenomenonQualityKind" => [],
    "AdjustsEquipmentQualityKind" => [],
    "FunctionPoint" => "mac#LightCurrentStatus",
    "IsStatusOf" => ["mac#LightSwitchRequest"],
    "Label" => "Light Current Status",
    "MeasuresEquipmentQualityKind" => ["tag#qk_eq_luminaire_dimmlevel"],
    "ObservesPhenomenonQualityKind" => ["tag#qk_ph_light_illuminance"],
    "OperationKinds" => [
      %{
        "cardinality" => "1",
        "properties" => %{
          "core#refersTo" => ["tag#qk_eq_luminaire_dimmlevel"],
          "tag#hasPointFunctionType" => ["tag#situation"],
          "tag#hasPointOperation" => ["tag#enumeration"],
          "tag#hasStateType" => ["tag#off", "tag#on"]
        }
      }
    ],
    "datapointType" => "knx#switch"
  },
  %{
    "ActsOnPhenomenonQualityKind" => ["tag#qk_ph_light_illuminance_room"],
    "AdjustsEquipmentQualityKind" => ["tag#qk_eq_blindsactuator_positionvector"],
    "FunctionPoint" => "mac#ShutterMoveUpDown",
    "IsStatusOf" => [],
    "Label" => "Shutter Move Up Down",
    "MeasuresEquipmentQualityKind" => [],
    "ObservesPhenomenonQualityKind" => [],
    "OperationKinds" => [
      %{
        "cardinality" => "1",
        "properties" => %{
          "tag#hasOrigin" => ["tag#user"],
          "tag#hasPointFunctionType" => ["tag#activation"],
          "tag#hasPointOperation" => ["tag#enumeration"],
          "tag#hasStateType" => ["tag#downwards", "tag#upwards"]
        }
      }
    ],
    "datapointType" => "knx#upDown"
  },
  %{
    "ActsOnPhenomenonQualityKind" => ["tag#qk_ph_light_illuminance_room"],
    "AdjustsEquipmentQualityKind" => ["tag#qk_eq_blindsactuator_positionvector"],
    "FunctionPoint" => "mac#ShutterPositionLength",
    "IsStatusOf" => [],
    "Label" => "Shutter Position Length",
    "MeasuresEquipmentQualityKind" => [],
    "ObservesPhenomenonQualityKind" => [],
    "OperationKinds" => [
      %{
        "cardinality" => "1",
        "properties" => %{
          "core#refersTo" => ["tag#qk_eq_blindsactuator_positionvector"],
          "tag#hasOrigin" => ["tag#user"],
          "tag#hasPointFunctionType" => ["tag#cmd"],
          "tag#hasPointOperation" => ["tag#absoluteValue"]
        }
      }
    ],
    "datapointType" => "knx#lengthmm"
  },
  %{
    "ActsOnPhenomenonQualityKind" => ["tag#qk_ph_light_illuminance_room"],
    "AdjustsEquipmentQualityKind" => ["tag#qk_eq_blindsactuator_positionvector"],
    "FunctionPoint" => "mac#ShutterPositionPercentage",
    "IsStatusOf" => [],
    "Label" => "Shutter Position Percentage",
    "MeasuresEquipmentQualityKind" => [],
    "ObservesPhenomenonQualityKind" => [],
    "OperationKinds" => [
      %{
        "cardinality" => "1",
        "properties" => %{
          "core#refersTo" => ["tag#qk_eq_blindsactuator_positionvector"],
          "tag#hasOrigin" => ["tag#user"],
          "tag#hasPointFunctionType" => ["tag#cmd"],
          "tag#hasPointOperation" => ["tag#absoluteValue"]
        }
      }
    ],
    "datapointType" => "knx#scaling"
  },
  %{
    "ActsOnPhenomenonQualityKind" => [],
    "AdjustsEquipmentQualityKind" => ["tag#qk_eq_blindsactuator_positionvector"],
    "FunctionPoint" => "mac#ShutterStatus",
    "IsStatusOf" => [],
    "Label" => "Shutter Status",
    "MeasuresEquipmentQualityKind" => [],
    "ObservesPhenomenonQualityKind" => ["tag#qk_ph_light_illuminance_room"],
    "OperationKinds" => [
      %{
        "cardinality" => "1",
        "properties" => %{
          "core#refersTo" => ["tag#qk_eq_blindsactuator_positionvector"],
          "tag#hasPointFunctionType" => ["tag#situation"],
          "tag#hasPointOperation" => ["tag#enumeration"],
          "tag#hasStateType" => ["tag#downwards", "tag#upwards"]
        }
      }
    ],
    "datapointType" => "knx#upDown"
  },
  %{
    "ActsOnPhenomenonQualityKind" => ["tag#qk_ph_light_illuminance_room"],
    "AdjustsEquipmentQualityKind" => ["tag#qk_eq_blindsactuator_positionvector"],
    "FunctionPoint" => "mac#ShutterStopStep",
    "IsStatusOf" => [],
    "Label" => "Shutter Stop Step",
    "MeasuresEquipmentQualityKind" => [],
    "ObservesPhenomenonQualityKind" => [],
    "OperationKinds" => [
      %{
        "cardinality" => "1",
        "properties" => %{
          "core#refersTo" => ["tag#qk_eq_blindsactuator_positionvector"],
          "tag#hasOrigin" => ["tag#user"],
          "tag#hasPointFunctionType" => ["tag#activation"],
          "tag#hasPointOperation" => ["tag#enumeration"],
          "tag#hasStateType" => ["tag#downwards", "tag#stopped", "tag#upwards"]
        }
      }
    ],
    "datapointType" => "knx#step"
  },
  %{
    "ActsOnPhenomenonQualityKind" => ["tag#qk_ph_light_illuminance_room"],
    "AdjustsEquipmentQualityKind" => ["tag#qk_eq_blindsactuator_positionvector"],
    "FunctionPoint" => "mac#ShutterStopTrigger",
    "IsStatusOf" => [],
    "Label" => "Shutter Stop Trigger",
    "MeasuresEquipmentQualityKind" => [],
    "ObservesPhenomenonQualityKind" => [],
    "OperationKinds" => [
      %{
        "cardinality" => "1",
        "properties" => %{
          "core#refersTo" => ["tag#qk_eq_blindsactuator_positionvector"],
          "tag#hasOrigin" => ["tag#user"],
          "tag#hasPointFunctionType" => ["tag#activation"],
          "tag#hasPointOperation" => ["tag#trigger"],
          "tag#hasStateType" => ["tag#stopped"]
        }
      }
    ],
    "datapointType" => "knx#trigger"
  },
  %{
    "ActsOnPhenomenonQualityKind" => [],
    "AdjustsEquipmentQualityKind" => [],
    "FunctionPoint" => "mac#FrostAlarm",
    "IsStatusOf" => [],
    "Label" => "Frost Alarm",
    "MeasuresEquipmentQualityKind" => [],
    "ObservesPhenomenonQualityKind" => ["tag#qk_ph_air_temperature_outside"],
    "OperationKinds" => [
      %{
        "cardinality" => "1",
        "properties" => %{
          "core#refersTo" => ["tag#qk_ph_air_temperature_outside"],
          "tag#hasPointFunctionType" => ["tag#alarm"],
          "tag#hasPointOperation" => ["tag#enumeration"],
          "tag#hasStateType" => ["tag#frost", "tag#noFrost"]
        }
      }
    ],
    "datapointType" => "knx#alarm"
  },
  %{
    "ActsOnPhenomenonQualityKind" => ["tag#qk_ph_light_illuminance"],
    "AdjustsEquipmentQualityKind" => ["tag#qk_eq_luminaire_dimmlevel"],
    "FunctionPoint" => "mac#LightAbsoluteSetvalueRequest",
    "IsStatusOf" => [],
    "Label" => "Light Absolute Setvalue Request",
    "MeasuresEquipmentQualityKind" => [],
    "ObservesPhenomenonQualityKind" => [],
    "OperationKinds" => [
      %{
        "cardinality" => "1",
        "properties" => %{
          "core#refersTo" => ["tag#qk_eq_luminaire_dimmlevel"],
          "tag#hasPointFunctionType" => ["tag#cmd"],
          "tag#hasPointOperation" => ["tag#absoluteValue"]
        }
      }
    ],
    "datapointType" => "knx#scaling"
  },
  %{
    "ActsOnPhenomenonQualityKind" => ["tag#qk_ph_light_illuminance"],
    "AdjustsEquipmentQualityKind" => ["tag#qk_eq_luminaire_dimmlevel"],
    "FunctionPoint" => "mac#LightRelativeDimmingRequest",
    "IsStatusOf" => [],
    "Label" => "Light Relative Dimming Request",
    "MeasuresEquipmentQualityKind" => [],
    "ObservesPhenomenonQualityKind" => [],
    "OperationKinds" => [
      %{
        "cardinality" => "1",
        "properties" => %{
          "core#refersTo" => ["tag#qk_eq_luminaire_dimmlevel"],
          "tag#hasOrigin" => ["tag#user"],
          "tag#hasPointFunctionType" => ["tag#cmd"],
          "tag#hasPointOperation" => ["tag#relativeValue"]
        }
      }
    ],
    "datapointType" => "knx#controlDimming"
  },
  %{
    "ActsOnPhenomenonQualityKind" => [],
    "AdjustsEquipmentQualityKind" => [],
    "FunctionPoint" => "mac#RainAlarm",
    "IsStatusOf" => [],
    "Label" => "Rain Alarm",
    "MeasuresEquipmentQualityKind" => [],
    "ObservesPhenomenonQualityKind" => ["tag#qk_ph_rain_volume_outside"],
    "OperationKinds" => [
      %{
        "cardinality" => "1",
        "properties" => %{
          "core#refersTo" => ["tag#qk_ph_rain_volume_outside"],
          "tag#hasPointFunctionType" => ["tag#alarm"],
          "tag#hasPointOperation" => ["tag#enumeration"],
          "tag#hasStateType" => ["tag#noRainfall", "tag#rainfall"]
        }
      }
    ],
    "datapointType" => "knx#alarm"
  },
  %{
    "ActsOnPhenomenonQualityKind" => [],
    "AdjustsEquipmentQualityKind" => [],
    "FunctionPoint" => "mac#WindAlarm",
    "IsStatusOf" => [],
    "Label" => "Wind Alarm",
    "MeasuresEquipmentQualityKind" => [],
    "ObservesPhenomenonQualityKind" => ["tag#qk_ph_wind_speed_outside"],
    "OperationKinds" => [
      %{
        "cardinality" => "1",
        "properties" => %{
          "core#refersTo" => ["tag#qk_ph_wind_speed_outside"],
          "tag#hasPointFunctionType" => ["tag#alarm"],
          "tag#hasPointOperation" => ["tag#enumeration"],
          "tag#hasStateType" => ["tag#noStorm", "tag#storm"]
        }
      }
    ],
    "datapointType" => "knx#alarm"
  },
  %{
    "ActsOnPhenomenonQualityKind" => ["tag#qk_ph_light_illuminance"],
    "AdjustsEquipmentQualityKind" => ["tag#qk_eq_luminaire_dimmlevel"],
    "FunctionPoint" => "mac#LightSwitchRequest",
    "IsStatusOf" => [],
    "Label" => "Light Switch Request",
    "MeasuresEquipmentQualityKind" => [],
    "ObservesPhenomenonQualityKind" => [],
    "OperationKinds" => [
      %{
        "cardinality" => "1",
        "properties" => %{
          "core#refersTo" => ["tag#qk_eq_luminaire_dimmlevel"],
          "tag#hasPointFunctionType" => ["tag#activation"],
          "tag#hasPointOperation" => ["tag#enumeration"],
          "tag#hasStateType" => ["tag#off", "tag#on"]
        }
      }
    ],
    "datapointType" => "knx#switch"
  }
]
