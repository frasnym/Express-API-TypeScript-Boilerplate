# NodeJS API Server Boilerplate (Work In Progress)

A boilerplate/starter project for quickly building APIs using NodeJS, TypeScrypt, Express & Sequelize

## 🎨 Features

- **Linting and Code Formatter**: with [ESLint](https://eslint.org/docs/user-guide/getting-started) and [Prettier](https://prettier.io/)
- **Git Hooks**: with [Husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged)
- **Logging**: using [Morgan](https://github.com/expressjs/morgan) integrated with [Winston](https://github.com/winstonjs/winston)
- **Environment variables**: centralized load with [dotenv](https://github.com/motdotla/dotenv) and [cross-env](https://github.com/kentcdodds/cross-env)
- **Validation**: request data validation using [Joi](https://joi.dev/api)
- **Error Handling**: centralized error handling mechanism
- **Testing**: unit and integration tests using [Jest](https://jestjs.io)
- **Authentication and authorization**: using [passport](http://www.passportjs.org)
- **API documentation**: with [swaggerJSDoc](https://github.com/Surnet/swagger-jsdoc) and [swaggerUI](https://github.com/scottie1984/swagger-ui-express)
- **Security**: set security HTTP headers using [helmet](https://helmetjs.github.io)
- **[Docker](https://docker.com/)** support

## 🌲 Project Folder Structure

```
src\
 |--config\         # Environment variables and configuration related things
 |--controllers\    # Route controllers (controller layer)
 |--docs\           # Swagger files
 |--middlewares\    # Custom express middlewares
 |--models\         # Mongoose models (data layer)
 |--routes\         # Routes
 |--services\       # Business logic (service layer)
 |--utils\          # Utility classes and functions
 |--validations\    # Request data validation schemas
 |--app.ts          # Express app
 |--index.ts        # App entry point
```

## 💡 Reference

- [hagopj13/node-express-boilerplate](https://github.com/hagopj13/node-express-boilerplate)
- [ThomasHambach/express-joi-typescript-validate-middleware.ts](https://gist.github.com/ThomasHambach/6103774085fbe258a0377af35ed3d489)
- [omniti-labs/jsend](https://github.com/omniti-labs/jsend)

## 👮 License

[MIT](LICENSE)
