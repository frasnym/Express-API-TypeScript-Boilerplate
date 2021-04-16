import { catchAsync } from '../utils/catch-async'
import { authService, tokenService } from '../services'
import { SuccessResponse } from '../utils/jsend'

const signUp = catchAsync(async (req, res, next) => {
  const user = await authService.createUser(req.body)
  const tokens = await tokenService.generateAuthTokens(user)
  // TODO: Create token
  res
    .status(201)
    .send(new SuccessResponse({ user, tokens }).serializeResponse())
})

export { signUp }
