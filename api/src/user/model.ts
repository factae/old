import {Entity, Column, OneToMany} from 'typeorm'

import {Document} from '../document/model'
import {Client} from '../client/model'

export enum RateUnit {
  hour = 1,
  day = 2,
  service = 3,
}

export enum Activity {
  trade = 1,
  service = 2,
}

@Entity()
export class User {
  @Column({primary: true, generated: true})
  id: number

  @OneToMany(() => Client, client => client.user)
  clients: Client[]

  @OneToMany(() => Document, document => document.user)
  documents: Document[]

  @Column({unique: true})
  email: string

  @Column({type: 'varchar', nullable: true, default: null})
  password: string | null

  @Column({type: 'varchar', nullable: true, default: null})
  firstName: string | null

  @Column({type: 'varchar', nullable: true, default: null})
  lastName: string | null

  @Column({type: 'varchar', nullable: true, default: null})
  tradingName: string | null

  @Column({type: 'varchar', nullable: true, default: null})
  address: string | null

  @Column({type: 'varchar', nullable: true, default: null})
  zip: string | null

  @Column({type: 'varchar', nullable: true, default: null})
  city: string | null

  @Column({type: 'varchar', nullable: true, default: null})
  phone: string | null

  @Column({type: 'varchar', nullable: true, default: null})
  rib: string | null

  @Column({type: 'varchar', nullable: true, default: null})
  iban: string | null

  @Column({type: 'varchar', nullable: true, default: null})
  bic: string | null

  @Column({type: 'varchar', nullable: true, default: null})
  siren: string | null

  @Column({type: 'int', nullable: true, default: null})
  rate: number | null

  @Column({type: 'tinyint', nullable: true, default: null})
  rateUnit: RateUnit | null

  @Column({type: 'tinyint', nullable: true, default: null})
  activity: Activity | null

  @Column({type: 'varchar', length: 36, nullable: true, default: null})
  token: string | null

  @Column({type: 'varchar', nullable: true, default: null})
  taxId: string | null

  @Column({type: 'tinyint', nullable: true, default: null})
  taxRate: number | null

  @Column({default: false})
  documentAutoSend: boolean

  @Column({type: 'text', nullable: true, default: null})
  quotationConditions: string | null

  @Column({type: 'text', nullable: true, default: null})
  invoiceConditions: string | null

  @Column({default: false})
  active: boolean

  @Column({type: 'datetime', nullable: true, default: null})
  expiresAt: string | null

  @Column({type: 'tinyint', default: 0})
  step: number

  @Column({type: 'boolean', default: false})
  ready: boolean
}
