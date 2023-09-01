import { Request, Response } from 'express'
import { CreateRoleUseCase } from '@roles/usecases/create-role-usecase'

export class CreateRoleController {
  constructor(private createRoleUsecase: CreateRoleUseCase) {}

  handle(req: Request, res: Response): Response {
    const { name } = req.body
    const role = this.createRoleUsecase.execute({ name })
    return res.status(201).json(role)
  }
}
