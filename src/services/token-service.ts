import jwt from 'jsonwebtoken'
import { Token } from '../config/db'
import envVars from '../config/envVars'
import { UserAttributes } from '../types/model'
import { AuthToken, JWTPayload, TokenType } from '../types/rest-api'
import { dateAdd } from '../utils/date'
import { ErrorResponse } from '../utils/jsend'

/**
 * Generate token
 */
const generateToken = (
  userId: number,
  expires: Date,
  type: TokenType
): string => {
  const tokenTypes = ['access', 'refresh', 'resetPassword', 'verifyEmail']
  if (!tokenTypes.includes(type)) {
    const stack = {
      location: 'generateToken',
      expected: tokenTypes,
      got: type
    }
    throw new ErrorResponse(500, undefined, stack)
  }

  const payload: JWTPayload = {
    sub: userId,
    iat: new Date().getTime() / 1000,
    exp: expires.getTime() / 1000,
    type
  }
  return jwt.sign(payload, envVars.jwt.secret)
}

/**
 * Save a token
 */
const saveToken = async (
  token: string,
  userId: number,
  expires: Date,
  type: TokenType,
  blacklisted: boolean = false
) => {
  const tokenDoc = await Token.create({
    token,
    userId,
    expires: expires,
    type,
    blacklisted
  })

  return tokenDoc
}

/**
 * Generate auth tokens
 */
const generateAuthTokens = async (
  user: Partial<UserAttributes>
): Promise<AuthToken> => {
  const NOW = new Date()
  const accessTokenExpires = dateAdd(
    NOW,
    'minute',
    envVars.jwt.accessExpirationMinutes
  )
  const accessToken = generateToken(
    user.id!,
    accessTokenExpires,
    TokenType.access
  )

  const refreshTokenExpires = dateAdd(
    NOW,
    'day',
    envVars.jwt.refreshExpirationDays
  )

  const refreshToken = generateToken(
    user.id!,
    refreshTokenExpires,
    TokenType.refresh
  )

  await saveToken(
    refreshToken,
    user.id!,
    refreshTokenExpires,
    TokenType.refresh
  )

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.getTime()
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.getTime()
    }
  }
}

/**
 * Generate verify email token
 */
const generateVerifyEmailToken = async (user: UserAttributes) => {
  const expires = dateAdd(
    new Date(),
    'minute',
    envVars.jwt.verifyEmailExpirationMinutes
  )
  const verifyEmailToken = generateToken(
    user.id,
    expires,
    TokenType.verifyEmail
  )
  await saveToken(verifyEmailToken, user.id, expires, TokenType.verifyEmail)
  return verifyEmailToken
}

/**
 * Verify token and return token doc (or throw an error if it is not valid)
 */
const verifyToken = async (token: string, type: TokenType) => {
  const payload = jwt.verify(token, envVars.jwt.secret) as JWTPayload

  const tokenDoc = await Token.findOne({
    where: { token, type, userId: payload.sub, blacklisted: false }
  })
  if (!tokenDoc) {
    throw new Error('Token not found')
  }
  return tokenDoc
}

export {
  generateAuthTokens,
  generateVerifyEmailToken,
  generateToken,
  saveToken,
  verifyToken
}
