import {Column, PrimaryGeneratedColumn, JoinColumn} from 'typeorm'
import {Entity, ManyToOne, OneToMany, RelationId} from 'typeorm'

import {Client} from '../client/model'
import {User, RateUnit} from '../user/model'
import {DocumentItem} from './item/model'

@Entity()
export class Document {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User, user => user.id)
  @JoinColumn({name: 'userId'})
  user: User

  @RelationId((document: Document) => document.client)
  userId: number

  @ManyToOne(() => Client, client => client.id, {onDelete: 'CASCADE'})
  @JoinColumn({name: 'clientId'})
  client: Client

  @RelationId((document: Document) => document.client)
  clientId: number

  @Column({type: 'enum', enum: ['quotation', 'invoice', 'credit']})
  type: 'quotation' | 'invoice' | 'credit'

  @Column({type: 'varchar', nullable: true, default: null})
  number: string | null

  @Column({type: 'varchar', nullable: true, default: null})
  invoiceNumber: string | null

  @Column({
    type: 'enum',
    enum: ['draft', 'pending', 'signed', 'paid'],
    default: 'draft',
  })
  status: 'draft' | 'pending' | 'signed' | 'paid'

  @OneToMany(() => DocumentItem, item => item.document)
  items: DocumentItem[]

  @Column({type: 'text', nullable: true, default: null})
  conditions: string | null

  @Column({type: 'tinyint', nullable: true, default: null})
  taxRate: number | null

  @Column({type: 'int', nullable: true, default: null})
  rate: number | null

  @Column({type: 'tinyint', nullable: true, default: null})
  rateUnit: RateUnit | null

  @Column({type: 'int', nullable: true, default: null})
  total: number | null

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
}
