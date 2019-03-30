import {Contract, EmptyContractParams, emptyContract} from '../contract/model'

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>
type EmptyInvoiceParams = Omit<EmptyContractParams, 'type'>

export interface Invoice extends Contract {
  number: string | null
}

export function emptyInvoice(params: EmptyInvoiceParams): Invoice {
  return {
    ...emptyContract({...params, type: 'invoice'}),
    number: null,
  }
}
