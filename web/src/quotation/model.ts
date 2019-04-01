import {DateTime} from 'luxon'

import {Contract, emptyContract} from '../contract/model'
import {User} from '../user/model'

export interface Quotation extends Contract {
  type: 'quotation'
  status: 'draft' | 'validated' | 'signed'
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
    expiresAt: now.plus({days: 60}),
    startsAt: now,
    endsAt: now,
  }
}
