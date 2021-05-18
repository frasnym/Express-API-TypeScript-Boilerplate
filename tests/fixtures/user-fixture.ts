import bcrypt from 'bcryptjs'
import { User } from '../../src/config/db'
import { UserAttributes } from '../../src/types/model'

const password = 'password1'
const salt = bcrypt.genSaltSync(8)
const hashedPassword = bcrypt.hashSync(password, salt)

const userOne: UserAttributes = {
  id: 1,
  name: 'My name is user one',
  password,
  email: 'user_one@email.com',
  isEmailVerified: false,
  phone: '6281000111222',
  pin: '123456'
}

const insertUsers = async (users: UserAttributes[]) => {
  await User.bulkCreate(
    users.map((user) => ({ ...user, password: hashedPassword }))
  )
}

export { userOne, insertUsers }
