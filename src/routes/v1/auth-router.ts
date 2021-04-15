import { Router } from 'express'
import { validate } from '../../middlewares/validate'
import { signupSchema } from '../../validations'

const router = Router()

router.post('/signup', validate(signupSchema), (req, res) => {
  res.status(201).send(req.body)
})

export { router as authRouter }
