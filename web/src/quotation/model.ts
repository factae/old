import assign from 'lodash/assign'
import {DateTime} from 'luxon'

import {Contract, emptyContract} from '../contract/model'
import {User} from '../user/model'

export interface Quotation extends Contract {
  expiresAt: DateTime
}

export function emptyQuotation(profile: User | null): Quotation {
  return assign(emptyContract(profile), {
    expiresAt: DateTime.local().plus({days: 60}),
  })
}
