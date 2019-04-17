import React, {ReactNode, Suspense, useEffect, useState} from 'react'

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

  function Loading() {
    useEffect(() => {
      start()
      return () => stop()
    }, [])

    return null
  }

  return (
    <AsyncContext.Provider value={{loading, start, stop}}>
      <Loader />
      <Snackbar message={message} onClose={close} />
      <Suspense fallback={<Loading />}>{children}</Suspense>
    </AsyncContext.Provider>
  )
}
