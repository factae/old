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

  async function register(email: string) {
    await $auth.register(email)
  }

  async function reset(email: string) {
    await $auth.reset(email)
  }

  async function password(token: string, password: string) {
    setAuth(await $auth.password(token, password))
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
    <AuthContext.Provider
      value={{auth, register, reset, password, login, logout}}
    >
      {children}
    </AuthContext.Provider>
  )
}
