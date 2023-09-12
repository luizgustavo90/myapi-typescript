import { CreateRoleController } from '@roles/controllers/create-role-controller'
import { ListRolesController } from '@roles/controllers/list-roles-controller'
import { ShowRoleController } from '@roles/controllers/show-role-controller'
import { UpdateRoleController } from '@roles/controllers/update-role-controller'
import { DeleteRoleController } from '@roles/controllers/delete-role-controller'
import { IRolesRepository } from '@roles/repositories/IRolesRepository'
import { RolesRepository } from '@roles/repositories/RolesRepository'
import { container } from 'tsyringe'

container.registerSingleton<IRolesRepository>(
  'RolesRepository',
  RolesRepository,
)

container.registerSingleton('CreateRoleController', CreateRoleController)
container.registerSingleton('ListRolesController', ListRolesController)
container.registerSingleton('ShowRoleController', ShowRoleController)
container.registerSingleton('UpdateRoleController', UpdateRoleController)
container.registerSingleton('DeleteRoleController', DeleteRoleController)
