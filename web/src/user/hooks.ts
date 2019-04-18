import getOr from 'lodash/fp/getOr'

import useUserContext from './context'

type Setting = 'documentAutoSend'

export function useUserSetting(setting: Setting) {
  const [user] = useUserContext()
  return getOr(false, setting, user)
}
