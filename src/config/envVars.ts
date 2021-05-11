import dotenv from 'dotenv'
import path from 'path'
import Joi from 'joi'
import { EnvVars } from '../types/rest-api'

dotenv.config({ path: path.join(__dirname, '../../.env') })

const envVarsSchema = Joi.object({
  TZ: Joi.string().default('Asia/Makassar'),
  NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
  PORT: Joi.number().default(3000),
  JWT_SECRET: Joi.string().required().description('JWT secret key'),
  JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
    .default(30)
    .description('minutes after which access tokens expire'),
  JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
    .default(30)
    .description('days after which refresh tokens expire'),
  JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
    .default(10)
    .description('minutes after which reset password token expires'),
  JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
    .default(10)
    .description('minutes after which verify email token expires'),
  POSTGRES_USER: Joi.string().default('root'),
  POSTGRES_PASSWORD: Joi.string().default('root'),
  POSTGRES_DB: Joi.string().default('boilerplate'),
  POSTGRES_PORT: Joi.number().default(3000),
  POSTGRES_HOST: Joi.string().default('localhost'),
  SMTP_HOST: Joi.string().description('server that will send the emails'),
  SMTP_PORT: Joi.number().description('port to connect to the email server'),
  SMTP_USERNAME: Joi.string().description('username for email server'),
  SMTP_PASSWORD: Joi.string().description('password for email server'),
  EMAIL_FROM: Joi.string().description(
    'the from field in the emails sent by the app'
  )
}).unknown()

const { value, error } = envVarsSchema.validate(process.env)
if (error) {
  throw new Error(`Environment validation error: ${error.message}`)
}

const envVars: EnvVars = value

export default {
  timezone: envVars.TZ,
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes:
      envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES
  },
  postgres: {
    host: envVars.POSTGRES_HOST,
    user: envVars.POSTGRES_USER,
    password: envVars.POSTGRES_PASSWORD,
    database: envVars.POSTGRES_DB,
    port: envVars.POSTGRES_PORT
  },
  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      auth: {
        user: envVars.SMTP_USERNAME,
        pass: envVars.SMTP_PASSWORD
      }
    },
    from: envVars.EMAIL_FROM
  }
}
