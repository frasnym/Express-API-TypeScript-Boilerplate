import request from 'supertest'
import { userOneAccessToken } from '../../../../tests/fixtures/token-fixture'
import { insertUsers, userOne } from '../../../../tests/fixtures/user-fixture'
import app from '../../../app'
import { Token, User } from '../../../config/db'
import { transport } from '../../../config/transport'
import { emailService } from '../../../services'
import { TokenType } from '../../../types/rest-api'

describe('User routes', () => {
  describe('GET /v1/users', () => {
    test('should return 200 and apply the default query options', async () => {
      await insertUsers([userOne])

      const res = await request(app)
        .get('/v1/users')
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send()
        .expect(200)

      expect(res.body.data).toHaveProperty('name')
      expect(res.body.data).toHaveProperty('phone')
      expect(res.body.data).toHaveProperty('email')
      expect(res.body.data).not.toHaveProperty('password')
      expect(res.body.data).not.toHaveProperty('pin')
    })

    test('should return 401 if access token is missing', async () => {
      await request(app).get('/v1/users').send().expect(401)
    })
  })

  describe('GET /v1/users/verify/:type', () => {
    beforeEach(() => {
      jest.spyOn(transport, 'sendMail').mockResolvedValue(undefined)
    })

    describe('Email Verification', () => {
      test('should return 204 and send verification email to the user', async () => {
        await insertUsers([userOne])
        const sendVerificationEmailSpy = jest.spyOn(
          emailService,
          'sendVerificationEmail'
        )

        await request(app)
          .get('/v1/users/verify/email')
          .set('Authorization', `Bearer ${userOneAccessToken}`)
          .expect(204)

        expect(sendVerificationEmailSpy).toHaveBeenCalledWith(
          userOne.email,
          expect.any(String)
        )
        const verifyEmailToken = sendVerificationEmailSpy.mock.calls[0][1]
        const dbVerifyEmailToken = await Token.findOne({
          where: {
            token: verifyEmailToken,
            userId: userOne.id
          }
        })

        expect(dbVerifyEmailToken).toBeDefined()
      })

      test('should return 401 error if access token is missing', async () => {
        await request(app).get('/v1/users/verify/email').expect(401)
      })
    })

    test('should return 400 if invalid type provided', async () => {
      await insertUsers([userOne])

      await request(app)
        .get('/v1/users/verify/invalidType')
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .expect(400)
    })
  })

  describe('POST /v1/users/verify/:type', () => {
    beforeEach(() => {
      jest.spyOn(transport, 'sendMail').mockResolvedValue(undefined)
    })

    describe('Email Verification', () => {
      test('should return 204 and verify the email', async () => {
        await insertUsers([userOne])
        await request(app)
          .get('/v1/users/verify/email')
          .set('Authorization', `Bearer ${userOneAccessToken}`)
          .expect(204)

        const token = await Token.findOne({
          where: {
            userId: userOne.id
          }
        })

        await request(app)
          .post('/v1/users/verify/email')
          .send({
            code: token?.token
          })
          .expect(204)

        const dbUser = await User.findByPk(userOne.id)
        expect(dbUser?.isEmailVerified).toBe(true)

        const dbVerifyEmailToken = await Token.count({
          where: {
            userId: userOne.id,
            type: TokenType.verifyEmail
          }
        })
        expect(dbVerifyEmailToken).toBe(0)
      })

      test('should return 400 if verify email token is missing', async () => {
        await request(app).post('/v1/users/verify/email').send().expect(400)
      })
    })
  })
})
