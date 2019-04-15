import _ from 'lodash/fp'

import {User} from '../user/model'
import {Document, DocumentBase, emptyDocumentBase} from '../document/model'

export type Invoice = DocumentBase & {
  type: 'invoice'
  status: 'draft' | 'pending' | 'paid'
  conditions: string | null
}

export function isInvoice(document: Document): document is Invoice {
  return document.type === 'invoice'
}

export function emptyInvoice(user: User | null): Invoice {
  return {
    ...emptyDocumentBase(user),
    type: 'invoice',
    status: 'draft',
    conditions: _.getOr(null, 'invoiceConditions', user),
  }
}
