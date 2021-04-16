import jwt from 'jsonwebtoken'
import envVars from '../config/envVars'
import { tokenTypes } from '../config/tokens'
import { AuthToken, UserAttributes } from '../types/rest-api'
import { dateAdd } from '../utils/date'
import { ErrorResponse } from '../utils/jsend'

/**
 * Generate token
 * @param {number} userId
 * @param {Date} expires
 * @param {string} secret
 * @returns {string}
 */
const generateToken = (
  userId: number,
  expires: Date,
  type: string,
  secret: string = envVars.jwt.secret
): string => {
  if (!(Object.values(tokenTypes).indexOf(type) > -1)) {
    const stack = {
      location: 'generateToken',
      expected: tokenTypes,
      got: type
    }
    throw new ErrorResponse(500, undefined, stack)
  }

  const payload = {
    sub: userId,
    iat: new Date().getTime(),
    exp: expires.getTime(),
    type
  }
  return jwt.sign(payload, secret)
}

/**
 * Generate auth tokens
 * @param {UserAttributes} user
 * @returns {Promise<AuthToken>}
 */
const generateAuthTokens = async (user: UserAttributes): Promise<AuthToken> => {
  const NOW = new Date()
  const accessTokenExpires = dateAdd(
    NOW,
    'minute',
    envVars.jwt.accessExpirationMinutes
  )
  const accessToken = generateToken(
    user.id,
    accessTokenExpires,
    tokenTypes.ACCESS
  )

  const refreshTokenExpires = dateAdd(
    NOW,
    'day',
    envVars.jwt.refreshExpirationDays
  )
  const refreshToken = generateToken(
    user.id,
    refreshTokenExpires,
    tokenTypes.REFRESH
  )

  // TODO: Save token to database

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

export { generateAuthTokens }
