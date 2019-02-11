import React, {useReducer} from 'react'
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

type Action = ActionUpdateAll | ActionCreate | ActionUpdate
type State = Client[] | null
type Context = [State, React.Dispatch<Action>]

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

const context = React.createContext<Context>([null, noop])

export function useClientReducer() {
  return useReducer(reducer, null)
}

export default context
