import request from 'supertest'
import app from '../../../app'
import { UserAttributes } from '../../../types/rest-api'

describe('Auth Routes', () => {
  describe('POST /v1/auth/signup', () => {
    let newUser: Partial<UserAttributes>
    beforeEach(() => {
      newUser = {
        name: 'random_name',
        email: 'random@email.com',
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
        email: newUser.email,
        phone: newUser.phone
      })

      // const dbUser = await User.findById(res.body.user.id)
      // expect(dbUser).toBeDefined()
      // expect(dbUser.password).not.toBe(newUser.password)
      // expect(dbUser).toMatchObject({
      //   name: newUser.name,
      //   email: newUser.email,
      //   role: 'user',
      //   isEmailVerified: false
      // })

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

    test('should return 400 error if password length is less than 8 characters', async () => {
      newUser.password = '1'
      await request(app).post('/v1/auth/signup').send(newUser).expect(400)
    })

    test('should return 400 error if password does not contain both letters and numbers', async () => {
      newUser.password = 'password'
      await request(app).post('/v1/auth/signup').send(newUser).expect(400)

      newUser.password = '12345678'
      await request(app).post('/v1/auth/signup').send(newUser).expect(400)
    })
  })
})
