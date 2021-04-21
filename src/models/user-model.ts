import { DataTypes, Op, Sequelize } from 'sequelize'
import bcrypt from 'bcryptjs'
import { UserStatic } from '../types/rest-api'

export function UserFactory(sequelize: Sequelize): UserStatic {
  const User = <UserStatic>sequelize.define(
    'users',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false
      },
      pin: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
      }
    },
    {
      scopes: {
        withoutCredentials: {
          attributes: {
            exclude: ['password', 'pin']
          }
        }
      }
    }
  )

  User.beforeCreate(async (user, _options) => {
    if (user.changed('password')) {
      user.password = await bcrypt.hash(user.password, 8)
    }

    if (user.changed('pin')) {
      user.pin = await bcrypt.hash(user.pin, 8)
    }
  })

  User.isEmailTaken = async (
    email: string,
    excludeUserId?: number | undefined
  ) => {
    const options = excludeUserId
      ? {
          id: {
            [Op.ne]: excludeUserId
          }
        }
      : {}

    const user = await User.findOne({
      where: {
        email,
        ...options
      }
    })

    return !!user
  }
  return User
}
