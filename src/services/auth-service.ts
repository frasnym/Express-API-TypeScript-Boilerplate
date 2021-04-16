import { UserAttributes } from '../types/rest-api'

/**
 * Create a user
 * @param {UserAttributes} userBody
 * @returns {Promise<Partial<UserAttributes>>}
 */
const createUser = async (
  userBody: UserAttributes
): Promise<Partial<UserAttributes>> => {
  //  TODO: Check if email is taken
  //  TODO: Check if phone is taken

  // TODO: Insert to DB
  const user: Partial<UserAttributes> = userBody

  user.id = Math.random()
  delete user.password
  delete user.pin

  return user
}

export { createUser }
