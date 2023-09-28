import { DataSource } from 'typeorm'
import { CreateRolesTable1693590910882 } from './migrations/1693590910882-CreateRolesTable'
import { Role } from '@roles/entities/Role'
import { CreateUsersTable1694023953433 } from './migrations/1694023953433-CreateUsersTable'
import { AddRoleIdToUsersTable1694175084285 } from './migrations/1694175084285-AddRoleIdToUsersTable'
import { User } from '@users/entities/User'
import { ChangeAvatarToIsNullnable1695044262908 } from './migrations/1695044262908-ChangeAvatarToIsNullnable'

export const dataSource = new DataSource({
  type: 'sqlite',
  database: './db.sqlite',
  entities: [Role, User],
  migrations: [
    CreateRolesTable1693590910882,
    CreateUsersTable1694023953433,
    AddRoleIdToUsersTable1694175084285,
    ChangeAvatarToIsNullnable1695044262908,
  ],
})
