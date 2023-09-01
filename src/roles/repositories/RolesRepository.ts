import { Role } from '@roles/entities/Role'

import { dataSource } from '@shared/typeorm'
import { Repository } from 'typeorm'

type CreateRoleDTO = {
  name: string
}

export type PaginateParams = {
  page: number
  skip: number
  take: number
}

export type RolesPaginateProperties = {
  per_page: number
  total: number
  current_page: number
  data: Role[]
}

export class RolesRepository {
  private repository: Repository<Role>
  private static INSTANCE: RolesRepository

  private constructor() {
    this.repository = dataSource.getRepository(Role)
  }

  public static getInstance(): RolesRepository {
    if (!RolesRepository) {
      RolesRepository.INSTANCE = new RolesRepository()
    }
    return RolesRepository.INSTANCE
  }

  async create({ name }: CreateRoleDTO): Promise<Role> {
    const role = this.repository.create({ name })
    return role
  }
  async save(role: Role): Promise<Role> {
    const roleSaved = await this.repository.save(role)
    return roleSaved
  }

  async delete(role: Role): Promise<void> {
    await this.repository.remove(role)
  }

  async findbyName(name: string): Promise<Role | null> {
    const role = await this.repository.findOneBy({ name: name })
    return role
  }

  async findById(id): Promise<Role | null> {
    const role = await this.repository.findOneBy({ id })
    return role
  }

  async findAll({
    page,
    skip,
    take,
  }: PaginateParams): Promise<RolesPaginateProperties> {
    const [roles, count] = await this.repository
      .createQueryBuilder()
      .skip(skip)
      .take(take)
      .getManyAndCount()

    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: roles,
    }
    return result
  }
}
