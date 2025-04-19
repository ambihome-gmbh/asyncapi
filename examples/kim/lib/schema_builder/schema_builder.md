

## Schema

generates a json-schema for all DPTs

the validated payload looks sth like

```json
{
    "type": "DPST-1-1",
    "value": "off"
}
```

and the schema dispatches using const-type:

```json
{
  "oneOf": [
    {
      "properties": {
        "type": { "const": "DPST-1-1" },
        "value": { "$ref": "#/$defs/DPST-1-1" }
      },
      "additionalProperties": false,
      "required": [ "type", "value" ]
    },
    ...
  ],
   "$defs": {
    "DPST-1-1": {
      "enum": [ "off", "on" ],
      "title": "switch",
      "type": "string"
    },
    ...
  },
}
```

composite DPTs are objects:

```json
{
    "type": "DPST-2-1",
    "value": {
        "control": "control",
        "switch": "on"
    }
}
```

```json
{
    "type": "DPST-246-600",
    "value": {
        "battery_charge_level": 99,
        "battery_duration_failure": "true",
        "battery_failure": "true",
        "battery_fully_charged": "true"
    }
}
```
