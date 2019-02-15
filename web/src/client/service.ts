import omit from 'lodash/fp/omit'

import {Client} from './model'
import {get, post, put} from '../common/utils/axios'

// ---------------------------------------------------------------- # Read all #

export async function readAll() {
  const res = await get('/client')

  if (res.status !== 200) {
    throw new Error(res.statusText)
  }

  return <Client[]>res.data
}

// ------------------------------------------------------------------ # Create #

export async function create(client: Client) {
  const res = await post('/client', omit('id')(client))

  if (res.status !== 200) {
    throw new Error(res.statusText)
  }

  return <Client>res.data
}

// ------------------------------------------------------------------ # Update #

export async function update(client: Client) {
  const res = await put('/client', client)

  if (res.status !== 204) {
    throw new Error(res.statusText)
  }

  return client
}
