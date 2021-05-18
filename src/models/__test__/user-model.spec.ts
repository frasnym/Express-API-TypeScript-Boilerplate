import { insertUsers, userOne } from '../../../tests/fixtures/user-fixture'
import { User } from '../../config/db'

describe('User model', () => {
  describe('User validation', () => {
    test.todo('should correctly validate a valid user')
    test.todo('should throw a validation error if email is invalid')
  })

  describe('isEmailTaken', () => {
    test('should return true if email is taken', async () => {
      await insertUsers([userOne])
      expect(await User.isEmailTaken(userOne.email)).toBe(true)
    })

    test('should return false if email is not taken', async () => {
      expect(await User.isEmailTaken(userOne.email)).toBe(false)
    })

    test('should return false if email is taken and id is excluded', async () => {
      await insertUsers([userOne])
      expect(await User.isEmailTaken(userOne.email, userOne.id)).toBe(false)
    })
  })

  describe('isPhoneTaken', () => {
    test('should return true if phone is taken', async () => {
      await insertUsers([userOne])
      expect(await User.isPhoneTaken(userOne.phone)).toBe(true)
    })

    test('should return false if phone is not taken', async () => {
      expect(await User.isPhoneTaken(userOne.phone)).toBe(false)
    })

    test('should return false if phone is taken and id is excluded', async () => {
      await insertUsers([userOne])
      expect(await User.isPhoneTaken(userOne.phone, userOne.id)).toBe(false)
    })
  })
})
