import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptions,
  VerifyCallback
} from 'passport-jwt'
import { tokenTypes } from './tokens'
import envVars from './envVars'
import { JWTPayload } from '../types/rest-api'

const jwtOptions: StrategyOptions = {
  secretOrKey: envVars.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

const jwtVerify: VerifyCallback = async (payload: JWTPayload, done) => {
  try {
    if (payload.type !== tokenTypes.ACCESS) {
      throw new Error('Invalid token type')
    }

    // TODO: Check user on DB
    // const user = await User.findById(payload.sub);
    // if (!user) {
    //   return done(null, false);
    // }
    const user = {
      name: 'Dummy user'
    }

    done(null, user)
  } catch (error) {
    done(error, false)
  }
}

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify)

export { jwtStrategy }
