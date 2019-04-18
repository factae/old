import {DateTime} from 'luxon'

import {User} from './model'

export function checkUserSubscription(user: User | null) {
  if (!user) return null
  if (!user.expiresAt) return false

  const expiresAt = DateTime.fromISO(user.expiresAt)
  if (expiresAt < DateTime.local()) return false

  return expiresAt
}
