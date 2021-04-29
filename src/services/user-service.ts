import { User } from '../config/db'
import { UserModel } from '../types/rest-api'

/**
 * Get user by email
 */
const getUserByEmail = (email: string): Promise<UserModel | null> => {
  return User.findOne({ where: { email } })
}

export { getUserByEmail }
