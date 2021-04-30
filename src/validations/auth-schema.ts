import Joi from 'joi'
import { IValidation } from '../middlewares/validate'
import { password, phone, pin } from './custom-schema'

const signUpSchema: IValidation = {
  body: Joi.object({
    name: Joi.string().required().min(3),
    phone: Joi.string().required().custom(phone),
    email: Joi.string().required().email().lowercase(),
    pin: Joi.string().length(6).required().custom(pin),
    password: Joi.string().min(8).required().custom(password)
  })
}

const signInSchema: IValidation = {
  body: Joi.object({
    email: Joi.string().required().lowercase(),
    password: Joi.string().required()
  })
}

const signOutSchema: IValidation = {
  body: Joi.object({
    refreshToken: Joi.string().required()
  })
}

export { signUpSchema, signInSchema, signOutSchema }
