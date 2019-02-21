import React from 'react'
import noop from 'lodash/fp/noop'

import {Quotation} from './model'

type ActionCreate = {
  type: 'create'
  quotation: Quotation
}

type ActionUpdate = {
  type: 'update'
  quotation: Quotation
}

type ActionUpdateAll = {
  type: 'update-all'
  quotations: Quotation[]
}

type Action = ActionCreate | ActionUpdate | ActionUpdateAll
type State = Quotation[] | null
type Context = [State, React.Dispatch<Action>]

function reducer(state: State, action: Action) {
  const quotations = state || []

  switch (action.type) {
    case 'create':
      return [...quotations, action.quotation]
    case 'update':
      return quotations.map(q =>
        q.id === action.quotation.id ? action.quotation : q,
      )
    case 'update-all':
      return action.quotations
    default:
      return state
  }
}

const context = React.createContext<Context>([null, noop])

export function useQuotationReducer() {
  return React.useReducer(reducer, null)
}

export default context
