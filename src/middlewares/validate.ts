import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'

export interface IValidation {
  body?: Joi.SchemaLike
  headers?: Joi.SchemaLike
  query?: Joi.SchemaLike
  cookies?: Joi.SchemaLike
  params?: Joi.SchemaLike
}

const validate = (schema: IValidation) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = Joi.compile(schema).validate(req, {
      allowUnknown: true
    })

    if (error) {
      const errorMessage = error.details[0].message

      res.locals.errorMessage = errorMessage
      return res.status(400).send({ message: errorMessage })
    }

    return next()
  }
}

export { validate }
