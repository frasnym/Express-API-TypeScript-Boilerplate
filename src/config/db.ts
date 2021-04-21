import * as sequelize from 'sequelize'
import { UserFactory } from '../models/user-model'
import envVars from './envVars'

export const dbConfig = new sequelize.Sequelize(
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

export const User = UserFactory(dbConfig)
