import { UserAttributes } from '../types/rest-api'

/**
 * Create a user
 * @param {UserAttributes} userBody
 * @returns {Promise<UserAttributes>}
 */
const createUser = async (
  userBody: UserAttributes
): Promise<UserAttributes> => {
  //  TODO: Check if email is taken
  //  TODO: Check if phone is taken

  // TODO: Insert to DB
  const user = userBody

  return user
}

export { createUser }
