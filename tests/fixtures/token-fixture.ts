import envVars from '../../src/config/envVars'
import { generateToken } from '../../src/services/token-service'
import { dateAdd } from '../../src/utils/date'
import { userOne } from './user-fixture'
import { TokenType } from '../../src/types/rest-api'

const NOW = new Date()
const accessTokenExpires = dateAdd(
  NOW,
  'minute',
  envVars.jwt.accessExpirationMinutes
)
const useOneAccessToken = generateToken(
  userOne.id,
  accessTokenExpires,
  TokenType.access
)

export { useOneAccessToken }
