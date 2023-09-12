import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm'
import { v4 as uuidv4 } from 'uuid'
import { Role } from '../../roles/entities/Role'

@Entity('user')
export class User {
  @PrimaryColumn()
  id?: string
  @Column()
  name: string
  @Column()
  email: string
  @Column()
  password: string
  @Column()
  isAdmin: boolean
  @Column()
  avatar?: string
  @ManyToOne(() => Role, {
    cascade: true,
  })
  role: Role

  @CreateDateColumn()
  createdAt: Date

  constructor() {
    if (!this.id) {
      this.id = uuidv4()
    }
  }
}
