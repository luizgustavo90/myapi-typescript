import { RolesPaginateProperties } from '@roles/repositories/IRolesRepository'
import { inject, injectable } from 'tsyringe'
import { IRolesRepository } from '@roles/repositories/IRolesRepository'

type ListRolesUseCaseParams = {
  page: number
  limit: number
}

@injectable()
export class ListRolesUseCase {
  constructor(
    @inject('RolesRepository') private rolesRepository: IRolesRepository,
  ) {}

  async execute({
    limit,
    page,
  }: ListRolesUseCaseParams): Promise<RolesPaginateProperties> {
    const take = limit
    const skip = (Number(page) - 1) * take
    const roles = this.rolesRepository.findAll({ page, skip, take })
    return roles
  }
}
