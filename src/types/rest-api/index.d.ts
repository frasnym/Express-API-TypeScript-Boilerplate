import { BuildOptions, Model } from 'sequelize'

/**
 * Define how user model should looks like
 */
export interface UserAttributes {
  id: number
  name: string
  phone: string
  email: string
  pin: string
  password: string
  createdAt?: Date
  updatedAt?: Date
}
export interface UserModel extends Model<UserAttributes>, UserAttributes {}
export class User extends Model<UserModel, UserAttributes> {}
export type UserStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserModel
}

/**
 * This will be show a complete version of token (both access & refresh token)
 * complete with time it will expires.
 */
export interface AuthToken {
  access: {
    token: string
    expires: number
  }
  refresh: {
    token: string
    expires: number
  }
}

/**
 * Define all of variable available inside of .env file
 */
export interface EnvVars {
  NODE_ENV: string
  PORT: number
  JWT_SECRET: string
  JWT_ACCESS_EXPIRATION_MINUTES: number
  JWT_REFRESH_EXPIRATION_DAYS: number
  JWT_RESET_PASSWORD_EXPIRATION_MINUTES: number
  JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: number
  POSTGRES_USER: string
  POSTGRES_PASSWORD: string
  POSTGRES_DB: string
  POSTGRES_PORT: number
  POSTGRES_HOST: string
}

/**
 * JWT Payload needed for authorization
 */
export interface JWTPayload {
  sub: number
  iat: number
  exp: number
  type: string
}

/**
 * One of: year, quarter, month, week, day, hour, minute, second
 * Used to work with dateAdd utils
 */
export type DateInterval =
  | 'year'
  | 'quarter'
  | 'month'
  | 'week'
  | 'day'
  | 'hour'
  | 'minute'
  | 'second'
