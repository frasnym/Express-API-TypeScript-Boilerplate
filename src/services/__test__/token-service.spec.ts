import { tokenTypes } from '../../config/tokens'
import { generateToken } from '../token-service'

describe('Token Service', () => {
  describe('generateToken', () => {
    test('should throw server error if invalid token type provided', async () => {
      expect(() => {
        generateToken(Math.random(), new Date(), 'Invalid token')
      }).toThrow('Internal server error')
    })

    test('should not throw server error if valid token type provided', async () => {
      expect(() => {
        generateToken(Math.random(), new Date(), tokenTypes.ACCESS)
      }).not.toThrow()
    })
  })
})
