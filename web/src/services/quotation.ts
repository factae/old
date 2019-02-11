import isNil from 'lodash/fp/isNil'
import omit from 'lodash/fp/omit'

import {get, post} from './fetch'

import Quotation from '../models/Quotation'

interface Cache {
  quotations?: Quotation[]
}

const cache: Cache = {}

// ---------------------------------------------------------------- # Read all #

export async function readAll() {
  if (!isNil(cache.quotations)) {
    return cache.quotations
  }

  const res = await get('/quotation')

  if (res.status !== 200) {
    throw new Error(res.statusText)
  }

  const quotations = <Quotation[]>res.data
  cache.quotations = quotations

  return quotations
}

// ------------------------------------------------------------------ # Create #

export async function create(quotation: Quotation) {
  const res = await post('/quotation', omit('id')(quotation))

  if (res.status !== 200) {
    throw new Error(res.statusText)
  }

  return <Quotation>res.data
}
