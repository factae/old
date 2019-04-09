import React, {ReactNode, useEffect, useReducer} from 'react'

import {Client} from './model'
import {ClientContext, State, Action} from './context'
import * as $client from './service'

function reducer(state: State, action: Action) {
  const clients = state || []

  switch (action.type) {
    case 'create':
      return [...clients, action.client]
    case 'update':
      return clients.map(c => (c.id === action.client.id ? action.client : c))
    case 'update-all':
      return action.clients
    default:
      return state
  }
}

// ---------------------------------------------------------------- # Provider #

type Props = {
  children: ReactNode
}

export default function({children}: Props) {
  const [clients, dispatch] = useReducer(reducer, null)

  function setClients(clients: Client[]) {
    dispatch({type: 'update-all', clients})
  }

  useEffect(() => {
    $client.readAll().then(setClients)
  }, [])

  return (
    <ClientContext.Provider value={[clients, dispatch]}>
      {children}
    </ClientContext.Provider>
  )
}
