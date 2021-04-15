import Joi from 'joi'
import { IValidation } from '../middlewares/validate'

const signupSchema: IValidation = {
  body: Joi.object({
    name: Joi.string().required().min(3),
    phone: Joi.string().required(),
    email: Joi.string().required().email(),
    pin: Joi.number().integer().required(),
    password: Joi.string().required()
  })
}

export { signupSchema }
