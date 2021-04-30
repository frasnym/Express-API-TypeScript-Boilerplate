import { DataTypes, Sequelize } from 'sequelize'
import { TokenStatic } from '../types/rest-api'

export function TokenFactory(sequelize: Sequelize): TokenStatic {
  const Token = <TokenStatic>sequelize.define('tokens', {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('access', 'refresh', 'resetPassword', 'verifyEmail'),
      allowNull: false
    },
    expires: {
      type: DataTypes.DATE,
      allowNull: false
    },
    blacklisted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
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
  })

  return Token
}
