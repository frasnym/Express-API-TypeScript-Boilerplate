import envVars from '../../src/config/envVars'
import { generateToken } from '../../src/services/token-service'
import { dateAdd } from '../../src/utils/date'
import { tokenTypes } from '../../src/config/tokens'
import { userOne } from './user-fixture'

const NOW = new Date()
const accessTokenExpires = dateAdd(
  NOW,
  'minute',
  envVars.jwt.accessExpirationMinutes
)
const useOneAccessToken = generateToken(
  userOne.id,
  accessTokenExpires,
  tokenTypes.ACCESS
)

export { useOneAccessToken }
