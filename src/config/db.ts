import * as sequelize from 'sequelize'
import { TokenFactory, UserFactory } from '../models'
import envVars from './envVars'

const dbConfig = new sequelize.Sequelize(
  envVars.postgres.url,
  envVars.postgres.options
)

export { dbConfig }

export const User = UserFactory(dbConfig)
export const Token = TokenFactory(dbConfig)

Token.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' })
