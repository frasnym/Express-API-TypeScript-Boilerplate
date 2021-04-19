import express, { Application } from 'express'
import passport from 'passport'

import envVars from './config/envVars'
import * as morgan from './config/morgan'
import { jwtStrategy } from './config/passport'
import { errorHandler } from './middlewares/error'
import { router } from './routes/v1'

const app: Application = express()

// logger middleware
if (envVars.env !== 'test') {
  app.use(morgan.successHandler)
  app.use(morgan.errorHandler)
}

// parse json request body
app.use(express.json())

// jwt authentication
app.use(passport.initialize())
passport.use('jwt', jwtStrategy)

app.use('/v1', router)
app.use('/', (_req, res) => {
  res.send('Boilerplate version 1.0.0')
})

// error handler middleware
app.use(errorHandler)

export default app
