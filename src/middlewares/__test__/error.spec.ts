import httpMocks from 'node-mocks-http'
import envVars from '../../config/envVars'
import { logger } from '../../config/logger'
import { FailResponse } from '../../utils/jsend'
import { errorHandler } from '../error'

describe('Error Middleware', () => {
  describe('ErrorHandler', () => {
    beforeEach(() => {
      // @ts-ignore
      jest.spyOn(logger, 'error').mockImplementation(() => {})
    })

    test('should send proper error response and put the error message in res.locals', () => {
      const error = new FailResponse(400, 'Any message', 'Any data')
      const res = httpMocks.createResponse()
      const sendSpy = jest.spyOn(res, 'send')

      errorHandler(error, httpMocks.createRequest(), res, () => {})

      expect(sendSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          data: error.data,
          message: error.message,
          status: 'fail'
        })
      )
      expect(res.locals.errorMessage).toBe(error.message)
    })

    test('should put the error stack in the response if in development mode', () => {
      envVars.env = 'development'
      const error = new FailResponse(400, 'Any message', 'Any data')
      const res = httpMocks.createResponse()
      const sendSpy = jest.spyOn(res, 'send')

      errorHandler(error, httpMocks.createRequest(), res, () => {})

      expect(sendSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          data: error.data,
          message: error.message,
          stack: error.stack
        })
      )
      envVars.env = process.env.NODE_ENV!
    })
  })
})
