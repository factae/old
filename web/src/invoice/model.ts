import get from 'lodash/get'

import {Contract, emptyContract} from '../contract/model'
import {User} from '../user/model'

export interface Invoice extends Contract {
  type: 'invoice'
  status: 'draft' | 'pending' | 'paid'
  number: string
  conditions: string | null
}

export function emptyInvoice(user: User | null): Invoice {
  return {
    ...emptyContract(user),
    type: 'invoice',
    status: 'draft',
    number: '-',
    conditions: get(user, 'invoiceConditions', null),
  }
}
