import { Role } from '@roles/entities/Role'
import { RolesRepository } from '@roles/repositories/RolesRepository'
import { AppError } from '@shared/errors/AppError'

type CreateRoleDTO = {
  name: string
}

export class CreateRoleUseCase {
  constructor(private rolesRepository: RolesRepository) {}

  execute({ name }: CreateRoleDTO): Role {
    const checkRole = this.rolesRepository.findbyName(name)

    if (checkRole) {
      throw new AppError('Role already exists')
    }

    const role = this.rolesRepository.create({ name })
    return role
  }
}
