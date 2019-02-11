import {Entity, Column, ManyToOne, OneToMany} from 'typeorm'

import {User} from './User'
import {Quotation} from '../quotation/model'

@Entity()
export class Client {
  @Column({primary: true, generated: true})
  // @ts-ignore
  id: number

  @ManyToOne(type => User, user => user.id)
  // @ts-ignore
  user: User

  @OneToMany(type => Quotation, quotation => quotation.client)
  // @ts-ignore
  quotation: Quotation[]

  @Column()
  // @ts-ignore
  firstName: string

  @Column()
  // @ts-ignore
  lastName: string

  @Column()
  // @ts-ignore
  address: string

  @Column()
  // @ts-ignore
  zip: number

  @Column()
  // @ts-ignore
  city: string

  @Column({unique: true})
  // @ts-ignore
  email: string

  @Column()
  // @ts-ignore
  phone: string

  @Column({nullable: true, default: null})
  // @ts-ignore
  tvaNumber?: string
}
