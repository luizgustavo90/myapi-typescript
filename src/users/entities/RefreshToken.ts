import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

@Entity('refresh-tokens')
export class RefreshToken {
  @PrimaryColumn()
  id?: string
  @Column()
  token: string
  @Column()
  valid: boolean
  @Column()
  user_id: string
  @Column()
  expires: Date
  @CreateDateColumn()
  createdAt: Date

  constructor() {
    if (!this.id) {
      this.id = uuidv4()
    }
  }
}
