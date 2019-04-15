import _ from 'lodash/fp'

import {User} from '../user/model'
import {Quotation} from '../quotation/model'
import {Invoice} from '../invoice/model'
import {Credit} from '../credit/model'
import {DocumentItem} from './item/model'

export type Document = Quotation | Invoice | Credit
export type DocumentType = 'quotation' | 'invoice' | 'credit'
export type DocumentBase = {
  id: number
  clientId: number
  number: string
  items: DocumentItem[]
  taxRate: number | null
  total: number
  pdf: string | null
  createdAt: string | null
  validatedAt: string | null
}

export function emptyDocumentBase(user: User | null): DocumentBase {
  return {
    id: -1,
    clientId: -1,
    number: '-',
    items: [],
    total: 0,
    pdf: null,
    createdAt: null,
    validatedAt: null,
    taxRate: _.getOr(null, 'taxRate', user),
  }
}
