import { DataSource } from 'typeorm'
import { CreateRolesTable1693590910882 } from './migrations/1693590910882-CreateRolesTable'
import { Role } from '@roles/entities/Role'

export const dataSource = new DataSource({
  type: 'sqlite',
  database: './db.sqlite',
  entities: [Role],
  migrations: [CreateRolesTable1693590910882],
})
