import { DeleteRoleUseCase } from '@roles/usecases/delete-role-usecase'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class DeleteRoleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const deleteRoleUseCase = container.resolve(DeleteRoleUseCase)
    const { roleId } = request.params
    const role = await deleteRoleUseCase.execute({ roleId })
    console.log(role)

    return response.status(200).json(role)
  }
}
