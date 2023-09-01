import { RolesRepository } from '@roles/repositories/RolesRepository'
import { CreateRoleUseCase } from './create-role-usecase'
import { CreateRoleController } from '@roles/controllers/create-role-controller'
import { ListRolesController } from '@roles/controllers/list-roles-controller'
import { ListRolesUseCase } from './list-roles-usecase'

const rolesRepository = RolesRepository.getInstance()

const createRoleUsecase = new CreateRoleUseCase(rolesRepository)
export const createRoleController = new CreateRoleController(createRoleUsecase)

const listRolesUsecase = new ListRolesUseCase(rolesRepository)
export const listRolesController = new ListRolesController(listRolesUsecase)
