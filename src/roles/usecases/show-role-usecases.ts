import { IRolesRepository } from '@roles/repositories/IRolesRepository'
import { AppError } from '@shared/errors/AppError'
import { Role } from '@roles/entities/Role'
import { injectable, inject } from 'tsyringe'

type ShowRoleParams = {
  roleId: string
}

@injectable()
export class ShowRoleUseCase {
  constructor(
    @inject('RolesRepository') private rolesRepository: IRolesRepository,
  ) {}

  async execute({ roleId }: ShowRoleParams): Promise<Role> {
    const role = await this.rolesRepository.findById(roleId)
    if (!role) {
      throw new AppError('role not found', 404)
    }
    return role
  }
}
