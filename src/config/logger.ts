import { format, createLogger, transports } from 'winston'
import envVars from './envVars'

const enumerateErrorFormat = format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack })
  }
  return info
})

const logger = createLogger({
  level: envVars.env === 'development' ? 'debug' : 'info',
  format: format.combine(
    format.timestamp(),
    enumerateErrorFormat(),
    envVars.env === 'development' ? format.colorize() : format.uncolorize(),
    format.splat(),
    format.printf(
      ({ timestamp, level, message }) => `[${timestamp}] [${level}]: ${message}`
    )
  ),
  transports: [new transports.Console()],
  exitOnError: false
})

export { logger }
