import assign from 'lodash/assign'
import omit from 'lodash/omit'
import {DateTime} from 'luxon'

import * as date from '../common/utils/date'
import {get, post, put} from '../common/utils/axios'
import {Invoice} from './model'

// ---------------------------------------------------------------- # Read all #

export async function readAll(): Promise<Invoice[]> {
  const res = await get('/invoice')

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

export async function create(invoice: Invoice) {
  invoice.type = 'invoice'
  invoice.createdAt = DateTime.local()

  const res = await post('/invoice', {
    ...omit(invoice, 'id'),
    createdAt: date.to(invoice.createdAt),
    deliveredAt: date.to(invoice.deliveredAt),
  })

  if (res.status !== 200) {
    throw new Error(res.statusText)
  }

  invoice.id = res.data.id
  invoice.number = res.data.number
  invoice.items = res.data.items
}

// ------------------------------------------------------------------ # Update #

export async function update(invoice: Invoice) {
  const res = await put('/invoice', {
    ...invoice,
    deliveredAt: date.to(invoice.deliveredAt),
  })

  if (res.status !== 200) {
    throw new Error(res.statusText)
  }

  invoice.number = res.data.number
  invoice.items = res.data.items
}
