import { catchAsync } from '../utils/catch-async'
import { authService, tokenService } from '../services'
import { SuccessResponse } from '../utils/jsend'

const signUp = catchAsync(async (req, res) => {
  const user = await authService.createUser(req.body)
  const tokens = await tokenService.generateAuthTokens(user)

  res.status(201).send(
    new SuccessResponse({
      user: user.withoutCredentials(),
      tokens
    }).serializeResponse()
  )
})

const signIn = catchAsync(async (req, res) => {
  const { email, password } = req.body
  const user = await authService.signInUserWithEmailAndPassword(email, password)
  const tokens = await tokenService.generateAuthTokens(user)

  res.send(
    new SuccessResponse({
      user: user.withoutCredentials(),
      tokens
    }).serializeResponse()
  )
})

const signOut = catchAsync(async (req, res) => {
  await authService.signOut(req.body.refreshToken)

  res.status(204).send()
})

export { signUp, signIn, signOut }
