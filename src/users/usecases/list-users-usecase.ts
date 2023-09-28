import { inject, injectable } from 'tsyringe'
import {
  IUsersRepository,
  UsersPaginateProperties,
} from '@users/repositories/IUsersRepository'

type ListUsersUseCaseParams = {
  page: number
  limit: number
}

@injectable()
export class ListUsersUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    limit,
    page,
  }: ListUsersUseCaseParams): Promise<UsersPaginateProperties> {
    const take = limit
    const skip = (Number(page) - 1) * take
    const users = this.usersRepository.findAll({ page, skip, take })
    return users
  }
}
