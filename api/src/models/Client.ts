import {Entity, Column, ManyToOne, PrimaryGeneratedColumn} from 'typeorm'
import {User} from './User'

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  // @ts-ignore
  id: number

  @ManyToOne(type => User, user => user.id)
  // @ts-ignore
  user: User

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
