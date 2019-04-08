import React, {ReactNode, useState} from 'react'

import PaymentDialog from './components'
import {PaymentContext} from './context'

type Props = {
  children: ReactNode
}

export default function({children}: Props) {
  const [open, setOpen] = useState(false)

  function openPaymentDialog() {
    setOpen(true)
  }

  function closePaymentDialog() {
    setOpen(false)
  }

  const value = {open, openPaymentDialog, closePaymentDialog}

  return (
    <PaymentContext.Provider value={value}>
      {children}
      <PaymentDialog />
    </PaymentContext.Provider>
  )
}
