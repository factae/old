import {post} from './fetch'

// ------------------------------------------------------------------- # Login #

export async function login(email: string, password: string) {
  const res = await post('/login', {email, password})

  if (res.status !== 204) {
    throw new Error(res.statusText)
  }
}

// ---------------------------------------------------------------- # Register #

export async function register(email: string, password: string) {
  const res = await post('/register', {email, password})

  if (res.status !== 204) {
    throw new Error(res.statusText)
  }
}
