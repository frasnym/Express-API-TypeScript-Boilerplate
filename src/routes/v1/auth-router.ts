import { Router } from 'express'
import { validate } from '../../middlewares/validate'
import { signupSchema } from '../../validations'

const router = Router()

router.post('/signup', validate(signupSchema), (req, res) => {
  res.send('Ok')
})

export { router as authRouter }
