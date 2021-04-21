import * as sequelize from 'sequelize'
import { UserFactory } from '../models/user-model'
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

export const User = UserFactory(dbConfig)
