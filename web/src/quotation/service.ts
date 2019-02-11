import omit from 'lodash/fp/omit'

import {get, post} from '../utils/axios'

import Quotation from './model'

// ---------------------------------------------------------------- # Read all #

export async function readAll() {
  const res = await get('/quotation')

  if (res.status !== 200) {
    throw new Error(res.statusText)
  }

  return <Quotation[]>res.data
}

// ------------------------------------------------------------------ # Create #

export async function create(quotation: Quotation) {
  const res = await post('/quotation', omit('id')(quotation))

  if (res.status !== 200) {
    throw new Error(res.statusText)
  }

  return <Quotation>res.data
}
