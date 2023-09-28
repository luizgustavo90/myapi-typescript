import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { instanceToInstance } from 'class-transformer'
import { CreateLoginUseCase } from '@users/usecases/create-login-usecase'

export class CreateLoginController {
  async handle(req: Request, res: Response): Promise<Response> {
    const createLoginUseCase = container.resolve(CreateLoginUseCase)
    const { email, password } = req.body
    const { user, token } = await createLoginUseCase.execute({
      email,
      password,
    })
    return res.status(201).json(instanceToInstance({ user, token }))
  }
}
