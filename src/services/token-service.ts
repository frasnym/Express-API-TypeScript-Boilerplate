import jwt from 'jsonwebtoken'
import { Token } from '../config/db'
import envVars from '../config/envVars'
import { tokenTypes } from '../config/tokens'
import {
  AuthToken,
  JWTPayload,
  TokenType,
  UserAttributes
} from '../types/rest-api'
import { dateAdd } from '../utils/date'
import { ErrorResponse } from '../utils/jsend'

/**
 * Generate token
 */
const generateToken = (userId: number, expires: Date, type: string): string => {
  if (!(Object.values(tokenTypes).indexOf(type) > -1)) {
    const stack = {
      location: 'generateToken',
      expected: tokenTypes,
      got: type
    }
    throw new ErrorResponse(500, undefined, stack)
  }

  const payload: JWTPayload = {
    sub: userId,
    iat: new Date().getTime(),
    exp: expires.getTime(),
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
    tokenTypes.ACCESS
  )

  const refreshTokenExpires = dateAdd(
    NOW,
    'day',
    envVars.jwt.refreshExpirationDays
  )

  const refreshToken = generateToken(
    user.id!,
    refreshTokenExpires,
    tokenTypes.REFRESH
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

export { generateAuthTokens, generateToken, saveToken, verifyToken }
