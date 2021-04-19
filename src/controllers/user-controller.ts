import { catchAsync } from '../utils/catch-async'
import { SuccessResponse } from '../utils/jsend'

const getUser = catchAsync(async (req, res) => {
  const user = req.user
  res.status(200).send(new SuccessResponse({ user }).serializeResponse())
})

export { getUser }
