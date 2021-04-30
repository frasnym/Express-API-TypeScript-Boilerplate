import { User } from '../config/db'
import { UserModel } from '../types/rest-api'

/**
 * Get user by email
 */
const getUserByEmail = (email: string): Promise<UserModel | null> => {
  return User.findOne({ where: { email } })
}

/**
 * Get user by id
 */
const getUserById = (id: number): Promise<UserModel | null> => {
  return User.findByPk(id)
}

export { getUserByEmail, getUserById }
