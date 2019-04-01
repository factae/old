import {Entity, Index, Column, ManyToOne, OneToMany} from 'typeorm'

import {User} from '../user/model'
import {Contract} from '../contract/model'

@Entity()
@Index('user_email', ['user.id', 'email'], {unique: true})
export class Client {
  @Column({primary: true, generated: true})
  id: number

  @ManyToOne(() => User, user => user.id)
  user: User

  @OneToMany(() => Contract, contract => contract.id)
  contract: Contract[]

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column({nullable: true, default: null})
  tradingName?: string

  @Column()
  address: string

  @Column()
  zip: number

  @Column()
  city: string

  @Column()
  email: string

  @Column()
  phone: string

  @Column({nullable: true, default: null})
  siren?: string
}
