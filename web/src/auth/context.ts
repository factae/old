import {createContext, useContext} from 'react'
import noop from 'lodash/noop'

type Context = {
  auth: boolean | null
  register: (email: string, password: string) => void
  login: (email: string, password: string) => void
  logout: () => void
}

const defaultContext: Context = {
  auth: false,
  register: noop,
  login: noop,
  logout: noop,
}

export const AuthContext = createContext(defaultContext)

export default function() {
  return useContext(AuthContext)
}
