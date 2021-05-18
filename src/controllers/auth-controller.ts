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

  res.status(200).send(new SuccessResponse().serializeResponse())
})

const refreshToken = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken)

  res.send(new SuccessResponse(tokens).serializeResponse())
})

export { signUp, signIn, signOut, refreshToken }
