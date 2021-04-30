import { userService } from '.'
import { User } from '../config/db'
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

export { createUser, signInUserWithEmailAndPassword }
