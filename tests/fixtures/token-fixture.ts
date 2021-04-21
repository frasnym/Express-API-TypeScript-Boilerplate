import envVars from '../../src/config/envVars'
import { generateToken } from '../../src/services/token-service'
import { dateAdd } from '../../src/utils/date'
import { tokenTypes } from '../../src/config/tokens'

const NOW = new Date()
const accessTokenExpires = dateAdd(
  NOW,
  'minute',
  envVars.jwt.accessExpirationMinutes
)
const accessToken = generateToken(
  Math.random(),
  accessTokenExpires,
  tokenTypes.ACCESS
)

export { accessToken }
