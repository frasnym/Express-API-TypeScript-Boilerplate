import Joi from 'joi'
import { IValidation } from '../middlewares/validate'
import { password, phone, pin } from './custom-schema'

const signupSchema: IValidation = {
  body: Joi.object({
    name: Joi.string().required().min(3),
    phone: Joi.string().required().custom(phone),
    email: Joi.string().required().email(),
    pin: Joi.string().length(6).required().custom(pin),
    password: Joi.string().min(8).required().custom(password)
  })
}

export { signupSchema }