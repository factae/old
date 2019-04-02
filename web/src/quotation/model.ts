import get from 'lodash/get'
import {DateTime} from 'luxon'

import {Contract, emptyContract} from '../contract/model'
import {User, RateUnit} from '../user/model'

export interface Quotation extends Contract {
  type: 'quotation'
  status: 'draft' | 'validated' | 'signed'
  conditions: string | null
  rate: number | null
  rateUnit: RateUnit
  expiresAt: DateTime
  startsAt: DateTime
  endsAt: DateTime
}

export function emptyQuotation(user: User | null): Quotation {
  const now = DateTime.local()

  return {
    ...emptyContract(user),
    type: 'quotation',
    status: 'draft',
    conditions: get(user, 'quotationConditions', null),
    rate: get(user, 'rate', null),
    rateUnit: get(user, 'rateUnit', RateUnit.hour),
    expiresAt: now.plus({days: 60}),
    startsAt: now,
    endsAt: now,
  }
}
