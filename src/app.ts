import express, { Application } from 'express'
import { successHandler, errorHandler } from './helpers/morgan'

const app: Application = express()

// logger middleware
if (process.env.NODE_ENV !== 'test') {
  app.use(successHandler)
  app.use(errorHandler)
}

// parse json request body
app.use(express.json())

app.use('/', (_req, res) => {
  res.send('Boilerplate version 1.0.0')
})

export default app
