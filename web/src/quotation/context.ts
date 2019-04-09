import {Dispatch, createContext, useContext} from 'react'
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

export type Action = ActionCreate | ActionUpdate | ActionUpdateAll
export type State = Quotation[] | null
type Context = [State, Dispatch<Action>]

export const QuotationContext = createContext<Context>([null, noop])

export default function() {
  return useContext(QuotationContext)
}
