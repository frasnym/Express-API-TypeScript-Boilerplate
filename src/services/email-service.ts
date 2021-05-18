import envVars from '../config/envVars'
import { transport } from '../config/transport'

/**
 * Send an email
 */
const sendEmail = async (to: string, subject: string, text: string) => {
  const msg = { from: envVars.email.from, to, subject, text }
  await transport.sendMail(msg)
}

/**
 * Send verification email
 */
const sendVerificationEmail = async (to: string, token: string) => {
  const subject = '[AppName] Email Verification'
  // replace this url with the link to the email verification page of your front-end app
  const verificationEmailUrl = `http://link-to-app/verify-email?token=${token}`
  const text = `Dear user,
To verify your email, click on this link: ${verificationEmailUrl}
If you did not create an account, then ignore this email.`
  await sendEmail(to, subject, text)
}

export { sendEmail, sendVerificationEmail }
