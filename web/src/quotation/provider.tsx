import React, {ReactNode, useEffect, useReducer, useRef, useState} from 'react'
import _ from 'lodash/fp'

import useClientContext from '../client/context'
import {Client} from '../client/model'
import Document from './components/Document'
import {Quotation} from './model'
import {QuotationContext, State, Action} from './context'
import * as $quotation from './service'

function quotationsReducer(state: State, action: Action) {
  const quotations = state || []

  switch (action.type) {
    case 'create':
      return [...quotations, action.quotation]

    case 'update':
      return quotations.map(quotation =>
        quotation.id === action.quotation.id ? action.quotation : quotation,
      )

    case 'update-all':
      return action.quotations

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
  const [quotations, dispatch] = useReducer(quotationsReducer, null)
  const [readyToDownload, setReadyToDownload] = useState(false)
  const clientRef = useRef<Client | null>(null)
  const quotationRef = useRef<Quotation | null>(null)
  const resolveRef = useRef<(pdf: string) => void | string>(() => '')
  const rejectRef = useRef<(error: Error) => void>(_.noop)

  function setQuotations(quotations: Quotation[]) {
    dispatch({type: 'update-all', quotations})
  }

  function download(quotation: Quotation) {
    return new Promise<string>((resolve, reject) => {
      resolveRef.current = resolve
      rejectRef.current = reject
      quotationRef.current = quotation
      clientRef.current = _.find({id: quotation.clientId}, clients) || null

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
    $quotation.readAll().then(setQuotations)
  }, [])

  return (
    <QuotationContext.Provider value={{quotations, dispatch, download}}>
      {children}
      {readyToDownload && (
        <Document
          onSuccess={handleSuccessDownload}
          onError={handleErrorDownload}
          quotation={quotationRef.current}
          client={clientRef.current}
        />
      )}
    </QuotationContext.Provider>
  )
}
