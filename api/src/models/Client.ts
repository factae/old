import {Entity, Index, Column, ManyToOne, OneToMany} from 'typeorm'

import {User} from './User'
import {Quotation} from '../quotation/model'

@Entity()
@Index('user_email', ['user.id', 'email'], {unique: true})
export class Client {
  @Column({primary: true, generated: true})
  // @ts-ignore
  id: number

  @ManyToOne(() => User, user => user.id)
  // @ts-ignore
  user: User

  @OneToMany(() => Quotation, quotation => quotation.id)
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

  @Column()
  // @ts-ignore
  email: string

  @Column()
  // @ts-ignore
  phone: string

  @Column({nullable: true, default: null})
  // @ts-ignore
  tvaNumber?: string
}
