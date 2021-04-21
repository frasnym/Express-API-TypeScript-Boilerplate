import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'
import { FailResponse } from '../utils/jsend'

export interface IValidation {
  body?: Joi.SchemaLike
  headers?: Joi.SchemaLike
  query?: Joi.SchemaLike
  cookies?: Joi.SchemaLike
  params?: Joi.SchemaLike
}

const validate = (schema: IValidation) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    const { error, value } = Joi.compile(schema).validate(req, {
      allowUnknown: true
    })

    if (error) {
      const errorMessage = error.details[0].message
      const errorData = {
        [error.details[0].context?.key!]: error.details[0].message
      }

      throw new FailResponse(400, errorMessage, errorData)
    }

    Object.assign(req, value)
    return next()
  }
}

export { validate }
