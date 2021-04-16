import { catchAsync } from '../utils/catch-async'
import { authService, tokenService } from '../services'
import { SuccessResponse } from '../utils/jsend'

const signUp = catchAsync(async (req, res, next) => {
  const user = await authService.createUser(req.body)
  const token = await tokenService.generateAuthTokens(user)
  // TODO: Create token
  res.status(201).send(new SuccessResponse({ user, token }).serializeResponse())
})

export { signUp }
