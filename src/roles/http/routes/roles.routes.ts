import { createRoleController, listRolesController } from '@roles/usecases'
import { Router } from 'express'

const rolesRoute = Router()

rolesRoute.post('/', (req, res) => {
  return createRoleController.handle(req, res)
})

rolesRoute.get('/', (req, res) => {
  return listRolesController.handle(req, res)
})

export { rolesRoute }
