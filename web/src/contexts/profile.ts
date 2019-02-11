import React from 'react'
import merge from 'lodash/fp/merge'
import noop from 'lodash/fp/noop'

import User from '../models/User'

type ActionUpdate = {
  type: 'update'
  profile: User
}

type Action = ActionUpdate
type State = User | null
type Context = [State, React.Dispatch<Action>]

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'update':
      return merge(state)(action.profile)
    default:
      return state
  }
}

const context = React.createContext<Context>([null, noop])

export function useProfileReducer() {
  return React.useReducer(reducer, null)
}

export default context
