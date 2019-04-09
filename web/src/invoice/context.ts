import {Dispatch, createContext, useContext} from 'react'
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

export type Action = ActionCreate | ActionUpdate | ActionUpdateAll
export type State = Invoice[] | null
type Context = [State, Dispatch<Action>]

export const InvoiceContext = createContext<Context>([null, noop])

export default function() {
  return useContext(InvoiceContext)
}
