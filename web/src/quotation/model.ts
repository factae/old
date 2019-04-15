import _ from 'lodash/fp'
import {DateTime} from 'luxon'

import {User, RateUnit} from '../user/model'
import {Document, DocumentBase, emptyDocumentBase} from '../document/model'

export type Quotation = DocumentBase & {
  type: 'quotation'
  status: 'draft' | 'pending' | 'signed'
  conditions: string | null
  rate: number | null
  rateUnit: RateUnit | null
  expiresAt: string
  startsAt: string
  endsAt: string
}

export function isQuotation(document: Document): document is Quotation {
  return document.type === 'quotation'
}

export function emptyQuotation(user: User | null): Quotation {
  const now = DateTime.local()

  return {
    ...emptyDocumentBase(user),
    type: 'quotation',
    status: 'draft',
    conditions: _.getOr(null, 'quotationConditions', user),
    rate: _.getOr(null, 'rate', user),
    rateUnit: _.getOr(null, 'rateUnit', user),
    expiresAt: now.plus({days: 60}).toISO(),
    startsAt: now.toISO(),
    endsAt: now.toISO(),
  }
}
