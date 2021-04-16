// import { BuildOptions, Model } from 'sequelize';

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
// export interface UserModel extends Model<UserAttributes>, UserAttributes {}
// export class User extends Model<UserModel, UserAttributes> {}
// export type UserStatic = typeof Model & {
//     new (values?: object, options?: BuildOptions): UserModel;
// };

/**
 * This will be show a complete version of token (both access & refresh token)
 * complete with time it will expires.
 */
export interface AuthToken {
  access: {
    token: string
    expires: string
  }
  refresh: {
    token: string
    expires: string
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
