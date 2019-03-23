import isNull from 'lodash/isNull'
import {DateTime} from 'luxon'

export function to(date: DateTime | null) {
  if (isNull(date)) return null
  return date.toISO()
}

export function from(date: string | null) {
  if (isNull(date)) return null
  return DateTime.fromISO(date)
}
