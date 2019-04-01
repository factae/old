import get from 'lodash/get'
import {DateTime} from 'luxon'

import {ContractItem} from '../contractItem/model'
import {User, RateUnit} from '../user/model'

// ------------------------------------------------------------------- # Types #

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

type ContractDynamicAttributes =
  | 'rate'
  | 'rateUnit'
  | 'taxRate'
  | 'conditions'
  | 'createdAt'

export interface Contract {
  id: number
  clientId: number
  items: ContractItem[]
  conditions: string | null
  taxRate: number | null
  rate: number | null
  rateUnit: RateUnit
  total: number
  pdf: string | null
  createdAt: DateTime
  validatedAt: DateTime | null
}

export type EmptyContractParams = {
  user: User | null
  type: 'quotation' | 'invoice'
}

// ---------------------------------------------------------- # Empty contract #

const contract: Omit<Contract, ContractDynamicAttributes> = {
  id: -1,
  clientId: -1,
  items: [],
  total: 0,
  pdf: null,
  validatedAt: null,
}

export function emptyContract(user: User | null): Contract {
  const now = DateTime.local()

  return {
    ...contract,
    rate: get(user, 'rate', null),
    rateUnit: get(user, 'rateUnit', RateUnit.hour),
    taxRate: get(user, 'taxRate', null),
    conditions: get(user, 'conditions', null),
    createdAt: now,
  }
}
