import React from 'react'
import noop from 'lodash/fp/noop'

import Client from '../models/Client'

type ActionUpdateAll = {
  type: 'update-all'
  clients: Client[]
}

type ActionCreate = {
  type: 'create'
  client: Client
}

type ActionUpdate = {
  type: 'update'
  client: Client
}

export type Action = ActionUpdateAll | ActionCreate | ActionUpdate

export type State = Client[] | null

interface Context {
  state: State
  dispatch: React.Dispatch<Action>
}

function reducer(state: State, action: Action) {
  const clients = state || []

  switch (action.type) {
    case 'update-all':
      return action.clients
    case 'create':
      return [...clients, action.client]
    case 'update':
      return clients.map(c => (c.id === action.client.id ? action.client : c))
    default:
      return state
  }
}

const context = React.createContext<Context>({state: null, dispatch: noop})

export function useClientReducer() {
  const [state, dispatch] = React.useReducer(reducer, null)
  return {state, dispatch}
}

export default context
