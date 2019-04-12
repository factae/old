import {DateTime} from 'luxon'
import getOr from 'lodash/fp/getOr'

import {User} from './model'

type Setting = 'quotationAutoSend' | 'invoiceAutoSend'

export function hasSetting(user: User, setting: Setting) {
  if (!user.premium) return false
  if (DateTime.fromISO(user.premium) < DateTime.local()) return false

  return getOr(null, setting, user)
}
