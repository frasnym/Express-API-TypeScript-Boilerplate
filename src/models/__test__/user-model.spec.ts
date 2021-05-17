import { insertUsers, userOne } from '../../../tests/fixtures/user-fixture'
import { User } from '../../config/db'
import { UserAttributes } from '../../types/model'

describe('User model', () => {
  // @ts-ignore
  const newUser: UserAttributes = {
    name: 'random_name',
    email: 'Random_address@email.com',
    password: 'password1',
    phone: '6281999200555',
    pin: '123456'
  }

  describe('User validation', () => {
    test('should correctly validate a valid user', async () => {
      await expect(User.create(newUser)).resolves.not.toThrow()
    })

    test('should throw a validation error if email is invalid', async () => {
      newUser.email = 'invalidEmail'
      await expect(User.create(newUser)).rejects.toThrow()
    })
  })

  describe('isEmailTaken', () => {
    test('should return true if email is taken', async () => {
      await insertUsers([userOne])
      expect(await User.isEmailTaken(userOne.email)).toBe(true)
    })

    test('should return false if email is not taken', async () => {
      expect(await User.isEmailTaken(userOne.email)).toBe(false)
    })
  })
})
