import {get, post} from '../common/utils/axios'

import * as date from '../common/utils/date'
import {User} from './model'

// -------------------------------------------------------------------- # Read #

export async function read(): Promise<User> {
  const res = await get('/user')

  if (res.status !== 200) {
    throw new Error(res.statusText)
  }

  return {
    ...res.data,
    premium: date.from(res.data.premium),
  }
}

// ------------------------------------------------------------------ # Update #

export async function update(profile: User) {
  const res = await post('/user', {
    ...profile,
    premium: date.to(profile.premium),
  })

  if (res.status !== 204) {
    throw new Error(res.statusText)
  }
}
