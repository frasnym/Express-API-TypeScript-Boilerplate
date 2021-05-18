import nodemailer from 'nodemailer'
import envVars from './envVars'

const mailer = nodemailer.createTransport(envVars.email.smtp)

export { mailer }
