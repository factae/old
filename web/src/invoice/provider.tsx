import React, {ReactNode, useEffect, useReducer} from 'react'

import {Invoice} from './model'
import {InvoiceContext, State, Action} from './context'
import * as $invoice from './service'

function reducer(state: State, action: Action) {
  const invoices = state || []

  switch (action.type) {
    case 'create':
      return [...invoices, action.invoice]
    case 'update':
      return invoices.map(i =>
        i.id === action.invoice.id ? action.invoice : i,
      )
    case 'update-all':
      return action.invoices
    default:
      return state
  }
}

// ---------------------------------------------------------------- # Provider #

type Props = {
  children: ReactNode
}

export default function({children}: Props) {
  const [invoices, dispatch] = useReducer(reducer, null)

  function setInvoices(invoices: Invoice[]) {
    dispatch({type: 'update-all', invoices})
  }

  useEffect(() => {
    $invoice.readAll().then(setInvoices)
  }, [])

  return (
    <InvoiceContext.Provider value={[invoices, dispatch]}>
      {children}
    </InvoiceContext.Provider>
  )
}
