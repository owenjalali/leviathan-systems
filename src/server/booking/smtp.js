import nodemailer from 'nodemailer'
import { BookingError } from './errors.js'

export function createSmtpTransport(env) {
  return nodemailer.createTransport({
    host: env.smtpHost,
    port: env.smtpPort,
    secure: env.smtpSecure,
    auth:
      env.smtpUser || env.smtpPass
        ? {
            user: env.smtpUser,
            pass: env.smtpPass,
          }
        : undefined,
  })
}

export function createSmtpGateway({
  transport,
  from,
  replyTo,
}) {
  return {
    async sendMessage({
      to,
      cc,
      bcc,
      subject,
      text,
      html,
      replyTo: messageReplyTo,
    }) {
      try {
        const response = await transport.sendMail({
          from,
          to,
          cc,
          bcc,
          subject,
          text,
          html,
          replyTo: messageReplyTo || replyTo || undefined,
        })

        return response
      } catch (error) {
        throw new BookingError('SMTP could not send the notification email.', {
          status: 502,
          code: 'SMTP_SEND_ERROR',
          cause: error,
        })
      }
    },
  }
}
