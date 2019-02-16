import omit from 'lodash/omit'

import {get, post} from '../common/utils/axios'

import {Quotation} from './model'

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
  const res = await post('/quotation', omit(quotation, 'id'))

  if (res.status !== 200) {
    throw new Error(res.statusText)
  }

  return <Quotation>res.data
}
