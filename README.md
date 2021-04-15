# NodeJS API Server Boilerplate (Work In Progress)

A boilerplate/starter project for quickly building APIs using NodeJS, TypeScrypt, Express & Sequelize

## 🎨 Features

- **Linting and Code Formatter**: with [ESLint](https://eslint.org/docs/user-guide/getting-started) and [Prettier](https://prettier.io/)
- **Git Hooks**: with [Husky](https://github.com/typicode/husky) and [lint-staged](https://github.com/okonet/lint-staged)
- **Logging**: using [Morgan](https://github.com/expressjs/morgan) integrated with [Winston](https://github.com/winstonjs/winston)
- **Environment variables**: centralized load with [dotenv](https://github.com/motdotla/dotenv) and [cross-env](https://github.com/kentcdodds/cross-env)
- **Validation**: request data validation using [Joi](https://joi.dev/api)

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

## 👮 License

[MIT](LICENSE)
