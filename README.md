# node-martian-robots

"Martian Robots" challenge with NodeJS

## Clone and install project

```
git clone https://github.com/AntonioMartinezFernandez/node-martian-robots.git
cd node-martian-robots
npm i
```

## Run tests

```
npm run test
```

## Run linter

```
npm run lint
```

## Run app (with Docker)

```
docker compose up
```

## Endpoints

### GET http://localhost:3000/mission

It return the status server.

### GET http://localhost:3000/mission/historical

It return the historical missions data.

### POST http://localhost:3000/mission

It allow to send a new mission.

Request format:

```
{
  "FieldSurface": ["5 3"],
  "MissionCommands": [
    ["1 1 E", "RFRFRFRF"],
    ["3 2 N", "FRRFLLFFRRFLL"],
    ["0 3 W", "LLFFFRFLFL"]
  ]
}
```

Response format:

```
{
    "MissionResult": [
        [
            "1 1 E"
        ],
        [
            "3 3 N LOST"
        ],
        [
            "4 2 N"
        ]
    ]
}
```
