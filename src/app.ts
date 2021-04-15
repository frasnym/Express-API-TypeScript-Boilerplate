import express, { Application } from 'express'
import envVars from './config/envVars'
import { successHandler, errorHandler } from './config/morgan'
import { router } from './routes/v1'

const app: Application = express()

// logger middleware
if (envVars.env !== 'test') {
  app.use(successHandler)
  app.use(errorHandler)
}

// parse json request body
app.use(express.json())

app.use('/v1', router)
app.use('/', (_req, res) => {
  res.send('Boilerplate version 1.0.0')
})

export default app
