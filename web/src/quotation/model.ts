import {DateTime} from 'luxon'

import {Contract, EmptyContractParams, emptyContract} from '../contract/model'

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>
type EmptyQuotationParams = Omit<EmptyContractParams, 'type'>

export interface Quotation extends Contract {
  expiresAt: DateTime
}

export function emptyQuotation(params: EmptyQuotationParams): Quotation {
  return {
    ...emptyContract({...params, type: 'quotation'}),
    expiresAt: DateTime.local().plus({days: 60}),
  }
}
