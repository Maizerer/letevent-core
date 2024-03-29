<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

# LetEvent

Сайт агрегатор для арендодателей и организаторов и поиск площадок для мероприятий

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

## Docker

You should create database in docker postgres <letevent_core>
```bash
$ docker-compose up -d --build
```

## Migration

```bash
# generate migration
$ npm run typeorm:migration:generate <migration-name>

# run migration
$ npm run typeorm:migration:run
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

- Author - [Rustem Galimov](https://kamilmysliwiec.com)

## License

Nest is [MIT licensed](LICENSE).
