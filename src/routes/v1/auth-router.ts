import { Router } from 'express'
import { authController } from '../../controllers'
import { validate } from '../../middlewares/validate'
import { signupSchema } from '../../validations'

const router = Router()

router.post('/signup', validate(signupSchema), authController.signUp)

export { router as authRouter }
