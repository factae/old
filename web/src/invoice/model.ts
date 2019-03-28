import {Contract, emptyContract} from '../contract/model'
import {User} from '../user/model'

export interface Invoice extends Contract {}

export function emptyInvoice(profile: User | null): Invoice {
  return emptyContract(profile)
}
