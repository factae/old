import {createContext, useContext} from 'react'
import noop from 'lodash/noop'

type Context = {
  loading: boolean
  start: () => void
  stop: (message?: string | void) => void
}

const defaultContext: Context = {
  loading: true,
  start: noop,
  stop: noop,
}

export const AsyncContext = createContext<Context>(defaultContext)

export default function() {
  return useContext(AsyncContext)
}
