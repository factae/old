import assign from 'lodash/assign'
import get from 'lodash/get'
import {DateTime} from 'luxon'

import {ContractItem} from '../contractItem/model'
import {User, RateUnit} from '../user/model'

// ------------------------------------------------------------------- # Types #

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

type ContractDynamicAttributes =
  | 'type'
  | 'taxRate'
  | 'rate'
  | 'rateUnit'
  | 'conditions'
  | 'createdAt'
  | 'startsAt'
  | 'endsAt'
  | 'expiresAt'

export interface Contract {
  id: number
  clientId: number
  type: 'quotation' | 'invoice'
  status: 'draft' | 'validated' | 'signed'
  items: ContractItem[]
  number: string
  conditions: string | null
  taxRate: number | null
  rate: number | null
  rateUnit: RateUnit
  total: number
  createdAt: DateTime
  expiresAt: DateTime
  startsAt: DateTime
  endsAt: DateTime
  validatedAt: DateTime | null
  signedAt: DateTime | null
}

export type EmptyContractParams = {
  user: User | null
  type: 'quotation' | 'invoice'
}

// ---------------------------------------------------------- # Empty contract #

const contract: Omit<Contract, ContractDynamicAttributes> = {
  id: -1,
  clientId: -1,
  status: 'draft',
  items: [],
  number: '',
  total: 0,
  validatedAt: null,
  signedAt: null,
}

export function emptyContract(params: EmptyContractParams): Contract {
  const {user, type} = params
  const now = DateTime.local()

  return {
    ...contract,
    type,
    taxRate: get(user, 'taxRate', null),
    rate: get(user, 'rate', null),
    rateUnit: get(user, 'rateUnit', RateUnit.hour),
    conditions: get(user, 'conditions', null),
    createdAt: now,
    expiresAt: now.plus({days: 60}),
    startsAt: now,
    endsAt: now,
  }
}
