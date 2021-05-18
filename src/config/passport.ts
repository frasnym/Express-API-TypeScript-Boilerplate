import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptions,
  VerifyCallback
} from 'passport-jwt'
import envVars from './envVars'
import { JWTPayload, TokenType } from '../types/rest-api'
import { User } from './db'

const jwtOptions: StrategyOptions = {
  secretOrKey: envVars.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

const jwtVerify: VerifyCallback = async (payload: JWTPayload, done) => {
  try {
    if (payload.type !== TokenType.access) {
      throw new Error('Invalid token type')
    }

    const user = await User.findByPk(payload.sub, { raw: true })
    if (!user) {
      return done(null, false)
    }

    done(null, user)
  } catch (error) {
    done(error, false)
  }
}

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify)

export { jwtStrategy }
