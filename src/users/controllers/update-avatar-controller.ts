import { container } from 'tsyringe'
import { Request, Response } from 'express'
import { instanceToInstance } from 'class-transformer'
import { UpdateAvatarUseCase } from '@users/usecases/update-avatar-usecase'

export class UpdateAvatarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const updateAvatarUseCase = container.resolve(UpdateAvatarUseCase)
    const { name, email, password, isAdmin, roleId } = req.body
    console.log('valores-->', name, email, password, isAdmin, roleId)
    const user = await updateAvatarUseCase.execute({
      userId: req.user.id,
      avatarFileName: req.file.filename,
    })
    return res.json(instanceToInstance(user))
  }
}
