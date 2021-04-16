import { ErrorRequestHandler } from 'express'
import envVars from '../config/envVars'
import { logger } from '../config/logger'
import { ErrorResponse, FailResponse } from '../utils/jsend'

interface JsendError {
  statusCode: number
  status: string
  message?: string
  data?: any
  code?: number
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
    ...(err instanceof FailResponse && { data: err.data }),
    ...(err instanceof ErrorResponse && { code: err.code }),
    ...(envVars.env === 'development' && { stack: err.stack })
  }

  if (envVars.env === 'development') {
    logger.error(JSON.stringify(response))
  }

  return res.status(statusCode).send(response)
}

export { errorHandler }
