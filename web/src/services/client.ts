import isNil from 'lodash/fp/isNil'
import omit from 'lodash/fp/omit'

import {get, post, put} from './fetch'

import Client from '../models/Client'

interface Cache {
  clients?: Client[]
}

const cache: Cache = {}

// ---------------------------------------------------------------- # Read all #

export async function readAll() {
  if (!isNil(cache.clients)) {
    return cache.clients
  }

  const res = await get('/client')

  if (res.status !== 200) {
    throw new Error(res.statusText)
  }

  const clients = <Client[]>res.data
  cache.clients = clients

  return clients
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
