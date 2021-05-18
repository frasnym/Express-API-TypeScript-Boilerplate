import envVars from '../config/envVars'
import { mailer } from '../config/mailer'

/**
 * Send an email
 */
const sendEmail = async (to: string, subject: string, text: string) => {
  const msg = { from: envVars.email.from, to, subject, text }
  await mailer.sendMail(msg)
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

/**
 * Send reset password email
 */
const sendResetPasswordEmail = async (to: string, token: string) => {
  const subject = '[AppName] Reset password'
  // replace this url with the link to the reset password page of your front-end app
  const resetPasswordUrl = `http://link-to-app/reset-password?token=${token}`
  const text = `Dear user,
To reset your password, click on this link: ${resetPasswordUrl}
If you did not request any password resets, then ignore this email.`
  await sendEmail(to, subject, text)
}

export { sendEmail, sendVerificationEmail, sendResetPasswordEmail }
