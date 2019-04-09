import {Dispatch, createContext, useContext} from 'react'
import noop from 'lodash/fp/noop'

import {Client} from './model'

type ActionCreate = {
  type: 'create'
  client: Client
}

type ActionUpdate = {
  type: 'update'
  client: Client
}

type ActionUpdateAll = {
  type: 'update-all'
  clients: Client[]
}

export type Action = ActionCreate | ActionUpdate | ActionUpdateAll
export type State = Client[] | null
type Context = [State, Dispatch<Action>]

export const ClientContext = createContext<Context>([null, noop])

export default function() {
  return useContext(ClientContext)
}
