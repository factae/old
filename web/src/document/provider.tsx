import React, {ReactNode, useEffect, useReducer, useRef, useState} from 'react'
import _ from 'lodash/fp'

import useClientContext from '../client/context'
import {Client} from '../client/model'
import PDF from './components/PDF'
import {Document} from './model'
import {DocumentContext, State, Action} from './context'
import * as $document from './service'

function documentsReducer(state: State, action: Action) {
  const documents = state || []

  switch (action.type) {
    case 'create':
      return [...documents, action.document]

    case 'update':
      return documents.map(document =>
        document.id === action.document.id ? action.document : document,
      )

    case 'update-all':
      return action.documents

    case 'delete':
      return _.reject({id: action.id}, documents)

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
  const [documents, dispatch] = useReducer(documentsReducer, null)
  const [readyToDownload, setReadyToDownload] = useState(false)
  const clientRef = useRef<Client | null>(null)
  const documentRef = useRef<Document | null>(null)
  const resolveRef = useRef<(pdf: string) => void | string>(() => '')
  const rejectRef = useRef<(error: Error) => void>(_.noop)

  function setDocuments(documents: Document[]) {
    dispatch({type: 'update-all', documents})
  }

  function download(document: Document) {
    return new Promise<string>((resolve, reject) => {
      resolveRef.current = resolve
      rejectRef.current = reject
      documentRef.current = document
      clientRef.current = _.find({id: document.clientId}, clients) || null

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
    $document.readAll().then(setDocuments)
  }, [])

  return (
    <DocumentContext.Provider value={{documents, dispatch, download}}>
      {children}
      {readyToDownload && (
        <PDF
          onSuccess={handleSuccessDownload}
          onError={handleErrorDownload}
          document={documentRef.current}
          client={clientRef.current}
        />
      )}
    </DocumentContext.Provider>
  )
}
