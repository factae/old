import {Column, PrimaryGeneratedColumn, JoinColumn} from 'typeorm'
import {Entity, Index, ManyToOne, OneToMany, RelationId} from 'typeorm'

import {User, RateUnit} from '../models/User'
import {Client} from '../models/Client'
import {ContractItem} from '../contractItem/model'

@Entity()
@Index('client_number', ['client.id', 'number'], {unique: true})
export class Invoice {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User)
  user: User

  @ManyToOne(() => Client, client => client.id, {onDelete: 'CASCADE'})
  @JoinColumn({name: 'clientId'})
  client: Client

  @RelationId((invoice: Invoice) => invoice.client)
  clientId: number

  @Column({type: 'enum', enum: ['draft', 'validated', 'signed']})
  status: 'draft' | 'validated' | 'signed'

  @OneToMany(() => ContractItem, item => item.invoice)
  items: ContractItem[]

  @Column()
  number: string

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
  expiresAt: string

  @Column({type: 'datetime'})
  startsAt: string

  @Column({type: 'datetime'})
  endsAt: string

  @Column({type: 'datetime', nullable: true, default: null})
  validatedAt?: string

  @Column({type: 'datetime', nullable: true, default: null})
  signedAt?: string
}
