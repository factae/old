import React, {ReactNode, useEffect, useState} from 'react'

import {User} from './model'
import {UserContext} from './context'
import * as $user from './service'

type Props = {
  children: ReactNode
}

export default function({children}: Props) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    $user.read().then(setUser)
  }, [])

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  )
}
