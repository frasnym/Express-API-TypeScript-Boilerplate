import { DateInterval } from '../types/rest-api'
import { ErrorResponse } from './jsend'

/**
 * Adds time to a date. Modelled after MySQL DATE_ADD function.
 * Example: dateAdd(new Date(), 'minute', 30)  //returns 30 minutes from now.
 * https://stackoverflow.com/a/1214753/18511
 *
 * @param date  Date to start with
 * @param interval  One of: year, quarter, month, week, day, hour, minute, second
 * @param units  Number of units of the given interval to add.
 *
 * @returns Date
 */
const dateAdd = (date: Date, interval: DateInterval, units: number): Date => {
  if (!(date instanceof Date)) {
    throw new ErrorResponse(
      500,
      '[Date Manipulation]: Start date must be a date'
    )
  }

  const ret = new Date(date) // don't change original date
  const checkRollover = function () {
    if (ret.getDate() !== date.getDate()) ret.setDate(0)
  }

  switch (String(interval).toLowerCase()) {
    case 'year':
      ret.setFullYear(ret.getFullYear() + units)
      checkRollover()
      break
    case 'quarter':
      ret.setMonth(ret.getMonth() + 3 * units)
      checkRollover()
      break
    case 'month':
      ret.setMonth(ret.getMonth() + units)
      checkRollover()
      break
    case 'week':
      ret.setDate(ret.getDate() + 7 * units)
      break
    case 'day':
      ret.setDate(ret.getDate() + units)
      break
    case 'hour':
      ret.setTime(ret.getTime() + units * 3600000)
      break
    case 'minute':
      ret.setTime(ret.getTime() + units * 60000)
      break
    case 'second':
      ret.setTime(ret.getTime() + units * 1000)
      break
    default:
      throw new ErrorResponse(
        500,
        '[Error Manipulate Date]: Unable to add interval to a date'
      )
  }

  return ret
}

export { dateAdd }
