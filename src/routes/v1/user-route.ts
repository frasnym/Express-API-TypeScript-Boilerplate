import { Router } from 'express'
import { userController } from '../../controllers'
import { auth } from '../../middlewares/auth'

const router = Router()

router.get('/', auth(), userController.getUser)
router.get('/verify/:type', auth(), userController.requestVerification)
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

/**
 * @swagger
 * /users/verify/{type}:
 *   get:
 *     summary: Send verification email
 *     description: An email will be sent to verify email.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: type
 *        schema:
 *          type: string
 *          enum: [email, phone]
 *        required: true
 *        description: Type of verification.
 *        example: email
 *     responses:
 *       "204":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 */
