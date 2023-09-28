import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm'
import { v4 as uuidv4 } from 'uuid'
import { Role } from '../../roles/entities/Role'
import { Exclude, Expose } from 'class-transformer'

@Entity('users')
export class User {
  @PrimaryColumn()
  id?: string
  @Column()
  name: string
  @Column()
  email: string
  @Column()
  @Exclude()
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

  @Expose({ name: 'avatar_url' })
  getAvatarUrl(): string | null {
    if (!this.avatar) {
      return null
    }
    return `${process.env.AVATAR_URL}/${this.avatar}`
  }

  constructor() {
    if (!this.id) {
      this.id = uuidv4()
    }
  }
}
