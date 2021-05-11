/* eslint-disable no-unused-vars */
import { BuildOptions, Model } from 'sequelize'
import { TokenType } from '../rest-api'

/**
 * Define how user model should looks like
 */
export interface UserAttributes {
  id: number
  name: string
  phone: string
  email: string
  pin: string
  password: string
  createdAt?: Date
  updatedAt?: Date
}
export interface UserModel extends Model<UserAttributes>, UserAttributes {
  isPasswordMatch(password: string): boolean
  withoutCredentials(): Partial<UserAttributes>
}
export class User extends Model<UserModel, UserAttributes> {}
export type UserStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserModel
  isEmailTaken(
    email: string,
    excludeUserId?: number | undefined
  ): Promise<boolean>
  isPhoneTaken(
    phone: string,
    excludeUserId?: number | undefined
  ): Promise<boolean>
}

/**
 * Define how token model should looks like
 */
export interface TokenAttributes {
  token: string
  userId: number
  type: TokenType
  expires: Date
  blacklisted: boolean
  createdAt?: Date
  updatedAt?: Date
}
export interface TokenModel extends Model<TokenAttributes>, TokenAttributes {}
export class Token extends Model<TokenModel, TokenAttributes> {}
export type TokenStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): TokenModel
}
