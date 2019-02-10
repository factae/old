import {DateTime} from 'luxon'

interface ContractItem {
  id: number
  quotationId: number | null
  invoiceId: number | null
  date: DateTime
  designation: string
  reference: string
  unitPrice: number
  quantity: number
  total: number
}

export default ContractItem
