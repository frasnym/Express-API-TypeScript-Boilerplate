import nodemailer from 'nodemailer'
import envVars from '../config/envVars'

const transport = nodemailer.createTransport(envVars.email.smtp)

export { transport }
