import { Router } from 'express'
import { userController } from '../../controllers'
import { auth } from '../../middlewares/auth'
import { validate } from '../../middlewares/validate'
import { userSchema } from '../../validations'

const router = Router()

router.get('/', auth(), userController.getUser)
router
  .route('/verify/:type')
  .get(
    validate(userSchema.requestVerificationSchema),
    auth(),
    userController.requestVerification
  )
  .post(
    validate(userSchema.validateVerificationSchema),
    userController.validateVerification
  )
router
  .route('/reset-password')
  .post(
    validate(userSchema.forgotPasswordSchema),
    userController.forgotPassword
  )
// TODO: Forgot password swagger
// TODO: Change password
// TODO: Forgot PIN
// TODO: Change PIN
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
 *     summary: Send verification request
 *     description: An email will be sent to verify email.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *      - $ref: "#/components/parameters/verificationType"
 *     responses:
 *       "204":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *   post:
 *     summary: Validate verification code
 *     tags: [Users]
 *     parameters:
 *      - $ref: "#/components/parameters/verificationType"
 *     responses:
 *       "204":
 *         description: No content
 *       "401":
 *         description: 'Verify email failed'
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               status: 'fail'
 *               message: 'Verify email failed'
 */
