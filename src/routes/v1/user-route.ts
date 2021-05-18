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
  .patch(validate(userSchema.resetPasswordSchema), userController.resetPassword)
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
 *               $ref: '#/components/schemas/Success'
 *               properties:
 *                 data:
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
 *       "200":
 *         description: Success request verification
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *   post:
 *     summary: Validate verification code
 *     tags: [Users]
 *     parameters:
 *      - $ref: "#/components/parameters/verificationType"
 *     responses:
 *       "200":
 *         description: Success validate verification
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
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

/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Forgot password
 *     description: An email will be sent to reset password.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *             example:
 *               email: fake@example.com
 *     responses:
 *       "200":
 *         description: Success request reset password token
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *   patch:
 *     summary: Reset password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: At least one number and one letter
 *             example:
 *               email: fake@example.com
 *               password: password1
 *     responses:
 *       "200":
 *         description: Success reset password
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Success'
 *       "401":
 *         description: Password reset failed
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               code: 401
 *               message: Password reset failed
 */
