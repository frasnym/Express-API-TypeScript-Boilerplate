import request from 'supertest'
import { accessToken } from '../../../../tests/fixtures/token-fixture'
import app from '../../../app'

describe('User routes', () => {
  describe('GET /v1/users', () => {
    test('should return 200 and apply the default query options', async () => {
      const res = await request(app)
        .get('/v1/users')
        .set('Authorization', `Bearer ${accessToken}`)
        .send()
        .expect(200)

      expect(res.body.data.user).toHaveProperty('name')
      // TODO: Check all returned value
    })
  })
})
