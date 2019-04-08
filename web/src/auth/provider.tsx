import React, {ReactNode, useEffect, useState} from 'react'

import {AuthContext} from './context'
import * as $auth from './service'

type Props = {
  children: ReactNode
}

export default function({children}: Props) {
  const [auth, setAuth] = useState<boolean | null>(null)

  async function check() {
    try {
      setAuth(await $auth.check())
    } catch (error) {
      setAuth(false)
    }
  }

  async function register(email: string, password: string) {
    await $auth.register(email, password)
  }

  async function login(email: string, password: string) {
    setAuth(await $auth.login(email, password))
  }

  async function logout() {
    setAuth(await $auth.logout())
  }

  useEffect(() => {
    check()
  }, [])

  return (
    <AuthContext.Provider value={{auth, register, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}
