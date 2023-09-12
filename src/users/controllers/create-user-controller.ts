import { Request, Response } from 'express'
import { CreateUserUseCase } from '@users/usecases/create-user-usecases'
import { container } from 'tsyringe'

export class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    console.log('esta entrando no controller')
    const createUserUseCase = container.resolve(CreateUserUseCase)
    console.log('pessou do resolve', createUserUseCase)
    const { name, email, password, isAdmin, roleId } = req.body
    console.log('valores-->', name, email, password, isAdmin, roleId)
    const user = await createUserUseCase.execute({
      name,
      email,
      password,
      isAdmin,
      roleId,
    })
    return res.status(201).json(user)
  }
}
