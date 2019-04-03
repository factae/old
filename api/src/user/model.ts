import {Entity, Column, OneToMany} from 'typeorm'

import {Contract} from '../contract/model'
import {Client} from '../client/model'

export enum RateUnit {
  hour = 1,
  day = 2,
  service = 3,
}

@Entity()
export class User {
  @Column({primary: true, generated: true})
  id: number

  @OneToMany(() => Client, client => client.user)
  clients: Client[]

  @OneToMany(() => Contract, contract => contract.user)
  contracts: Contract[]

  @Column({unique: true})
  email: string

  @Column({default: false})
  emailConfirmed: boolean

  @Column()
  password: string

  @Column({nullable: true, default: null})
  firstName: string

  @Column({nullable: true, default: null})
  lastName: string

  @Column({nullable: true, default: null})
  tradingName: string

  @Column({nullable: true, default: null})
  address: string

  @Column({type: 'int', nullable: true, default: null})
  zip: number

  @Column({nullable: true, default: null})
  city: string

  @Column({nullable: true, default: null})
  phone: string

  @Column({nullable: true, default: null})
  rib: string

  @Column({nullable: true, default: null})
  iban: string

  @Column({nullable: true, default: null})
  bic: string

  @Column({nullable: true, default: null})
  siren: string

  @Column({nullable: true, default: null})
  rate: number

  @Column({type: 'tinyint', default: RateUnit.hour})
  rateUnit: RateUnit

  @Column({type: 'varchar', length: 36, nullable: true, default: null})
  token: string | null

  @Column({type: 'varchar', nullable: true, default: null})
  taxId: string | null

  @Column({type: 'tinyint', nullable: true, default: null})
  taxRate: number | null

  @Column({type: 'text', nullable: true, default: null})
  quotationConditions: string

  @Column({type: 'text', nullable: true, default: null})
  invoiceConditions: string | null
}
