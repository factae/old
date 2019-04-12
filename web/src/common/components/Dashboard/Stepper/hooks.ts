import {User} from '../../../../user/model'
import useUserContext from '../../../../user/context'
import * as $user from '../../../../user/service'

import steps from './steps'

type Step = number
type SetStep = () => Promise<void>

export function useUserStep(): [Step, SetStep] {
  const [user, setUser] = useUserContext()

  async function nextStep() {
    if (!user) return

    const step = Math.min(steps.length, user.step + 1)
    const nextUser: User = {...user, step}

    await $user.update(nextUser)
    setUser(nextUser)
  }

  return [user ? user.step : 0, nextStep]
}
