import { User } from '@users/entities/User'
import { AppError } from '@shared/errors/AppError'
import { IUsersRepository } from '@users/repositories/IUsersRepository'
import path from 'node:path'
import { inject, injectable } from 'tsyringe'
import uploadConfig from '@config/upload'
import fs from 'node:fs'

type UpdateAvatarDTO = {
  userId: string
  avatarFileName: string
}

@injectable()
export class UpdateAvatarUseCase {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
  ) {}

  async execute({ avatarFileName, userId }: UpdateAvatarDTO): Promise<User> {
    console.log('esta entrando no usecase')
    const userIdExists = await this.usersRepository.findById(userId)
    if (!userIdExists) {
      throw new AppError('Only authenticated users can change avatar!', 401)
    }
    if (userIdExists.avatar) {
      const userAvatarFilePath = path.join(
        uploadConfig.directory,
        userIdExists.avatar,
      )
      const userAvatarFileExist = await fs.promises.stat(userAvatarFilePath)

      if (userAvatarFileExist) {
        await fs.promises.unlink(userAvatarFilePath)
      }

      userIdExists.avatar = avatarFileName

      return await this.usersRepository.save(userIdExists)
    }
  }
}
