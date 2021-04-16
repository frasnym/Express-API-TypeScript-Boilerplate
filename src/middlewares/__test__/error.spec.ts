import httpMocks from 'node-mocks-http'
import { FailResponse } from '../../utils/jsend'
import { errorHandler } from '../error'

describe('Error Middleware', () => {
  describe('ErrorHandler', () => {
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
  })
})
