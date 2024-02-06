## Description

Mystic monster test project using NESTJS.
This project uses MONGODB for store data, REDIS for catching and JWT for auth.

Needs this environment vars:
```
PORT = Port used to listen http request. 3000 by default
MONGODB_URI = Mongo database URL with user, password and database name included
APIKEY = Required in all request headers for basic auth
JWT_SECRET = Required for auth register users.
REDIS_PASS = Password redis service
REDIS_USER = User redis service
REDIS_HOST = Hostname redis service
REDIS_PORT = Port redis service
```

This project uses a layers architecture similar to DDD (no time for full implementation) with the help of nest packages: Cache manager, Guards...

Have a tests examples in the `monster.service.spec.ts` file. No time for tests all the API, but usually I use TDD for coding

## ENDPOINTS
Remember all the endpoints need an APIKEY header

*Monster PATH*
```
GET /monsters -> paginated endpoint that returns a list of monsters. Query params: skip, limit and showDeleted
GET /monsters/:id -> returns a specific monster or return error
POST /monsters -> Create a new monster in DB with the body params. NEEDS Authorization header with format Bearer ....
PATCH /monsters/:id -> Update a specific monster with the body params or return error if not exists. NEEDS Authorization header with format Bearer ....
DELETE /monsters/:id -> Mark deleted a specific monster. NEEDS Authorization header with format Bearer ....
```

*Monster path params*
```
id: string; --> Monster _id database param used in UPDATE and REMOVE endpoints
```

*Monster body params (CREATE and UPDATE)*
```
title: string;
firstName: string;
lastName: string;
gender: string;
description: string;
nationality: string; --> Send all the nationalities in one string with format "SP,RU"
image: string;
gold: number;
speed: number;
health: number;
secretNotes: string;
password: string;
```


*Auth PATH*
```
POST /auth/register -> Register a new user with a specific role
POST /auth/login -> Login a existing user in DB and returns authorization token

```

*AUTH body params (REGISTER)*
```
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  password: string;
```

*AUTH body params (LOGIN)*
```
  email: string;
  password: string;
```

## PENDING
- Complete DDD and include valueobjects, functions and events in the domain layer (inside entities). Include toPrimitives.
- Hash the monster password on monster creation
- Review Redis implementation, with Redis all the endpoint are slower
- Add tests for all layers, mocking for unit tests and using mockDB for e2e
- Right now we can update GOLD using the update endpoint, but for requirements purposes must be some specific endpoints created for increase or decrease GOLD for specific monsters
- Implements the voting service. For this we can use some unique params in request like host and IP, or the other option is the front layer create some uniqueID for each user. Create a voting historic in DB for logging purposes and future reviews. With this we can stablish some auto gold changes without human interaction
- Create custom param validation for _id params
- In some places the types are not correct for DDD
- Use GITHUB CI or similar for deploying lifecycle (linter, tests, deploy on staging tests and deploy in prod)
- Create different environments with diferent variables: NODE_ENV with develop, test and production


## DEPLOYED
Deployed on: ADAPTABLE https://mystic-monster.adaptable.app
Using: MONGOATLAS and REDIS CLOUD

All the endpoints needs a header: APIKEY:12345678

For login:
email: bmike@elixir.com
password: 1234@Elixir

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
