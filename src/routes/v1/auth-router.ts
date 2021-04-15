import { Router } from 'express'
import { validate } from '../../middlewares/validate'
import { SuccessResponse } from '../../utils/jsend/success'
import { signupSchema } from '../../validations'

const router = Router()

router.post('/signup', validate(signupSchema), (req, res) => {
  res.status(201).send(new SuccessResponse(req.body).serializeResponse())
})

export { router as authRouter }
