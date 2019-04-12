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

type Context = {
  quotations: State
  dispatch: Dispatch<Action>
  download: (quotation: Quotation) => Promise<string>
}

const defaultContext: Context = {
  quotations: null,
  dispatch: noop,
  download: () => Promise.resolve(''),
}

export const QuotationContext = createContext(defaultContext)

export default function() {
  return useContext(QuotationContext)
}
