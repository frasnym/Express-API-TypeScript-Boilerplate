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
  delete user.password

  return user
}

export { createUser }
