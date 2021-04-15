import { Router } from 'express'
import Joi from 'joi'
import { validate } from '../../middlewares/validate'

const router = Router()

const signupSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
  name: Joi.string().required()
})

router.post('/signup', validate(signupSchema), (req, res) => {
  res.send('Ok')
})

export { router as authRouter }
