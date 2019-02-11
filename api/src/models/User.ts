import {Entity, Column, OneToMany} from 'typeorm'

import {Quotation} from '../quotation/model'
import {Client} from './Client'

@Entity()
export class User {
  @Column({primary: true, generated: true})
  // @ts-ignore
  id: number

  @OneToMany(type => Client, client => client.user)
  // @ts-ignore
  clients: Client[]

  @OneToMany(type => Quotation, quotation => quotation.user)
  // @ts-ignore
  quotation: Quotation[]

  @Column({unique: true})
  // @ts-ignore
  email: string

  @Column()
  // @ts-ignore
  password: string

  @Column({nullable: true, default: null})
  // @ts-ignore
  firstName?: string

  @Column({nullable: true, default: null})
  // @ts-ignore
  lastName?: string

  @Column({nullable: true, default: null})
  // @ts-ignore
  address?: string

  @Column({type: 'int', nullable: true, default: null})
  // @ts-ignore
  zip?: number

  @Column({nullable: true, default: null})
  // @ts-ignore
  city?: string

  @Column({nullable: true, default: null})
  // @ts-ignore
  phone?: string

  @Column({nullable: true, default: null})
  // @ts-ignore
  tvaNumber?: string

  @Column({nullable: true, default: null})
  // @ts-ignore
  iban?: string

  @Column({nullable: true, default: null})
  // @ts-ignore
  siren?: string

  @Column({nullable: true, default: null})
  // @ts-ignore
  apeCode?: string
}
