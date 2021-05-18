import { tokenService } from '.'
import { Token, User } from '../config/db'
import { UserAttributes, UserModel } from '../types/model'
import { TokenType } from '../types/rest-api'
import { FailResponse } from '../utils/jsend'

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

/**
 * Update user by id
 */
const updateUserById = async (
  userId: number,
  updateBody: Partial<UserAttributes>
) => {
  const user = await getUserById(userId)
  if (!user) {
    throw new FailResponse(404, 'User not found')
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new FailResponse(400, 'Email already taken')
  }
  Object.assign(user, updateBody)
  await user.save()
  return user
}

/**
 * Verify email
 */
const verifyEmail = async (verifyEmailToken: string) => {
  try {
    const verifyEmailTokenDoc = await tokenService.verifyToken(
      verifyEmailToken,
      TokenType.verifyEmail
    )

    const user = await getUserById(verifyEmailTokenDoc.userId)
    if (!user) {
      throw new Error(verifyEmailTokenDoc.userId.toString())
    }

    await Token.destroy({
      where: { userId: user.id, type: TokenType.verifyEmail }
    })

    await updateUserById(user.id, { isEmailVerified: true })
  } catch (error) {
    throw new FailResponse(401, 'Email verification failed', error.message)
  }
}

/**
 * Reset password
 */
const resetPassword = async (
  resetPasswordToken: string,
  newPassword: string
) => {
  try {
    const resetPasswordTokenDoc = await tokenService.verifyToken(
      resetPasswordToken,
      TokenType.resetPassword
    )
    const user = await getUserById(resetPasswordTokenDoc.userId)
    if (!user) {
      throw new Error(resetPasswordTokenDoc.userId.toString())
    }
    await updateUserById(user.id, { password: newPassword })
    await Token.destroy({
      where: { userId: user.id, type: TokenType.resetPassword }
    })
  } catch (error) {
    throw new FailResponse(401, 'Password reset failed', error.message)
  }
}

export { getUserByEmail, getUserById, verifyEmail, resetPassword }
