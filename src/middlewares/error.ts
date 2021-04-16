import { ErrorRequestHandler } from 'express'
import envVars from '../config/envVars'
import { logger } from '../config/logger'

interface JsendError {
  statusCode: number
  status: string
  message?: string
  data?: any
  code?: string
  stack?: any
}

const errorHandler: ErrorRequestHandler = (
  err: JsendError,
  _req,
  res,
  _next
) => {
  const { statusCode, status } = err

  res.locals.errorMessage = err.message

  const response = {
    status,
    message: err.message,
    ...(err.data && { data: err.data }),
    ...(err.code && { code: err.code }),
    ...(envVars.env === 'development' && { stack: err.stack })
  }

  if (envVars.env === 'development') {
    logger.error(JSON.stringify(response))
  }

  return res.status(statusCode).send(response)
}

export { errorHandler }
