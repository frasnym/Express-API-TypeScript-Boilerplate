import { NextFunction, Request, Response, Router } from 'express'
import Joi from 'joi'

const router = Router()

export interface IValidationOptions {
  allowUnknownBody?: boolean
  allowUnknownQuery?: boolean
  allowUnknownHeaders?: boolean
  allowUnknownParams?: boolean
  allowUnknownCookies?: boolean
  joiOptions?: Joi.ValidationOptions
}

export interface IValidation {
  // options?: IValidationOptions
  body?: Joi.SchemaLike
  headers?: Joi.SchemaLike
  query?: Joi.SchemaLike
  cookies?: Joi.SchemaLike
  params?: Joi.SchemaLike
}

const signupSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
  name: Joi.string().required()
})

// TODO https://gist.github.com/ThomasHambach/6103774085fbe258a0377af35ed3d489
// TODO https://github1s.com/hagopj13/node-express-boilerplate/blob/HEAD/src/middlewares/validate.js

// const props = ['body', 'query', 'headers', 'params', 'cookies']

const validate = (bodySchema: Joi.SchemaLike) => {
  // settings.options = settings.options || {}

  return (req: Request, res: Response, next: NextFunction) => {
    const { value, error } = Joi.compile(bodySchema).validate(req.body)

    if (error) {
      const errorMessage = error.details
        .map((details) => details.message)
        .join(', ')

      res.locals.errorMessage = errorMessage
      return res.status(400).send({ message: errorMessage })
    }
    Object.assign(req, value)
    return next()
  }
}

// const validate = (schema: Joi.SchemaLike) => (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const { value, error } = Joi.compile(schema).validate(req.body)

//   if (error) {
//     const errorMessage = error.details
//       .map((details) => details.message)
//       .join(', ')

//     throw new Error(errorMessage)
//   }
//   Object.assign(req, value)
//   return next()
// }

router.post('/signup', validate(signupSchema), (req, res) => {
  res.send('Ok')
})

export { router as authRouter }
