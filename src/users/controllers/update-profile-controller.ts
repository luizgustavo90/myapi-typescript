import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { instanceToInstance } from 'class-transformer'
import { UpdateProfileUseCase } from '@users/usecases/update-profile-usecase'

export class UpdateProfileController {
  async handle(req: Request, res: Response): Promise<Response> {
    const updateProfileUseCase = container.resolve(UpdateProfileUseCase)
    const userId = req.user.id
    const { name, email, password, oldPassword } = req.body
    const user = await updateProfileUseCase.execute({
      userId,
      name,
      email,
      password,
      oldPassword,
    })
    return res.json(instanceToInstance(user))
  }
}
