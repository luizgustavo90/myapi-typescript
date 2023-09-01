import { ListRolesUseCase } from '@roles/usecases/list-roles-usecase'
import { Request, Response } from 'express'

export class ListRolesController {
  constructor(private listRolesUsecase: ListRolesUseCase) {}

  handle(req: Request, res: Response): Response {
    const roles = this.listRolesUsecase.execute()
    return res.json(roles)
  }
}
