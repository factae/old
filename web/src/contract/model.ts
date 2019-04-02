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
  createdAt: DateTime
  validatedAt: DateTime | null
}

// ---------------------------------------------------------- # Empty contract #

const contract: Omit<Contract, 'taxRate' | 'createdAt'> = {
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
    taxRate: get(user, 'taxRate', null),
    createdAt: now,
  }
}
