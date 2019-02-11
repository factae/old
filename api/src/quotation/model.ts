import {Entity, Column, ManyToOne} from 'typeorm'

import {User} from '../models/User'
import {Client} from '../models/Client'

@Entity()
export class Quotation {
  @Column({primary: true, generated: true})
  // @ts-ignore
  id: number

  @ManyToOne(type => User, user => user.id)
  // @ts-ignore
  user: User

  @ManyToOne(type => Client, client => client.id)
  // @ts-ignore
  client: Client

  @Column({unique: true})
  // @ts-ignore
  number: string

  @Column({default: 0})
  // @ts-ignore
  deposit: number

  @Column()
  // @ts-ignore
  total: number

  @Column({default: 0})
  // @ts-ignore
  taxRate: number

  /*   @Column() */
  /*   // @ts-ignore */
  /*   createdAt: DateTime */

  /*   @Column() */
  /*   // @ts-ignore */
  /*   expiresAt: DateTime */

  /*   @Column() */
  /*   // @ts-ignore */
  /*   signedAt: DateTime */
}
