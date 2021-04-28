import { User } from '../config/db'
import { UserAttributes } from '../types/rest-api'
import { FailResponse } from '../utils/jsend'

/**
 * Create a user
 * @param {UserAttributes} userBody
 * @returns {Promise<Partial<UserAttributes>>}
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

export { createUser }
