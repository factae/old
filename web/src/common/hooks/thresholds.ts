import {useContext} from 'react'
import isNull from 'lodash/isNull'

import {Activity} from '../../user/model'
import UserContext from '../../user/context'

type Thresholds = [number, number, number]

export default function(): Thresholds {
  const [user] = useContext(UserContext)
  if (isNull(user)) return [0, 0, 0]

  switch (user.activity) {
    case Activity.trade:
      return [82800, 91000, 170000]

    case Activity.service:
      return [33200, 35200, 70000]

    default:
      return [0, 0, 0]
  }
}
