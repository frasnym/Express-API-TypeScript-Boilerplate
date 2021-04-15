import Joi from 'joi'

const password: Joi.CustomValidator = (value, helpers) => {
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message({
      custom: 'password must contain at least 1 letter and 1 number'
    })
  }
  return value
}

const pin: Joi.CustomValidator = (value, helpers) => {
  if (!value.match(/^[0-9]+$/)) {
    return helpers.message({
      custom: 'pin must be number'
    })
  }
  return value
}

const phone: Joi.CustomValidator = (value, helpers) => {
  if (!value.match(/62/)) {
    return helpers.message({
      custom: 'phone number must be start with 62'
    })
  }
  if (!value.match(/[0-9]+$/)) {
    return helpers.message({
      custom: 'phone number must be number'
    })
  }
  return value
}

export { password, pin, phone }
