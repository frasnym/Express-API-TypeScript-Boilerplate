import Joi from 'joi'
import { IValidation } from '../middlewares/validate'

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

export {
  requestVerificationSchema,
  validateVerificationSchema,
  forgotPasswordSchema
}
