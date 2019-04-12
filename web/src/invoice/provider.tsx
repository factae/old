import React, {ReactNode, useEffect, useReducer, useRef, useState} from 'react'
import _ from 'lodash/fp'

import useClientContext from '../client/context'
import {Client} from '../client/model'
import Document from './components/Document'
import {Invoice} from './model'
import {InvoiceContext, State, Action} from './context'
import * as $invoice from './service'

function invoicesReducer(state: State, action: Action) {
  const invoices = state || []

  switch (action.type) {
    case 'create':
      return [...invoices, action.invoice]

    case 'update':
      return invoices.map(invoice =>
        invoice.id === action.invoice.id ? action.invoice : invoice,
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
  const [clients] = useClientContext()
  const [invoices, dispatch] = useReducer(invoicesReducer, null)
  const [readyToDownload, setReadyToDownload] = useState(false)
  const clientRef = useRef<Client | null>(null)
  const invoiceRef = useRef<Invoice | null>(null)
  const resolveRef = useRef<(pdf: string) => void | string>(() => '')
  const rejectRef = useRef<(error: Error) => void>(_.noop)

  function setInvoices(invoices: Invoice[]) {
    dispatch({type: 'update-all', invoices})
  }

  function download(invoice: Invoice) {
    return new Promise<string>((resolve, reject) => {
      resolveRef.current = resolve
      rejectRef.current = reject
      invoiceRef.current = invoice
      clientRef.current = _.find({id: invoice.clientId}, clients) || null

      setReadyToDownload(true)
    })
  }

  function handleSuccessDownload(pdf: string) {
    setReadyToDownload(false)
    resolveRef.current(pdf)
  }

  function handleErrorDownload(error: Error) {
    setReadyToDownload(false)
    rejectRef.current(error)
  }

  useEffect(() => {
    $invoice.readAll().then(setInvoices)
  }, [])

  return (
    <InvoiceContext.Provider value={{invoices, dispatch, download}}>
      {children}
      {readyToDownload && (
        <Document
          onSuccess={handleSuccessDownload}
          onError={handleErrorDownload}
          invoice={invoiceRef.current}
          client={clientRef.current}
        />
      )}
    </InvoiceContext.Provider>
  )
}
