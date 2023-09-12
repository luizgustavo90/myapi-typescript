import { IRolesRepository } from '@roles/repositories/IRolesRepository'
import { AppError } from '@shared/errors/AppError'
import { Role } from '@roles/entities/Role'
import { inject, injectable } from 'tsyringe'

type UpdateRoleParams = {
  roleId: string
  name: string
}

@injectable()
export class UpdateRoleUseCase {
  constructor(
    @inject('RolesRepository') private rolesRepository: IRolesRepository,
  ) {}

  async execute({ roleId, name }: UpdateRoleParams): Promise<Role> {
    const role = await this.rolesRepository.findById(roleId)
    if (!role) {
      throw new AppError('role not found', 404)
    }
    const roleFoundByName = await this.rolesRepository.findByName(name)

    if (roleFoundByName) {
      throw new AppError('role already exists!', 404)
    }
    role.name = name
    return this.rolesRepository.save(role)
  }
}
