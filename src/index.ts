import path from 'path'
import dotenv from 'dotenv'

import app from './app'
import { logger } from './helpers/logger'

dotenv.config({ path: path.join(__dirname, '../.env') })
const PORT = process.env.PORT

const server = app.listen(PORT, () => {
  logger.info(`Application is up and running on port ${PORT}`)
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
