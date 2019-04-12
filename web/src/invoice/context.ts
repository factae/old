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

type Context = {
  invoices: State
  dispatch: Dispatch<Action>
  download: (invoice: Invoice) => Promise<string>
}

const defaultContext: Context = {
  invoices: null,
  dispatch: noop,
  download: () => Promise.resolve(''),
}

export const InvoiceContext = createContext(defaultContext)

export default function() {
  return useContext(InvoiceContext)
}
