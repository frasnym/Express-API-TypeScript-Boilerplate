import { Router } from 'express'
import { userController } from '../../controllers'
import { auth } from '../../middlewares/auth'

const router = Router()

router.get('/', auth(), userController.getUser)

export { router as userRoute }
