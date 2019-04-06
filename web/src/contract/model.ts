import get from 'lodash/get'
import {DateTime} from 'luxon'

import {ContractItem} from '../contractItem/model'
import {User} from '../user/model'

// ------------------------------------------------------------------- # Types #

type Omit<T, K> = Pick<T, Exclude<keyof T, K>>

export interface Contract {
  id: number
  clientId: number
  items: ContractItem[]
  taxRate: number | null
  total: number
  pdf: string | null
  createdAt: DateTime | null
  validatedAt: DateTime | null
}

// ---------------------------------------------------------- # Empty contract #

const contract: Omit<Contract, 'taxRate'> = {
  id: -1,
  clientId: -1,
  items: [],
  total: 0,
  pdf: null,
  createdAt: null,
  validatedAt: null,
}

export function emptyContract(user: User | null): Contract {
  return {
    ...contract,
    taxRate: get(user, 'taxRate', null),
  }
}
