import {Column, Entity, ManyToOne, OneToMany} from 'typeorm'

import {User} from '../user/model'
import {Document} from '../document/model'

@Entity()
export class Client {
  @Column({primary: true, generated: true})
  id: number

  @ManyToOne(() => User, user => user.id)
  user: User

  @OneToMany(() => Document, document => document.id)
  document: Document[]

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column({nullable: true, default: null})
  tradingName?: string

  @Column()
  address: string

  @Column()
  zip: string

  @Column()
  city: string

  @Column()
  country: string

  @Column()
  email: string

  @Column()
  phone: string

  @Column({type: 'varchar', length: 14, nullable: true, default: null})
  siret?: string
}
