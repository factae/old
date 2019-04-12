import {get, post, put} from '../common/utils/axios'

// ---------------------------------------------------------------- # Register #

export async function register(email: string) {
  const res = await post('/register', {email})

  if (res.status !== 204) {
    throw new Error(res.data)
  }
}

// ---------------------------------------------------------- # Reset password #

export async function reset(email: string) {
  const res = await put('/reset', {email})

  if (res.status !== 204) {
    throw new Error(res.data)
  }
}

// ------------------------------------------------------------ # Set password #

export async function password(token: string, password: string) {
  const res = await put('/password', {token, password})

  if (res.status !== 204) {
    throw new Error(res.data)
  }

  return true
}

// ------------------------------------------------------------------- # Check #

export async function check() {
  const res = await get('/check')
  return res.status === 204
}

// ------------------------------------------------------------------- # Login #

export async function login(email: string, password: string) {
  const res = await put('/login', {email, password})

  if (res.status !== 204) {
    throw new Error(res.data)
  }

  return true
}

// ------------------------------------------------------------------ # Logout #

export async function logout() {
  const res = await put('/logout')

  if (res.status !== 204) {
    throw new Error(res.data)
  }

  return false
}
