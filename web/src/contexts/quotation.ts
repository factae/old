import React from 'react'
import noop from 'lodash/fp/noop'

import Quotation from '../models/Quotation'

type ActionUpdateAll = {
  type: 'update-all'
  quotations: Quotation[]
}

type ActionCreate = {
  type: 'create'
  quotation: Quotation
}

export type Action = ActionUpdateAll | ActionCreate

export type State = Quotation[] | null

interface Context {
  state: State
  dispatch: React.Dispatch<Action>
}

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

const context = React.createContext<Context>({state: null, dispatch: noop})

export function useQuotationReducer() {
  const [state, dispatch] = React.useReducer(reducer, null)
  return {state, dispatch}
}

export default context
