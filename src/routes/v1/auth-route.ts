import { Router } from 'express'
import { authController } from '../../controllers'
import { validate } from '../../middlewares/validate'
import * as authSchema from '../../validations'

const router = Router()

router.post('/signup', validate(authSchema.signUpSchema), authController.signUp)
router.post('/signin', validate(authSchema.signInSchema), authController.signIn)
router.post(
  '/signout',
  validate(authSchema.signOutSchema),
  authController.signOut
)
router.post(
  '/refresh',
  validate(authSchema.refreshTokenSchema),
  authController.refreshToken
)

export { router as authRoute }

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication
 */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Sign Up as a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - phone
 *               - email
 *               - pin
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *                 description: Phone must be unique
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email must be unique
 *               pin:
 *                 type: string
 *                 format: password
 *                 length: 6
 *                 description: All characters must be a number
 *               password:
 *                 type: string
 *                 format: password
 *                 minLength: 8
 *                 description: At least one number and one letter
 *             example:
 *               name: Debbie Erdman
 *               phone: '628760207244'
 *               email: Mireille_Stracke@yahoo.com
 *               pin: '000123'
 *               password: password1
 *     responses:
 *       "201":
 *         description: Success creating a new user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 tokens:
 *                   $ref: '#/components/schemas/AuthTokens'
 *       "400":
 *         $ref: '#/components/responses/MissingParameters'
 */

/**
 * @swagger
 * /auth/signin:
 *   post:
 *     summary: Sign In user with email and password
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
 *                 description: Registered user's email
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Registered user's password
 *             example:
 *               email: valid_email@mail.com
 *               password: password1
 *     responses:
 *       "200":
 *         description: User succesfully signed in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 tokens:
 *                   $ref: '#/components/schemas/AuthTokens'
 *       "401":
 *         description: Invalid email or password
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               code: 401
 *               message: Invalid email or password
 */

/**
 * @swagger
 * /auth/signout:
 *   post:
 *     summary: Sign Out an user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: Token from SignUp or SignIn
 *             example:
 *               refreshToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjcxLCJpYXQiOjE2MTk3NTI1NzcwMzMsImV4cCI6MTYyMjM0NDU3NzAzMSwidHlwZSI6InJlZnJlc2gifQ.sTkIdmfV9noCP6IYKcxU7WJPjYNyxYqR8tiEAjANk1E
 *     responses:
 *       "204":
 *         description: Succesfully signed out
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Refresh auth
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 description: Token from SignUp or SignIn
 *             example:
 *               refreshToken: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjcxLCJpYXQiOjE2MTk3NTI1NzcwMzMsImV4cCI6MTYyMjM0NDU3NzAzMSwidHlwZSI6InJlZnJlc2gifQ.sTkIdmfV9noCP6IYKcxU7WJPjYNyxYqR8tiEAjANk1E
 *     responses:
 *       "200":
 *         description: Succesfully refresh authorization
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 */
