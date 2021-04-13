import morgan from 'morgan'
import { logger } from './logger'

const getIpFormat = () =>
  process.env.NODE_ENV === 'production' ? ':remote-addr - ' : ''
const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`

const successHandler = morgan(successResponseFormat, {
  skip: (_req, res) => res.statusCode >= 400,
  stream: { write: (message) => logger.info(message.trim()) }
})

const errorHandler = morgan(errorResponseFormat, {
  skip: (_req, res) => res.statusCode < 400,
  stream: { write: (message) => logger.error(message.trim()) }
})

export = {
  successHandler,
  errorHandler
}
