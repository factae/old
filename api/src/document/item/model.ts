import {Entity, Column, ManyToOne} from 'typeorm'

import {Document} from '../model'

@Entity()
export class DocumentItem {
  @Column({primary: true, generated: true})
  id: number

  @Column()
  position: number

  @ManyToOne(() => Document, document => document.id, {onDelete: 'CASCADE'})
  document: Document

  @Column()
  description: string

  @Column({type: 'int', nullable: true, default: null})
  unitPrice: number | null

  @Column({type: 'int', nullable: true, default: null})
  quantity: number | null

  @Column({type: 'int', nullable: true, default: null})
  total: number | null
}
