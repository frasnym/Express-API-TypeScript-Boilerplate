import { userService } from '.'
import { User } from '../config/db'
import { UserAttributes } from '../types/rest-api'
import { FailResponse } from '../utils/jsend'

/**
 * Create a user
 */
const createUser = async (
  userBody: UserAttributes
): Promise<Partial<UserAttributes>> => {
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

  const createdUser = await User.scope('withoutCredentials').create(userBody)

  return {
    id: createdUser.id,
    email: createdUser.email,
    name: createdUser.name,
    phone: createdUser.phone
  }
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
    throw new FailResponse(400, 'Incorrect email or password', {
      signin: 'Incorrect email or password'
    })
  }
  return user
}

export { createUser, signInUserWithEmailAndPassword }
