import { tokenService, userService } from '.'
import { Token, User } from '../config/db'
import { UserAttributes, UserModel } from '../types/model'
import { TokenType } from '../types/rest-api'
import { ErrorResponse, FailResponse } from '../utils/jsend'

/**
 * Create a user
 */
const createUser = async (userBody: UserAttributes): Promise<UserModel> => {
  const isEmailTaken = await User.isEmailTaken(userBody.email)
  if (isEmailTaken) {
    throw new FailResponse(400, 'Email already registered')
  }

  const isPhoneTaken = await User.isPhoneTaken(userBody.phone)
  if (isPhoneTaken) {
    throw new FailResponse(400, 'Phone already registered')
  }

  return await User.create(userBody)
}

/**
 * SignIn with email and password
 */
const signInUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  const user = await userService.getUserByEmail(email)
  if (!user || !user.isPasswordMatch(password)) {
    throw new FailResponse(401, 'Incorrect email or password')
  }
  return user
}

/**
 * SignOut
 * Delete refresh token from database
 */
const signOut = async (refreshToken: string) => {
  const refreshTokenDoc = await Token.findOne({
    where: {
      token: refreshToken,
      type: TokenType.refresh,
      blacklisted: false
    }
  })
  if (!refreshTokenDoc) {
    throw new FailResponse(404, 'Token not found')
  }

  await refreshTokenDoc?.destroy()
}

const refreshAuth = async (refreshToken: string) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(
      refreshToken,
      TokenType.refresh
    )

    const user = await userService.getUserById(refreshTokenDoc.userId)
    if (!user) {
      throw new Error()
    }
    await refreshTokenDoc.destroy()

    return tokenService.generateAuthTokens(user)
  } catch (error) {
    throw new ErrorResponse(500, 'Please authenticate', error, 'RFA')
  }
}

export { createUser, signInUserWithEmailAndPassword, signOut, refreshAuth }
