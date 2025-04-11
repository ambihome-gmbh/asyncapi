# KNX KIM Ontology Extension – Spatial Structure & Adjacency

## Goal

To extend the KNX KIM ontology to include building-level structural elements and spatial relationships between rooms, enabling the modeling of equipment placement and room adjacency.

---

## Requirements

### 1. Model structural parts of rooms:
- Walls
- Ceilings
- Room-specific floors

### 2. Represent access and spatial connection:
- Rooms are connected to other rooms via doors
- Doors are located in walls
- Walls may contain windows
- Walls may belong to facades

### 3. Model facades:
- A façade has a **cardinal direction** (N, E, S, W)
- Façades can own walls

### 4. Classify wall types:
- Walls can be inner or outer

### 5. Allow equipment to be placed on:
- Walls
- Ceilings
- Room floors
- Doors
- Windows

---

## Ontology Extensions

### New Classes

| Class           | Description                                 |
|------------------|---------------------------------------------|
| `loc#Wall`       | A vertical surface enclosing or dividing rooms |
| `loc#OuterWall`  | A wall exposed to the outside               |
| `loc#InnerWall`  | A wall separating rooms internally          |
| `loc#Ceiling`    | The upper interior surface of a room        |
| `loc#RoomFloor`  | The lower horizontal surface of a room      |
| `loc#Door`       | A structure that connects two rooms         |
| `loc#Window`     | An opening in a wall                        |
| `loc#Facade`     | An exterior face of a building              |

---

### New Object Properties

| Property                   | Range             | Description                                      |
|----------------------------|-------------------|--------------------------------------------------|
| `loc#hasWall`              | `loc#Wall`        | Room contains wall                               |
| `loc#hasCeiling`           | `loc#Ceiling`     | Room contains ceiling                            |
| `loc#hasRoomFloor`         | `loc#RoomFloor`   | Room contains floor                              |
| `loc#hasDoor`              | `loc#Door`        | Wall contains door                               |
| `loc#hasWindow`            | `loc#Window`      | Wall contains window                             |
| `loc#hasFacade`            | `loc#Facade`      | Building has a facade                            |
| `loc#hasCardinalDirection` | `loc#Direction`   | Facade has direction (N, E, S, W)                |
| `loc#isOnFacade`           | `loc#Facade`      | Wall is part of a facade                         |
| `loc#connectsRoom`         | `loc#Room`        | Door or window connects room(s)                  |
| `loc#hasEquipment`         | `core#Equipment`  | Equipment is attached to a surface or element    |

---

### Enum for Cardinal Directions

```json
{
  "Direction": ["north", "east", "south", "west"]
}
```


### Class Hierarchy Suggestions

```
loc#SurfaceElement (abstract)
├── loc#Wall
│   ├── loc#OuterWall
│   └── loc#InnerWall
├── loc#Ceiling
└── loc#RoomFloor

loc#AccessStructure
├── loc#Door
└── loc#Window
```