# SPRINT 6 Dices API

### 📋Description

This project corresponds to Sprint 6 of Dices API. It is an API that manages players and games of a dice game. The implemented functionalities are detailed below:

   - POST /players: Creates a player.
   - PUT /players/{id}: Modifies the name of the player.
   - GET /players: Returns the list of all players in the system with their success percentage.
   - POST /games/{id}: A specific player makes a move.
   - DELETE /games/{id}: Deletes the moves of the player.
   - GET /games/{id}: Returns the list of moves for a player.
   - GET /ranking: Returns a ranking of players ordered by success percentage and the average success percentage of all players.
   - GET /ranking/loser: Returns the player with the worst success percentage.
   - GET /ranking/winner: Returns the player with the best success percentage.

### 📥 Installation


To get started with this template, you first need to clone the repository:

```bash
git clone https://github.com/dices-api-organization/dices-api-organized.git
```

Then, install the project dependencies:


```bash
cd dices-api-organized
 npm install
```

```bash
cd /src/dices/infrastructure/front
npm install
```

Now, you need Docker and Docker-compose, then you can stop your local MongoDB and MySQL databases and rise docker databases:


```bash
 npm run dev:startdocker
```

Put your user & password in the .env-template file and rename it as .env:



### 🏁 How To Start

To start the server and client in development mode, run the following script:

```bash
cd dices-api-organized
npm run dev
```


```bash
cd /src/dices/infrastructure/front
npm run dev
```

Then, open http://localhost:5173 to access the client.


### 🚀 Production

To run the server in production mode, first build the TypeScript code into JavaScript by running:

```bash
npm run build
```

###  Tests

```bash
npm run test
```



### 📝 Dependencies

- cors: middleware for handling Cross-Origin Resource Sharing (CORS)

- dotenv: loads environment variables from a .env file

- express: web framework for Node.js

- express-promise-router: promise-based router for Express

- helmet: middleware for adding security headers

- mongodb: driver for MongoDB

- mysql: driver for MySQL


### 🛠️ Dev Dependencies

- @types/cors: TypeScript definitions for cors

- @types/express: TypeScript definitions for express

- @types/jest: TypeScript definitions for jest

- @types/mysql: TypeScript definitions for mysql

- eslint: linter for TypeScript

- eslint-config-codely: ESLint configuration used by CodelyTV

- mysql: MySQL driver for Node.js

- ts-jest: TypeScript preprocessor for Jest

- ts-node-dev: TypeScript execution and development environment for Node.js

- tsc-watch: TypeScript compiler with file watching

### 🗂️ Folder structure

In this folder structure, the code is organized according to the principles of Hexagonal Architecture. 

```
src/
├── backend
│   ├── middlewares
│   ├── createServer.ts
│   └── Server.ts
└── todo
    ├── application
    ├── domain
    │   ├── entities
    │   └── repositories
    └── infrastructure
        ├── mongoDB
        ├── sql
        ├── routes
        ├── model
        └── front
```




RUTAS:
---





```sh
terminal test text
```