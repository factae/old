import {DateTime} from 'luxon'

import {ContractItem} from '../contractItem/model'

export interface Quotation {
  id: number
  userId: number
  clientId: number
  number: string
  deposit: number | null
  total: number
  taxRate: number
  items: ContractItem[]
  createdAt: DateTime
  expiresAt: DateTime
  signedAt: DateTime | null
}

export function emptyQuotation(): Quotation {
  return {
    id: -1,
    userId: -1,
    clientId: -1,
    number: '',
    deposit: 0,
    total: 0,
    taxRate: 0,
    items: [],
    createdAt: DateTime.local(),
    expiresAt: DateTime.local(),
    signedAt: null,
  }
}
