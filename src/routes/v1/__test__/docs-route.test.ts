import request from 'supertest'
import { logger } from '../../../config/logger'

process.env.NODE_ENV = 'production'
// eslint-disable-next-line import/first
import app from '../../../app'

describe('Docs routes', () => {
  describe('GET /v1/docs', () => {
    beforeEach(() => {
      // @ts-ignore
      jest.spyOn(logger, 'error').mockImplementation(() => {})
    })

    test('should return 404 when running in production', async () => {
      await request(app).get('/v1/docs').expect(404)
    })
  })
})
