import express, { Application } from 'express'
import passport from 'passport'
import helmet from 'helmet'

import envVars from './config/envVars'
import * as morgan from './config/morgan'
import { jwtStrategy } from './config/passport'
import { errorConverter, errorHandler } from './middlewares/error'
import { router } from './routes/v1'
import { FailResponse } from './utils/jsend'

import { version } from '../package.json'

const app: Application = express()

// logger middleware
if (envVars.env !== 'test') {
  app.use(morgan.successHandler)
  app.use(morgan.errorHandler)
}

// set security HTTP headers
app.use(helmet())

// parse json request body
app.use(express.json())

// jwt authentication
app.use(passport.initialize())
passport.use('jwt', jwtStrategy)

// Available routes
app.use('/v1', router)

// Exactly base url
app.use(/^[/]{1}$/, (_req, res) => {
  res.send(`Boilerplate version ${version}`)
})

// send back a 404 error for any unknown api request
app.use(/(?<=.{1}).+/, () => {
  throw new FailResponse(404, 'Not found')
})

// convert error to JSend Error, if needed
app.use(errorConverter)

// error handler middleware
app.use(errorHandler)

export default app
