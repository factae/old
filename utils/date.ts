import {DateTime} from 'luxon'
import _ from 'lodash/fp'

export function to(date: DateTime | null) {
  if (_.isNull(date)) return null
  return date.toISO()
}

export function from(date: string | null) {
  if (_.isNull(date)) return null
  return DateTime.fromISO(date)
}
