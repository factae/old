import {Dispatch, SetStateAction, createContext, useContext} from 'react'
import noop from 'lodash/noop'

import {User} from './model'

type State = User | null
type Context = [State, Dispatch<SetStateAction<State>>]

export const UserContext = createContext<Context>([null, noop])

export default function() {
  return useContext(UserContext)
}
