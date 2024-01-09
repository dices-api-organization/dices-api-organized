# SPRINT 6 Dices API

### 📋Description

This project corresponds to Sprint 6 of Dices API. It is an API that manages players and games of a dice game. The implemented functionalities are detailed below:

   - POST /userRegister: Register a player. Requires a body with {"name":"testName","password":"testPassword"}.
   - POST /userLogin: Login as a player. Requires a body with {"name":"testName","password":"testPassword"}.

   - PUT /play/update: Change player's name. Requires a body with {"id":"testId", "name":"testName"}.
   - DELETE /play/delete: Delete a player's dice throws. Requires a body with {"id":"testId"}.
   - POST /play/throw: Play a game as your logged in player. Requires a body with {"id":"testId"}.
   - GET /play/players: Get list of all players and their ratings. Requires no body.
   - GET /play/rates: Get ranking of best players, and overall ranking amongst players. Requires no body.
   - GET /play/games/:id: Get a list of your logged in player's games. Requires ID to be passed as URL param. For example, /play/games/4.
   - GET /play/min: Get the best player. Requires no body.
   - GET /play/max: Get the worst player. Requires no body.

Our ThunderClient collection, './thunder-collection_dices-api-thunderclient.json', must replace these "testId", "testName" and "testPassword" values with the real values for our user's passwords, names, etc.

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

Now, you need Docker and Docker-compose, then you can stop your local MongoDB and MySQL databases and rise docker databases. This command will start both a MySQL database and a MongoDB database at the same time.


```bash
 npm run dev:startdocker
```

Rename the .env-template file into .env. In this .env, the variable DATABASE should be set to your desired database. Either DATABASE='mongodb' or DATABASE='mysql'. Depending on which one is selected, the website will run with one databse or another. All other usernames, passwords, etc, are preset in the template file and should work.



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

To perform the tests, the environment variable DATABASE must be set to DATABASE='mongodb'.

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

### Database UML

The file "./mysql_UML.png" is a UML showing our MySQL database.

