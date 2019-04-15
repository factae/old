import _ from 'lodash/fp'

import {User} from '../user/model'
import {Document, DocumentBase, emptyDocumentBase} from '../document/model'

export type Credit = DocumentBase & {
  type: 'credit'
  status: 'draft' | 'pending' | 'paid'
  invoiceNumber: string
  conditions: string | null
}

export function isCredit(document: Document): document is Credit {
  return document.type === 'credit'
}

export function emptyCredit(user: User | null): Credit {
  return {
    ...emptyDocumentBase(user),
    type: 'credit',
    status: 'draft',
    invoiceNumber: '',
    conditions: _.getOr(null, 'invoiceConditions', user),
  }
}
