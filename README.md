<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>

## Description

This application is a task management system built with NestJS. It provides a robust backend API with a wide range of features, making it a comprehensive solution for managing tasks.

Key features include:

- **User Management**: The application supports user registration and authentication. Users can sign up, log in, and manage their profiles.

- **Task Management**: Users can create, read, update, and delete tasks. Each task has a status that can be updated as needed.

- **Authentication and Authorization**: The application uses JWT for authentication. It also includes guards to ensure that only authenticated users can perform certain operations.

- **Database**: The application uses PostgreSQL for data storage, providing a robust and scalable solution for managing application data.

- **Testing**: The application includes comprehensive unit and integration tests, ensuring that all features work as expected.

- **Swagger**: The application includes a Swagger UI for easy testing and exploration of the API.

- **Docker**: The application is Docker-ready, making it easy to build and deploy in any environment.

- **File Management**: The application uses Multer for handling file uploads. This includes features like updating user profile photos.

To get started with the application, follow the installation and running instructions below.

## Configuration

Create a `default.yml` file in the `config` directory with the following content:

```yaml
db:
  type: postgres
  host: ${DB_HOST} # Use 'localhost' for local development and 'postgres' for Docker
  port: 5432
  username: postgres
  password: postgres
  database: taskmanagement
  synchronize: true
jwt :
  secret : secret
  expiresIn : 3600
server :
  port: 3003

## Installation

```bash
$ yarn install
```

If you're running the application locally, you can set the `DB_HOST` environment variable to `localhost` in your `.env` file:

```bash
DB_HOST=localhost
```
This section explains how to create the default.yml configuration file and how to set the DB_HOST environment variable for local development and Docker. It also includes examples of the default.yml, .env, and docker-compose.yml files.

## Running the app in Docker

To run the application in Docker, you can use the `docker-compose.yml` file:

```bash
docker-compose up --build
```

This command builds the Docker images and starts the Docker containers as defined in the `docker-compose.yml` file.

If you're running the application in Docker, you should set the `DB_HOST` environment variable to `postgres` in your `docker-compose.yml` file:

```yaml
services:
  app:
    environment:
      DB_HOST: postgres
```

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).


## License

Nest is [MIT licensed](LICENSE).