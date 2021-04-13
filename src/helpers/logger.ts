import { format, createLogger, transports } from 'winston'

const enumerateErrorFormat = format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack })
  }
  return info
})

const logger = createLogger({
  level: process.env.NODE_ENV === 'development' ? 'debug' : 'info',
  format: format.combine(
    format.timestamp(),
    enumerateErrorFormat(),
    process.env.NODE_ENV === 'development'
      ? format.colorize()
      : format.uncolorize(),
    format.splat(),
    format.printf(
      ({ timestamp, level, message }) => `[${timestamp}] [${level}]: ${message}`
    )
  ),
  transports: [new transports.Console()],
  exitOnError: false
})

export { logger }
