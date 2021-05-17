import { User } from '../../config/db'
import { UserAttributes } from '../../types/model'

describe('User model', () => {
  describe('User validation', () => {
    // @ts-ignore
    const newUser: UserAttributes = {
      name: 'random_name',
      email: 'Random_address@email.com',
      password: 'password1',
      phone: '6281999200555',
      pin: '123456'
    }

    test('should correctly validate a valid user', async () => {
      await expect(User.create(newUser)).resolves.not.toThrow()
    })

    test('should throw a validation error if email is invalid', async () => {
      newUser.email = 'invalidEmail'
      await expect(User.create(newUser)).rejects.toThrow()
    })
  })
})
