import { emailService, tokenService } from '../services'
import { UserAttributes } from '../types/model'
import { catchAsync } from '../utils/catch-async'
import { FailResponse, SuccessResponse } from '../utils/jsend'

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

  if (!['email', 'phone'].includes(verifyType)) {
    throw new FailResponse(400, 'Invalid verification type')
  }

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
  res.status(204).send()
})

export { getUser, requestVerification }
