import { catchAsync } from '../utils/catch-async'
import { authService, tokenService } from '../services'
import { SuccessResponse } from '../utils/jsend'

const signUp = catchAsync(async (req, res) => {
  const user = await authService.createUser(req.body)
  const tokens = await tokenService.generateAuthTokens(user)

  res
    .status(201)
    .send(new SuccessResponse({ user, tokens }).serializeResponse())
})

const signIn = catchAsync(async (req, res) => {
  const { email, password } = req.body
  const user = await authService.signInUserWithEmailAndPassword(email, password)
  res
    .status(200)
    .send(new SuccessResponse(user.withoutCredentials()).serializeResponse())
})

export { signUp, signIn }
