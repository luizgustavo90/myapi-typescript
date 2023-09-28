import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { instanceToInstance } from 'class-transformer'
import { ShowProfileUseCase } from '@users/usecases/show-profile-usecase'

export class ShowProfileController {
  async handle(req: Request, res: Response): Promise<Response> {
    const showProfileUseCase = container.resolve(ShowProfileUseCase)
    const userId = req.user.id
    const user = await showProfileUseCase.execute({
      userId,
    })
    return res.json(instanceToInstance(user))
  }
}
