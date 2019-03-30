import {Column, PrimaryGeneratedColumn, JoinColumn} from 'typeorm'
import {Entity, ManyToOne, OneToMany, RelationId} from 'typeorm'

import {Client} from '../client/model'
import {ContractItem} from '../contractItem/model'
import {User, RateUnit} from '../user/model'

@Entity()
export class Contract {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User)
  user: User

  @ManyToOne(() => Client, client => client.id, {onDelete: 'CASCADE'})
  @JoinColumn({name: 'clientId'})
  client: Client

  @RelationId((contract: Contract) => contract.client)
  clientId: number

  @Column({type: 'enum', enum: ['quotation', 'invoice']})
  type: 'quotation' | 'invoice'

  @Column({nullable: true, default: null})
  number?: string

  @Column({type: 'enum', enum: ['draft', 'validated', 'signed', 'paid']})
  status: 'draft' | 'validated' | 'signed' | 'paid'

  @OneToMany(() => ContractItem, item => item.contract)
  items: ContractItem[]

  @Column({nullable: true, default: null})
  conditions?: string

  @Column({nullable: true, default: null})
  taxRate?: number

  @Column({nullable: true, default: null})
  rate?: number

  @Column({type: 'tinyint', default: 0})
  rateUnit: RateUnit

  @Column()
  total: number

  @Column({type: 'datetime'})
  createdAt: string

  @Column({type: 'datetime'})
  startsAt: string

  @Column({type: 'datetime'})
  endsAt: string

  @Column({type: 'datetime', nullable: true, default: null})
  expiresAt?: string

  @Column({type: 'datetime', nullable: true, default: null})
  validatedAt?: string

  @Column({type: 'datetime', nullable: true, default: null})
  signedAt?: string
}
