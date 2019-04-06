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

  @Column({type: 'varchar', length: 16, nullable: true, default: null})
  number: string | null

  @Column({type: 'enum', enum: ['draft', 'validated', 'signed', 'paid']})
  status: 'draft' | 'validated' | 'signed' | 'paid'

  @OneToMany(() => ContractItem, item => item.contract)
  items: ContractItem[]

  @Column({type: 'text', nullable: true, default: null})
  conditions: string | null

  @Column({type: 'tinyint', nullable: true, default: null})
  taxRate: number | null

  @Column({type: 'int', nullable: true, default: null})
  rate: number | null

  @Column({type: 'tinyint', default: 0})
  rateUnit: RateUnit

  @Column()
  total: number

  @Column({type: 'text', nullable: true, default: null})
  pdf: string | null

  @Column({type: 'datetime', nullable: true, default: null})
  createdAt: string | null

  @Column({type: 'datetime', nullable: true, default: null})
  startsAt: string | null

  @Column({type: 'datetime', nullable: true, default: null})
  endsAt: string | null

  @Column({type: 'datetime', nullable: true, default: null})
  expiresAt: string | null

  @Column({type: 'datetime', nullable: true, default: null})
  validatedAt: string | null

  @Column({type: 'datetime', nullable: true, default: null})
  signedAt: string | null

  @Column({type: 'datetime', nullable: true, default: null})
  deliveredAt: string | null
}
