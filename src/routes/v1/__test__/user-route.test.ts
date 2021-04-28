import request from 'supertest'
import { useOneAccessToken } from '../../../../tests/fixtures/token-fixture'
import { insertUsers, userOne } from '../../../../tests/fixtures/user-fixture'
import app from '../../../app'

describe('User routes', () => {
  describe('GET /v1/users', () => {
    test('should return 200 and apply the default query options', async () => {
      await insertUsers([userOne])

      const res = await request(app)
        .get('/v1/users')
        .set('Authorization', `Bearer ${useOneAccessToken}`)
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
})
