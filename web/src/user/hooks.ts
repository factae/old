import {DateTime} from 'luxon'
import getOr from 'lodash/fp/getOr'

import {User} from './model'
import useUserContext from './context'

type Setting = 'documentAutoSend'

function hasPremium(user: User | null) {
  if (!user) return null
  if (!user.expiresAt) return false
  if (DateTime.fromISO(user.expiresAt) < DateTime.local()) return false

  return DateTime.fromISO(user.expiresAt)
}

export function useUserPremium() {
  const [user] = useUserContext()
  return hasPremium(user)
}

export function useUserSetting(setting: Setting) {
  const [user] = useUserContext()
  return hasPremium(user) && getOr(false, setting, user)
}
