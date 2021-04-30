import { userService } from '.'
import { Token, User } from '../config/db'
import { tokenTypes } from '../config/tokens'
import { UserAttributes, UserModel } from '../types/rest-api'
import { FailResponse } from '../utils/jsend'

/**
 * Create a user
 */
const createUser = async (userBody: UserAttributes): Promise<UserModel> => {
  const isEmailTaken = await User.isEmailTaken(userBody.email)
  if (isEmailTaken) {
    throw new FailResponse(400, 'Email already registered', {
      email: 'Email already registered'
    })
  }

  const isPhoneTaken = await User.isPhoneTaken(userBody.phone)
  if (isPhoneTaken) {
    throw new FailResponse(400, 'Phone already registered', {
      phone: 'Phone already registered'
    })
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
    throw new FailResponse(401, 'Incorrect email or password', {
      signin: 'Incorrect email or password'
    })
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
      type: tokenTypes.REFRESH,
      blacklisted: false
    }
  })
  if (!refreshTokenDoc) {
    throw new FailResponse(404, 'Token not found', {
      refreshToken: 'not found'
    })
  }

  await refreshTokenDoc?.destroy()
}

export { createUser, signInUserWithEmailAndPassword, signOut }
