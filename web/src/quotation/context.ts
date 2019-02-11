import React from 'react'
import noop from 'lodash/fp/noop'

import Quotation from './model'

type ActionUpdateAll = {
  type: 'update-all'
  quotations: Quotation[]
}

type ActionCreate = {
  type: 'create'
  quotation: Quotation
}

type Action = ActionUpdateAll | ActionCreate
type State = Quotation[] | null
type Context = [State, React.Dispatch<Action>]

function reducer(state: State, action: Action) {
  const quotations = state || []

  switch (action.type) {
    case 'update-all':
      return action.quotations
    case 'create':
      return [...quotations, action.quotation]
    default:
      return state
  }
}

const context = React.createContext<Context>([null, noop])

export function useQuotationReducer() {
  return React.useReducer(reducer, null)
}

export default context
