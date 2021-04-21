import request from 'supertest'
import app from '../../../app'
import { User } from '../../../config/db'
import { UserAttributes } from '../../../types/rest-api'

describe('Auth Routes', () => {
  describe('POST /v1/auth/signup', () => {
    let newUser: Partial<UserAttributes>
    beforeEach(() => {
      newUser = {
        name: 'random_name',
        email: 'Random_address@email.com',
        password: 'password1',
        phone: '6281999200555',
        pin: '123456'
      }
    })

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
    })

    test('should return 400 error if email is invalid', async () => {
      newUser.email = 'invalidEmail'
      await request(app).post('/v1/auth/signup').send(newUser).expect(400)
    })

    test.todo('should return 400 error if email is already used')

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

    test('should return 400 error if invalid phone provided', async () => {
      // phone doesn't start with "62"
      newUser.phone = '123'
      await request(app).post('/v1/auth/signup').send(newUser).expect(400)

      // phone contain letter(s)
      newUser.phone = '62abc'
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
})
