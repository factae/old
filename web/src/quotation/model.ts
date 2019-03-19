import {DateTime} from 'luxon'

import {ContractItem} from '../contractItem/model'

export interface Quotation {
  id: number
  clientId: number
  number: string
  status: 'draft' | 'downloaded' | 'signed'
  deposit: number | null
  total: number
  taxRate: number
  items: ContractItem[]
  createdAt: DateTime
  expiresAt: DateTime
  downloadedAt: DateTime | null
  signedAt: DateTime | null
}

export const emptyQuotation: Quotation = {
  id: -1,
  clientId: -1,
  number: '',
  status: 'draft',
  deposit: 0,
  total: 0,
  taxRate: 0,
  items: [],
  createdAt: DateTime.local(),
  expiresAt: DateTime.local().plus({days: 60}),
  downloadedAt: null,
  signedAt: null,
}
