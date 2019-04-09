import React, {ReactNode, useEffect, useState} from 'react'

import useAuthContext from '../auth/context'
import {User} from './model'
import {UserContext} from './context'
import * as $user from './service'

type Props = {
  children: ReactNode
}

export default function(props: Props) {
  const {auth} = useAuthContext()
  const [user, setUser] = useState<User | null>(null)

  async function fetchUser() {
    if (!auth) return

    try {
      setUser(await $user.read())
    } catch (error) {
      console.error(error.response.data)
    }
  }

  useEffect(() => {
    fetchUser()
  }, [auth])

  return (
    <UserContext.Provider value={[user, setUser]}>
      {props.children}
    </UserContext.Provider>
  )
}
