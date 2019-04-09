import React, {ReactNode, useState} from 'react'

import Loader from './components/Loader'
import Snackbar from './components/Snackbar'
import {AsyncContext} from './context'

type Props = {
  children: ReactNode
}

export default function({children}: Props) {
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  function start() {
    setLoading(true)
  }

  function stop(nextMessage?: string | void) {
    setLoading(false)

    if (!message && nextMessage) {
      setMessage(nextMessage || '')
    }
  }

  function close() {
    setMessage('')
  }

  return (
    <AsyncContext.Provider value={{loading, start, stop}}>
      {children}
      <Loader />
      <Snackbar message={message} onClose={close} />
    </AsyncContext.Provider>
  )
}
