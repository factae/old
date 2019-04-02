import get from 'lodash/get'
import {DateTime} from 'luxon'

import {Contract, emptyContract} from '../contract/model'
import {User} from '../user/model'

export interface Invoice extends Contract {
  type: 'invoice'
  status: 'draft' | 'validated' | 'paid'
  number: string
  conditions: string | null
  deliveredAt: DateTime
}

export function emptyInvoice(user: User | null): Invoice {
  return {
    ...emptyContract(user),
    type: 'invoice',
    status: 'draft',
    number: '-',
    conditions: get(user, 'invoiceConditions', null),
    deliveredAt: DateTime.local(),
  }
}
