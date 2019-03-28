import {Entity, Column, ManyToOne} from 'typeorm'

import {Quotation} from '../quotation/model'
import {Invoice} from '../invoice/model'

@Entity()
export class ContractItem {
  @Column({primary: true, generated: true})
  id: number

  @ManyToOne(() => Quotation)
  quotation: Quotation

  @ManyToOne(() => Invoice)
  invoice: Invoice

  @Column()
  description: string

  @Column()
  unitPrice: number

  @Column()
  quantity: number

  @Column()
  total: number
}
