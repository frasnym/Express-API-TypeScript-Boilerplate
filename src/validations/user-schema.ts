import Joi from 'joi'
import { IValidation } from '../middlewares/validate'
import { password } from './custom-schema'

const requestVerificationSchema: IValidation = {
  params: {
    type: Joi.string().valid('email', 'phone')
  }
}

const validateVerificationSchema: IValidation = {
  params: {
    type: Joi.string().valid('email', 'phone')
  },
  body: Joi.object({
    code: Joi.string().required()
  })
}

const forgotPasswordSchema: IValidation = {
  body: Joi.object({
    email: Joi.string().required().email().lowercase()
  })
}

const resetPasswordSchema: IValidation = {
  body: Joi.object({
    token: Joi.string().required(),
    password: Joi.string().min(8).required().custom(password)
  })
}

export {
  requestVerificationSchema,
  validateVerificationSchema,
  forgotPasswordSchema,
  resetPasswordSchema
}
