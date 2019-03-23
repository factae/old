import assign from 'lodash/assign'
import get from 'lodash/get'
import {DateTime} from 'luxon'

import {ContractItem} from '../contractItem/model'
import {User, RateUnit} from '../user/model'

export interface Quotation {
  id: number
  clientId: number
  status: 'draft' | 'validated' | 'signed'
  items: ContractItem[]
  number: string
  conditions: string | null
  taxRate: number
  rate: number | null
  rateUnit: RateUnit
  total: number
  createdAt: DateTime
  expiresAt: DateTime
  startsAt: DateTime
  endsAt: DateTime
  validatedAt: DateTime | null
  signedAt: DateTime | null
}

const now = DateTime.local()
const quotation: Quotation = {
  id: -1,
  clientId: -1,
  status: 'draft',
  items: [],
  number: '',
  conditions: null,
  taxRate: 0,
  rate: null,
  rateUnit: RateUnit.hour,
  total: 0,
  createdAt: now,
  expiresAt: now,
  startsAt: now,
  endsAt: now,
  validatedAt: null,
  signedAt: null,
}

export function emptyQuotation(profile: User | null): Quotation {
  const now = DateTime.local()

  return assign(quotation, {
    taxRate: get(profile, 'taxRate', 0) || 0,
    rate: get(profile, 'rate', null),
    rateUnit: get(profile, 'rateUnit', RateUnit.hour),
    conditions: get(profile, 'conditions', null),
    createdAt: now,
    expiresAt: now.plus({days: 60}),
    startsAt: now,
    endsAt: now,
  })
}
