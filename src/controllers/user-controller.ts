import { emailService, tokenService, userService } from '../services'
import { UserAttributes } from '../types/model'
import { catchAsync } from '../utils/catch-async'
import { SuccessResponse } from '../utils/jsend'

const getUser = catchAsync(async (req, res) => {
  const user: Partial<UserAttributes> = req.user!

  delete user.password
  delete user.pin
  delete user.createdAt
  delete user.updatedAt

  res.status(200).send(new SuccessResponse(user).serializeResponse())
})

const requestVerification = catchAsync(async (req, res) => {
  const verifyType: string = req.params.type

  let token: string
  if (verifyType === 'email') {
    token = await tokenService.generateVerifyEmailToken(
      <UserAttributes>req.user
    )
  } else {
    // TODO: Create phone token
    token = 'TODO Token Phone'
  }
  await emailService.sendVerificationEmail(req.user!.email, token)
  res.status(200).send(new SuccessResponse().serializeResponse())
})

const validateVerification = catchAsync(async (req, res) => {
  const verifyType: string = req.params.type

  if (verifyType === 'email') {
    await userService.verifyEmail(req.body.code)
  }

  res.status(200).send(new SuccessResponse().serializeResponse())
})

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(
    req.body.email
  )
  await emailService.sendResetPasswordEmail(req.body.email, resetPasswordToken)
  res.status(200).send(new SuccessResponse().serializeResponse())
})

const resetPassword = catchAsync(async (req, res) => {
  await userService.resetPassword(req.body.token, req.body.password)
  res.status(200).send(new SuccessResponse().serializeResponse())
})

export {
  getUser,
  requestVerification,
  validateVerification,
  forgotPassword,
  resetPassword
}
