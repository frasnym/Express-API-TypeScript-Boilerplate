import request from 'supertest'
import jwt from 'jsonwebtoken'
import { insertUsers, userOne } from '../../../../tests/fixtures/user-fixture'
import app from '../../../app'
import { Token, User } from '../../../config/db'
import envVars from '../../../config/envVars'
import { generateToken, saveToken } from '../../../services/token-service'
import { JWTPayload, TokenType } from '../../../types/rest-api'
import { UserAttributes } from '../../../types/model'
import { dateAdd } from '../../../utils/date'

describe('Auth Routes', () => {
  describe('POST /v1/auth/signup', () => {
    const newUser: Partial<UserAttributes> = {
      name: 'random_name',
      email: 'Random_address@email.com',
      password: 'password1',
      phone: '6281999200555',
      pin: '123456'
    }

    test('should return 201 and successfully register user if request data is ok', async () => {
      const res = await request(app)
        .post('/v1/auth/signup')
        .send(newUser)
        .expect(201)

      expect(res.body.data.user).not.toHaveProperty('password')
      expect(res.body.data.user).not.toHaveProperty('pin')
      expect(res.body.data.user).toEqual({
        id: expect.anything(),
        name: newUser.name,
        email: newUser.email?.toLowerCase(),
        isEmailVerified: false,
        phone: newUser.phone
      })

      const dbUser = await User.findByPk(res.body.data.user.id)
      expect(dbUser).toBeDefined()
      expect(dbUser?.password).not.toBe(newUser.password)
      expect(dbUser).toMatchObject({
        name: newUser.name,
        email: newUser.email?.toLowerCase(),
        phone: newUser.phone
      })

      expect(res.body.data.tokens).toEqual({
        access: { token: expect.anything(), expires: expect.anything() },
        refresh: { token: expect.anything(), expires: expect.anything() }
      })

      const dbToken = await Token.findByPk(res.body.data.tokens.refresh.token)
      expect(dbToken).toBeDefined()
      expect(new Date(dbToken?.expires!.toString()!).getTime()).toBeGreaterThan(
        new Date().getTime()
      )
    })

    test('should return 400 error if invalid email provided', async () => {
      newUser.email = 'invalidEmail'
      await request(app).post('/v1/auth/signup').send(newUser).expect(400)
    })

    test('should return 400 error if email is already used', async () => {
      await insertUsers([userOne])
      newUser.email = userOne.email

      await request(app).post('/v1/auth/signup').send(newUser).expect(400)
    })

    test('should return 400 error if invalid phone provided', async () => {
      // phone doesn't start with "62"
      newUser.phone = '123'
      await request(app).post('/v1/auth/signup').send(newUser).expect(400)

      // phone contain letter(s)
      newUser.phone = '62abc'
      await request(app).post('/v1/auth/signup').send(newUser).expect(400)
    })

    test('should return 400 error if phone is already used', async () => {
      await insertUsers([userOne])
      newUser.phone = userOne.phone

      await request(app).post('/v1/auth/signup').send(newUser).expect(400)
    })

    test('should return 400 error if invalid password is provided', async () => {
      // password length is less than 8 characters
      newUser.password = '1'
      await request(app).post('/v1/auth/signup').send(newUser).expect(400)

      // password does not contain numbers
      newUser.password = 'password'
      await request(app).post('/v1/auth/signup').send(newUser).expect(400)

      // password does not contain letters
      newUser.password = '12345678'
      await request(app).post('/v1/auth/signup').send(newUser).expect(400)
    })

    test('should return 400 error if invalid pin provided', async () => {
      // pin length is less than 6 characters
      newUser.pin = '12345'
      await request(app).post('/v1/auth/signup').send(newUser).expect(400)

      // pin contain letter(s)
      newUser.pin = 'abc123'
      await request(app).post('/v1/auth/signup').send(newUser).expect(400)
    })
  })

  describe('POST /v1/auth/signin', () => {
    test('should return 200 and login user if email and password match', async () => {
      await insertUsers([userOne])

      const signInCredentials = {
        email: userOne.email,
        password: userOne.password
      }
      const res = await request(app)
        .post('/v1/auth/signin')
        .send(signInCredentials)
        .expect(200)

      expect(res.body.data.user).not.toHaveProperty('password')
      expect(res.body.data.user).not.toHaveProperty('pin')
      expect(res.body.data.user).toEqual({
        id: expect.anything(),
        name: userOne.name,
        email: userOne.email?.toLowerCase(),
        isEmailVerified: userOne.isEmailVerified,
        phone: userOne.phone
      })

      expect(res.body.data.tokens).toEqual({
        access: { token: expect.anything(), expires: expect.anything() },
        refresh: { token: expect.anything(), expires: expect.anything() }
      })

      const dbToken = await Token.findByPk(res.body.data.tokens.refresh.token)
      expect(dbToken).toBeDefined()
      expect(new Date(dbToken?.expires!.toString()!).getTime()).toBeGreaterThan(
        new Date().getTime()
      )
    })

    test('should return 401 error if there are no users with that email', async () => {
      const signInCredentials = {
        email: userOne.email,
        password: userOne.password
      }
      const res = await request(app)
        .post('/v1/auth/signin')
        .send(signInCredentials)
        .expect(401)

      expect(res.body.data.user).toBeUndefined()
      expect(res.body.data.tokens).toBeUndefined()
    })

    test('should return 401 error if invalid password provided', async () => {
      await insertUsers([userOne])
      const signInCredentials = {
        email: userOne.email,
        password: 'invalidPassword1'
      }
      const res = await request(app)
        .post('/v1/auth/signin')
        .send(signInCredentials)
        .expect(401)

      expect(res.body.data.user).toBeUndefined()
      expect(res.body.data.tokens).toBeUndefined()
    })
  })

  describe('POST /v1/auth/signout', () => {
    test('should return 204 if refresh token is valid', async () => {
      await insertUsers([userOne])

      const signInCredentials = {
        email: userOne.email,
        password: userOne.password
      }
      const signInResponse = await request(app)
        .post('/v1/auth/signin')
        .send(signInCredentials)
        .expect(200)

      const refreshToken = signInResponse.body.data.tokens.refresh.token

      await request(app)
        .post('/v1/auth/signout')
        .send({ refreshToken })
        .expect(204)

      const tokenDoc = await Token.findByPk(refreshToken)
      expect(tokenDoc).toBeNull()
    })

    test('should return 400 error if refresh token is missing from request body', async () => {
      await request(app).post('/v1/auth/signout').expect(400)
    })

    test('should return 404 error if refresh token is not found in the database', async () => {
      await insertUsers([userOne])

      const signInCredentials = {
        email: userOne.email,
        password: userOne.password
      }
      const signInResponse = await request(app)
        .post('/v1/auth/signin')
        .send(signInCredentials)
        .expect(200)

      const refreshToken = signInResponse.body.data.tokens.refresh.token

      await request(app)
        .post('/v1/auth/signout')
        .send({ refreshToken })
        .expect(204)

      await request(app)
        .post('/v1/auth/signout')
        .send({ refreshToken })
        .expect(404)
    })

    test('should return 404 error if refresh token is blacklisted', async () => {
      await insertUsers([userOne])

      const signInCredentials = {
        email: userOne.email,
        password: userOne.password
      }
      const signInResponse = await request(app)
        .post('/v1/auth/signin')
        .send(signInCredentials)
        .expect(200)

      const refreshToken = signInResponse.body.data.tokens.refresh.token

      await Token.update(
        { blacklisted: true },
        { where: { token: refreshToken } }
      )

      await request(app)
        .post('/v1/auth/signout')
        .send({ refreshToken })
        .expect(404)
    })
  })

  describe('POST /v1/auth/refresh', () => {
    test('should return 200 and new auth tokens if refresh token is valid', async () => {
      await insertUsers([userOne])
      const refreshTokenExpires = dateAdd(
        new Date(),
        'day',
        envVars.jwt.refreshExpirationDays
      )
      const refreshToken = generateToken(
        userOne.id,
        refreshTokenExpires,
        TokenType.refresh
      )
      await saveToken(
        refreshToken,
        userOne.id,
        refreshTokenExpires,
        TokenType.refresh
      )

      const res = await request(app)
        .post('/v1/auth/refresh')
        .send({ refreshToken })
        .expect(200)

      expect(res.body.data).toEqual({
        access: { token: expect.anything(), expires: expect.anything() },
        refresh: { token: expect.anything(), expires: expect.anything() }
      })

      const dbRefreshTokenDoc = await Token.findByPk(
        res.body.data.refresh.token
      )
      expect(dbRefreshTokenDoc).toMatchObject({
        type: TokenType.refresh,
        userId: userOne.id,
        blacklisted: false
      })

      const dbRefreshTokenCount = await Token.count()
      expect(dbRefreshTokenCount).toBe(1)
    })

    test('should return 400 error if refresh token is missing from request body', async () => {
      await request(app).post('/v1/auth/refresh').expect(400)
    })

    test('should return 500 error if refresh token is signed using an invalid secret', async () => {
      await insertUsers([userOne])
      const refreshTokenExpires = dateAdd(
        new Date(),
        'day',
        envVars.jwt.refreshExpirationDays
      )

      const payload: JWTPayload = {
        sub: userOne.id,
        iat: new Date().getTime(),
        exp: refreshTokenExpires.getTime(),
        type: TokenType.refresh
      }
      const refreshToken = jwt.sign(payload, 'invalidJWTSecret')

      await saveToken(
        refreshToken,
        userOne.id,
        refreshTokenExpires,
        TokenType.refresh
      )

      await request(app)
        .post('/v1/auth/refresh')
        .send({ refreshToken })
        .expect(500)
    })

    test('should return 500 error if refresh token is not found in the database', async () => {
      const refreshTokenExpires = dateAdd(
        new Date(),
        'day',
        envVars.jwt.refreshExpirationDays
      )
      const refreshToken = generateToken(
        userOne.id,
        refreshTokenExpires,
        TokenType.refresh
      )

      await request(app)
        .post('/v1/auth/refresh')
        .send({ refreshToken })
        .expect(500)
    })

    test('should return 500 error if refresh token is blacklisted', async () => {
      await insertUsers([userOne])
      const refreshTokenExpires = dateAdd(
        new Date(),
        'day',
        envVars.jwt.refreshExpirationDays
      )
      const refreshToken = generateToken(
        userOne.id,
        refreshTokenExpires,
        TokenType.refresh
      )
      await saveToken(
        refreshToken,
        userOne.id,
        refreshTokenExpires,
        TokenType.refresh,
        true
      )

      await request(app)
        .post('/v1/auth/refresh')
        .send({ refreshToken })
        .expect(500)
    })

    test('should return 500 error if refresh token is expired', async () => {
      await insertUsers([userOne])
      const refreshTokenExpires = dateAdd(new Date(), 'minute', -1)
      const refreshToken = generateToken(
        userOne.id,
        refreshTokenExpires,
        TokenType.refresh
      )
      await saveToken(
        refreshToken,
        userOne.id,
        refreshTokenExpires,
        TokenType.refresh
      )

      await request(app)
        .post('/v1/auth/refresh')
        .send({ refreshToken })
        .expect(500)
    })
  })
})
