import {post} from '../common/utils/axios'

// ---------------------------------------------------------------- # Register #

export async function register(email: string, password: string) {
  const res = await post('/register', {email, password})

  if (res.status !== 204) {
    throw new Error(res.data)
  }
}

// ------------------------------------------------------------------- # Login #

export async function login(email: string, password: string) {
  const res = await post('/login', {email, password})

  if (res.status !== 204) {
    throw new Error(res.data)
  }

  return true
}

// ------------------------------------------------------------------- # Check #

export async function check() {
  const res = await post('/check')
  return res.status === 204
}

// ------------------------------------------------------------------ # Logout #

export async function logout() {
  const res = await post('/logout')

  if (res.status !== 204) {
    throw new Error(res.data)
  }

  return false
}
