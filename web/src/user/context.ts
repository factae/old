import React from 'react'
import merge from 'lodash/merge'
import noop from 'lodash/noop'

import User from './model'

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
      return merge(action.profile, state)
    default:
      return state
  }
}

const context = React.createContext<Context>([null, noop])

export function useProfileReducer() {
  return React.useReducer(reducer, null)
}

export default context
