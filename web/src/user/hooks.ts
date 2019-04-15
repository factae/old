import {DateTime} from 'luxon'
import getOr from 'lodash/fp/getOr'

import {User} from './model'
import useUserContext from './context'

type Setting = 'documentAutoSend'

function hasPremium(user: User | null) {
  if (!user) return null
  if (!user.premium) return false
  if (user.premium < DateTime.local()) return false

  return user.premium
}

export function useUserPremium() {
  const [user] = useUserContext()
  return hasPremium(user)
}

export function useUserSetting(setting: Setting) {
  const [user] = useUserContext()
  return hasPremium(user) && getOr(false, setting, user)
}
