import { ShowRoleUseCase } from '@roles/usecases/show-role-usecases'
import { Request, Response } from 'express'
import { container } from 'tsyringe'

export class ShowRoleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const showRoleUseCase = container.resolve(ShowRoleUseCase)
    const { roleId } = request.params
    const role = await showRoleUseCase.execute({ roleId })

    return response.status(200).json(role)
  }
}
