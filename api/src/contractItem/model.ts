import {Entity, Column, ManyToOne} from 'typeorm'

import {Contract} from '../contract/model'

@Entity()
export class ContractItem {
  @Column({primary: true, generated: true})
  id: number

  @Column()
  position: number

  @ManyToOne(() => Contract)
  contract: Contract

  @Column()
  description: string

  @Column({type: 'int', nullable: true, default: null})
  unitPrice: number | null

  @Column({type: 'int', nullable: true, default: null})
  quantity: number | null

  @Column({type: 'int', nullable: true, default: null})
  total: number | null
}
