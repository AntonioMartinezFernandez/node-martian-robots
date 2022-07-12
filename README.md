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

## Run project in "dev" mode

```
docker-compose up -d
(or edit the .env file to stablish a custom MongoDB configuration)

npm run dev
```

## Build and run project

```
npm run build
npm start
```

## Endpoints

### GET /mission

It return the status server.

### GET /mission/historical

It return the historical missions data.

### POST /mission

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
