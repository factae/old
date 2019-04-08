import {createContext, useContext} from 'react'
import noop from 'lodash/noop'

type Context = {
  open: boolean
  openPaymentDialog: () => void
  closePaymentDialog: () => void
}

const defaultContext: Context = {
  open: false,
  openPaymentDialog: noop,
  closePaymentDialog: noop,
}

export const PaymentContext = createContext(defaultContext)

export default function() {
  return useContext(PaymentContext)
}
