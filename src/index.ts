import { Server } from 'node:http'
import app from './app'
import { logger } from './config/logger'
import envVars from './config/envVars'
import { dbConfig } from './config/db'

const PORT = envVars.port

let server: Server
dbConfig.sync().then(() => {
  logger.info('Sequelize: All models were synchronized successfully')
  server = app.listen(PORT, () => {
    logger.info(`Application is up and running on port ${PORT}`)
  })
})

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed')
      process.exit(1)
    })
  } else {
    process.exit(1)
  }
}

const unexpectedErrorHandler = (error: Error) => {
  logger.error(error)
  exitHandler()
}

process.on('uncaughtException', unexpectedErrorHandler)
process.on('unhandledRejection', unexpectedErrorHandler)

process.on('SIGTERM', () => {
  logger.info('SIGTERM received')
  if (server) {
    server.close()
  }
})
