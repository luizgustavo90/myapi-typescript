import { Request, Response } from 'express'
import { CreateRoleUseCase } from '@roles/usecases/create-role-usecase'
import { container } from 'tsyringe'

export class CreateRoleController {
  async handle(req: Request, res: Response): Promise<Response> {
    const createRoleUsecase = container.resolve(CreateRoleUseCase)
    console.log('passou do resolve', createRoleUsecase)
    const { name } = req.body
    const role = await createRoleUsecase.execute({ name })
    return res.status(201).json(role)
  }
}
