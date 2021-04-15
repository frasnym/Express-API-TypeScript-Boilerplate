import { ErrorRequestHandler } from 'express'
import envVars from '../config/envVars'
import { logger } from '../config/logger'

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  const { statusCode, data, status } = err

  res.locals.errorMessage = err.message

  const response = {
    status,
    data,
    ...(envVars.env === 'development' && { stack: err.stack })
  }

  if (envVars.env === 'development') {
    logger.error(err)
  }

  return res.status(statusCode).send(response)
}

export { errorHandler }
