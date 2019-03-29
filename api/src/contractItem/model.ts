import {Entity, Column, ManyToOne} from 'typeorm'

import {Contract} from '../contract/model'

@Entity()
export class ContractItem {
  @Column({primary: true, generated: true})
  id: number

  @ManyToOne(() => Contract)
  contract: Contract

  @Column()
  description: string

  @Column()
  unitPrice: number

  @Column()
  quantity: number

  @Column()
  total: number
}
