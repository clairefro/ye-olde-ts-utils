// DATE STRINGS (YYYY-MM-dd) -------------------------------------------------------

/** Takes a timestamp string ('YYYY-MM-DDTHH-mm-ss...') and chops off everything from 'T' onward. */
export const timestampToDateStr = (timestamp: string): string => {
  return timestamp.split('T')[0]
}

/** Returns current date string (UTC): 'YYYY-MM-dd' */
export const currentUTCDate = (): string => {
  return timestampToDateStr(new Date().toISOString())
}

/** Throws an error if date string is not of format 'YYYY-MM-dd', or date is invalid */
export const validateDateStr = (dateStr: string): void => {
  const dateStrRegex = /^\d{4}-\d{2}-\d{2}$/
  const parsedDate = new Date(dateStr).getDate()
  if (!dateStr.match(dateStrRegex) || Number.isNaN(parsedDate)) {
    throw new Error(`Invalid date string. Must be valid date of format YYYY-MM-DD. Value provided was: ${dateStr}`)
  }
}

/** Accepts a date string (format: 'YYYY-MM-DD') and returns a date string n days from that date. Use negative value for nDays to translate to a past date */
export const nDaysFromDate = (dateStr: string, nDays: number): string => {
  validateDateStr(dateStr)
  const nextDate = new Date()
  const offsetMillis = 1000 * 60 * 60 * 24 * nDays
  nextDate.setTime(new Date(dateStr).getTime() + offsetMillis)
  return timestampToDateStr(nextDate.toISOString())
}

/** Increments date by one day by default. Shorthand for nDaysFromDate(<dateStr>, 1) when no nDays passed */
export const incrementDate = (dateStr: string, nDays = 1): string => {
  return nDaysFromDate(dateStr, nDays)
}

/** Returns number of days (inclusive) in a range of two date strings ('YYYY-MM-dd') */
export const daysInRangeIncl = (start: string, end: string): number => {
  return Math.round((new Date(end).getTime() - new Date(start).getTime())/(1000*60*60*24)) + 1;
}