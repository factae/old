import {Entity, Column, ManyToOne} from 'typeorm'

import {Quotation} from '../quotation/model'

@Entity()
export class ContractItem {
  @Column({primary: true, generated: true})
  // @ts-ignore
  id: number

  @ManyToOne(() => Quotation)
  // @ts-ignore
  quotation: Quotation

  @Column()
  // @ts-ignore
  description: string

  @Column()
  // @ts-ignore
  unitPrice: number

  @Column()
  // @ts-ignore
  quantity: number

  @Column()
  // @ts-ignore
  total: number
}
