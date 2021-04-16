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
  })
})