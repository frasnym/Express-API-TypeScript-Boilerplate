import { Router } from 'express'
import { userController } from '../../controllers'
import { auth } from '../../middlewares/auth'

const router = Router()

router.get('/', auth(), userController.getUser)
// TODO: Request verification
// TODO: Send verification
// TODO: Forgot password
// TODO: Change password
// TODO: Update current user data

export { router as userRoute }

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User related API endpoints
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get logged user data
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: Success get logged user data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 */
