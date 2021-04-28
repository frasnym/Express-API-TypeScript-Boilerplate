import { UserAttributes } from '../types/rest-api'
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

export { getUser }
