/* interface ContractItem { */
/*   id: number */
/*   quotationId: number | null */
/*   invoiceId: number | null */
/*   date: DateTime */
/*   designation: string */
/*   reference: string */
/*   unitPrice: number */
/*   quantity: number */
/*   total: number */
/* } */

export interface ContractItem {
  description: string
  unitPrice: number
  quantity: number
  total: number
}

export function emptyContractItem(): ContractItem {
  return {
    description: '',
    unitPrice: 0,
    quantity: 0,
    total: 0,
  }
}
