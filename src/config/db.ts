import * as sequelize from 'sequelize'
import { tokenModel, userModel } from '../models'
import envVars from './envVars'

let dbConfig: sequelize.Sequelize
if (envVars.env === 'test') {
  dbConfig = new sequelize.Sequelize('sqlite::memory', {
    logging: false
  })
} else {
  dbConfig = new sequelize.Sequelize(
    envVars.postgres.database,
    envVars.postgres.user,
    envVars.postgres.password,
    {
      dialect: 'postgres',
      host: envVars.postgres.host,
      port: envVars.postgres.port,
      logging: false
    }
  )
}

export { dbConfig }

export const User = userModel.UserFactory(dbConfig)
export const Token = tokenModel.TokenFactory(dbConfig)

Token.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' })
