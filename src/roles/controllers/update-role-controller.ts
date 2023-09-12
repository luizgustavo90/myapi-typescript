import { UpdateRoleUseCase } from '@roles/usecases/update-role-usecase.ts'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class UpdateRoleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const updateRolesUseCase = container.resolve(UpdateRoleUseCase)
    const { roleId } = request.params
    const name = request.body.name
    const role = await updateRolesUseCase.execute({ roleId, name })

    return response.status(200).json(role)
  }
}
