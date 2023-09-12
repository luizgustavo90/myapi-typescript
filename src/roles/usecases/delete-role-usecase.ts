import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'
import { IRolesRepository } from '@roles/repositories/IRolesRepository'

type DeleteRoleParams = {
  roleId: string
}

type DeleteMessage = {
  message: string
}

@injectable()
export class DeleteRoleUseCase {
  constructor(
    @inject('RolesRepository') private rolesRepository: IRolesRepository,
  ) {}

  async execute({ roleId }: DeleteRoleParams): Promise<DeleteMessage> {
    const role = await this.rolesRepository.findById(roleId)
    if (!role) {
      throw new AppError('role not found', 404)
    }
    await this.rolesRepository.delete(role)
    const returnMessage: DeleteMessage = {
      message: 'Role Deleted!',
    }

    return returnMessage
  }
}
