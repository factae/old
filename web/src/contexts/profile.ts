import React from 'react'
import merge from 'lodash/fp/merge'
import noop from 'lodash/fp/noop'

import User from '../models/User'

type ActionUpdate = {
  type: 'update'
  profile: User
}

export type Action = ActionUpdate

export type State = User | null

interface Context {
  state: State
  dispatch: React.Dispatch<Action>
}

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'update':
      return merge(state)(action.profile)
    default:
      return state
  }
}

const context = React.createContext<Context>({state: null, dispatch: noop})

export function useProfileReducer() {
  const [state, dispatch] = React.useReducer(reducer, null)
  return {state, dispatch}
}

export default context
