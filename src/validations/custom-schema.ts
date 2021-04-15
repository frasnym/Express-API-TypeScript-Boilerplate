import Joi from 'joi'

const password: Joi.CustomValidator = (value, helpers) => {
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message({
      custom: 'password must contain at least 1 letter and 1 number'
    })
  }
  return value
}

export { password }
