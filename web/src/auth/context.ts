import {createContext, useContext} from 'react'
import noop from 'lodash/noop'

type Context = {
  auth: boolean | null
  register: (email: string) => void
  login: (email: string, password: string) => void
  password: (token: string, password: string) => void
  reset: (email: string) => void
  logout: () => void
}

const defaultContext: Context = {
  auth: false,
  register: noop,
  login: noop,
  password: noop,
  reset: noop,
  logout: noop,
}

export const AuthContext = createContext(defaultContext)

export default function() {
  return useContext(AuthContext)
}
