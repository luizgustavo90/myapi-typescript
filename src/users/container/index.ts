import { container } from 'tsyringe'
import { CreateUserController } from '@users/controllers/create-user-controller'
import { ListUsersController } from '@users/controllers/list-users-controller'
import { IUsersRepository } from '@users/repositories/IUsersRepository'
import { UsersRepository } from '@users/repositories/UsersRepository'
import { CreateLoginController } from '@users/controllers/create-login-controller'
import { UpdateAvatarController } from '@users/controllers/update-avatar-controller'
import { ShowProfileController } from '@users/controllers/show-profile-controller'
import { UpdateProfileController } from '@users/controllers/update-profile-controller'
import { IRefreshTokenRepository } from '@users/repositories/IRefreshTokenRepository'
import { RefreshTokenRepository } from '@users/repositories/RefreshTokenRepository'
import { CreateAccessAndRefreshTokenController } from '@users/controllers/create-refreshtoken-controller'
container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
)

container.registerSingleton<IRefreshTokenRepository>(
  'RefreshTokenRepository',
  RefreshTokenRepository,
)

container.registerSingleton('CreateUserController', CreateUserController)
container.registerSingleton('ListUsersController', ListUsersController)
container.registerSingleton('CreateLoginController', CreateLoginController)
container.registerSingleton('UpdateAvatarController', UpdateAvatarController)
container.registerSingleton('ShowProfileController', ShowProfileController)
container.registerSingleton('UpdateProfileController', UpdateProfileController)
container.registerSingleton(
  'CreateAccessAndRefreshTokenController',
  CreateAccessAndRefreshTokenController,
)
