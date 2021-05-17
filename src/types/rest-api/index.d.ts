/* eslint-disable no-unused-vars */
import { UserAttributes } from '../model'

declare global {
  namespace Express {
    interface User extends UserAttributes {}
  }
}

/**
 * Token's type enum
 * Used for declaring "type" on TokenAttributes
 */
export const enum TokenType {
  access = 'access',
  refresh = 'refresh',
  resetPassword = 'resetPassword',
  verifyEmail = 'verifyEmail'
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
  TZ: string
  NODE_ENV: string
  PORT: number
  JWT_SECRET: string
  JWT_ACCESS_EXPIRATION_MINUTES: number
  JWT_REFRESH_EXPIRATION_DAYS: number
  JWT_RESET_PASSWORD_EXPIRATION_MINUTES: number
  JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: number
  POSTGRES_URL: string
  SMTP_HOST: string
  SMTP_PORT: number
  SMTP_USERNAME: string
  SMTP_PASSWORD: string
  EMAIL_FROM: string
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
