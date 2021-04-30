import httpMocks from 'node-mocks-http'
import envVars from '../../config/envVars'
import { logger } from '../../config/logger'
import { ErrorResponse, FailResponse } from '../../utils/jsend'
import { errorConverter, errorHandler } from '../error'

describe('Error Middleware', () => {
  describe('ErrorConverter', () => {
    test('should return the same JSend Error object it was called with', () => {
      const failNext = jest.fn()
      const failResponse = new FailResponse(400, 'Any error', 'Any data')
      errorConverter(
        failResponse,
        httpMocks.createRequest(),
        httpMocks.createResponse(),
        failNext
      )
      expect(failNext).toHaveBeenCalledWith(failResponse)

      const errorNext = jest.fn()
      const errorResponse = new ErrorResponse(500)
      errorConverter(
        errorResponse,
        httpMocks.createRequest(),
        httpMocks.createResponse(),
        errorNext
      )
      expect(errorNext).toHaveBeenCalledWith(errorResponse)
    })

    test('should convert any Error to ErrorResponse and preserve its message', () => {
      const error = new Error('Any error')
      const next = jest.fn()

      errorConverter(
        error,
        httpMocks.createRequest(),
        httpMocks.createResponse(),
        next
      )

      expect(next).toHaveBeenCalledWith(expect.any(ErrorResponse))
      expect(next).toHaveBeenCalledWith(
        expect.objectContaining({
          message: error.message
        })
      )
    })
  })

  describe('ErrorHandler', () => {
    beforeEach(() => {
      // @ts-ignore
      jest.spyOn(logger, 'error').mockImplementation(() => {})
    })

    test('should send proper JSend Fail response and put the error message in res.locals', () => {
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

    test('should put the stack in the JSend Fail response if in development mode', () => {
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

    test('should send proper JSend Error response and put the error message in res.locals', () => {
      const error = new ErrorResponse(500, 'Any message', undefined, 'ANY')
      const res = httpMocks.createResponse()
      const sendSpy = jest.spyOn(res, 'send')

      errorHandler(error, httpMocks.createRequest(), res, () => {})

      expect(sendSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          message: error.message,
          status: 'error',
          code: error.code
        })
      )
      expect(res.locals.errorMessage).toBe(error.message)
    })

    test('should put the stack in the JSend Error response if in development mode', () => {
      envVars.env = 'development'
      const error = new ErrorResponse(400, 'Any message', 'Any stack')
      const res = httpMocks.createResponse()
      const sendSpy = jest.spyOn(res, 'send')

      errorHandler(error, httpMocks.createRequest(), res, () => {})

      expect(sendSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          message: error.message,
          stack: error.stack
        })
      )
      envVars.env = process.env.NODE_ENV!
    })
  })
})
