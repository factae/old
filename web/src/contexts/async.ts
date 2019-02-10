import {createContext} from 'react'
import noop from 'lodash/fp/noop'

type Context = {
  loading: boolean
  start: () => void
  stop: (message?: string | void) => void
}

const context = createContext<Context>({
  loading: false,
  start: noop,
  stop: noop,
})

export default context
