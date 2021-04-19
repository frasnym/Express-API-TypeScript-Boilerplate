import { Router } from 'express'
import { authRoute } from './auth-route'
import { docsRoute } from './docs-route'
import { userRoute } from './user-route'

const router = Router()

router.use('/auth', authRoute)
router.use('/users', userRoute)
router.use('/docs', docsRoute)

export { router }
