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

  //  TODO: Check if phone is taken

  const user = await User.create(userBody)

  // TODO: delete user.password
  // TODO: delete user.pin

  return user
}

export { createUser }
