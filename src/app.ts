import express, { Application } from 'express'
import morgan from './helpers/morgan'

const app: Application = express()

// logger middleware
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan.successHandler)
  app.use(morgan.errorHandler)
}

// parse json request body
app.use(express.json())

app.use('/', (_req, res) => {
  res.send('Boilerplate version 1.0.0')
})

export default app
