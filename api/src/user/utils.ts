import {DateTime} from 'luxon'
import getOr from 'lodash/fp/getOr'

import {User} from './model'

type Setting = 'documentAutoSend'

export function hasSetting(user: User, setting: Setting) {
  if (!user.expiresAt) return false
  if (DateTime.fromISO(user.expiresAt) < DateTime.local()) return false

  return getOr(null, setting, user)
}
