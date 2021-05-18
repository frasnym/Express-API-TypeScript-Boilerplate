import { TokenType } from '../../types/rest-api'
import { generateToken } from '../token-service'

describe('Token Service', () => {
  describe('generateToken', () => {
    test('should throw server error if invalid token type provided', async () => {
      expect(() => {
        // @ts-ignore
        generateToken(Math.random(), new Date(), 'Invalid token')
      }).toThrow('Internal server error')
    })

    test('should not throw server error if valid token type provided', async () => {
      expect(() => {
        generateToken(Math.random(), new Date(), TokenType.access)
      }).not.toThrow()
    })
  })
})
