import {DateTime} from 'luxon'

import useUserContext from './context'

export function usePremium() {
  const [user] = useUserContext()

  if (!user) return false
  if (!user.premium) return false
  if (user.premium < DateTime.local()) return false

  return true
}
