import assign from 'lodash/assign'
import omit from 'lodash/omit'

import * as date from '../common/utils/date'
import {get, post, put} from '../common/utils/axios'
import {Quotation} from './model'

// ---------------------------------------------------------------- # Read all #

export async function readAll(): Promise<Quotation[]> {
  const res = await get('/quotation')

  if (res.status !== 200) {
    throw new Error(res.statusText)
  }

  return res.data.map((data: any) =>
    assign(data, {
      ...data,
      createdAt: date.from(data.createdAt),
      expiresAt: date.from(data.expiresAt),
      startsAt: date.from(data.startsAt),
      endsAt: date.from(data.endsAt),
    }),
  )
}

// ------------------------------------------------------------------ # Create #

export async function create(quotation: Quotation) {
  quotation.type = 'quotation'

  const res = await post('/quotation', {
    ...omit(quotation, 'id'),
    expiresAt: date.to(quotation.expiresAt),
    startsAt: date.to(quotation.startsAt),
    endsAt: date.to(quotation.endsAt),
  })

  if (res.status !== 200) {
    throw new Error(res.statusText)
  }

  quotation.id = res.data.id
  quotation.items = res.data.items
}

// ------------------------------------------------------------------ # Update #

export async function update(quotation: Quotation) {
  const res = await put('/quotation', {
    ...quotation,
    createdAt: date.to(quotation.createdAt),
    expiresAt: date.to(quotation.expiresAt),
    startsAt: date.to(quotation.startsAt),
    endsAt: date.to(quotation.endsAt),
  })

  if (res.status !== 200) {
    throw new Error(res.statusText)
  }

  quotation.createdAt = date.from(res.data.createdAt)
  quotation.items = res.data.items
}
