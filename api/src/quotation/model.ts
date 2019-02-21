import {Column, PrimaryGeneratedColumn, JoinColumn} from 'typeorm'
import {Entity, ManyToOne, OneToMany, RelationId} from 'typeorm'
import {DateTime} from 'luxon'

import {User} from '../models/User'
import {Client} from '../models/Client'
import {ContractItem} from '../contractItem/model'

@Entity()
export class Quotation {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User)
  user: User

  @ManyToOne(() => Client, client => client.id, {onDelete: 'CASCADE'})
  @JoinColumn({name: 'clientId'})
  client: Client

  @RelationId((quotation: Quotation) => quotation.client)
  clientId: number

  @Column({unique: true})
  number: string

  @Column({type: 'enum', enum: ['draft', 'sent', 'signed']})
  status: 'draft' | 'sent' | 'signed'

  @OneToMany(() => ContractItem, item => item.quotation)
  items: ContractItem[]

  @Column({default: 0})
  deposit: number

  @Column()
  total: number

  @Column({default: 0})
  taxRate: number

  @Column({type: 'datetime'})
  createdAt: DateTime

  @Column({type: 'datetime'})
  expiresAt: DateTime

  @Column({type: 'datetime', nullable: true, default: null})
  sentAt: DateTime | null

  @Column({type: 'datetime', nullable: true, default: null})
  signedAt: DateTime | null
}
