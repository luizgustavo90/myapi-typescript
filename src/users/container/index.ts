import { container } from 'tsyringe'
import { CreateUserController } from '@users/controllers/create-user-controller'
import { ListUsersController } from '@users/controllers/list-users-controller'
import { IUsersRepository } from '@users/repositories/IUsersRepository'
import { UsersRepository } from '@users/repositories/UsersRepository'
import { CreateLoginController } from '@users/controllers/create-login-controller'
import { UpdateAvatarController } from '@users/controllers/update-avatar-controller'
import { ShowProfileController } from '@users/controllers/show-profile-controller'
import { UpdateProfileController } from '@users/controllers/update-profile-controller'

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
)

container.registerSingleton('CreateUserController', CreateUserController)
container.registerSingleton('ListUsersController', ListUsersController)
container.registerSingleton('CreateLoginController', CreateLoginController)
container.registerSingleton('UpdateAvatarController', UpdateAvatarController)
container.registerSingleton('ShowProfileController', ShowProfileController)
container.registerSingleton('UpdateProfileController', UpdateProfileController)
