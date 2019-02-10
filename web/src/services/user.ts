import {get, post} from './fetch'

import User from '../models/User'

// -------------------------------------------------------------------- # Read #

export async function read() {
  const res = await get('/user')

  if (res.status !== 200) {
    throw new Error(res.statusText)
  }

  return <User>res.data
}

// ------------------------------------------------------------------ # Update #

export async function update(profile: Partial<User>) {
  const res = await post('/user', profile)

  if (res.status !== 204) {
    throw new Error(res.statusText)
  }
}
