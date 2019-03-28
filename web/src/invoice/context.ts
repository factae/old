import React from 'react'
import noop from 'lodash/fp/noop'

import {Invoice} from './model'

type ActionCreate = {
  type: 'create'
  invoice: Invoice
}

type ActionUpdate = {
  type: 'update'
  invoice: Invoice
}

type ActionUpdateAll = {
  type: 'update-all'
  invoices: Invoice[]
}

type Action = ActionCreate | ActionUpdate | ActionUpdateAll
type State = Invoice[] | null
type Context = [State, React.Dispatch<Action>]

function reducer(state: State, action: Action) {
  const invoices = state || []

  switch (action.type) {
    case 'create':
      return [...invoices, action.invoice]
    case 'update':
      return invoices.map(q =>
        q.id === action.invoice.id ? action.invoice : q,
      )
    case 'update-all':
      return action.invoices
    default:
      return state
  }
}

const context = React.createContext<Context>([null, noop])

export function useInvoiceReducer() {
  return React.useReducer(reducer, null)
}

export default context
