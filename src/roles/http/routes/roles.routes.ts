import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import { CreateRoleController } from '@roles/controllers/create-role-controller'
import { container } from 'tsyringe'
import { ListRolesController } from '@roles/controllers/list-roles-controller'
import { ShowRoleController } from '@roles/controllers/show-role-controller'
import { UpdateRoleController } from '@roles/controllers/update-role-controller'
import { DeleteRoleController } from '@roles/controllers/delete-role-controller'
import { isAuthenticated } from '@shared/http/middlewares/isAuthenticated'

const rolesRoute = Router()

const createRoleController = container.resolve(CreateRoleController)
const listRolesController = container.resolve(ListRolesController)
const showRoleController = container.resolve(ShowRoleController)
const updateRoleController = container.resolve(UpdateRoleController)
const deleteRoleController = container.resolve(DeleteRoleController)

rolesRoute.use(isAuthenticated)

rolesRoute.post(
  '/',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
    }),
  }),
  (req, res) => {
    return createRoleController.handle(req, res)
  },
)

rolesRoute.get(
  '/',
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number(),
      limit: Joi.number(),
    }),
  }),
  (req, res) => {
    return listRolesController.handle(req, res)
  },
)

rolesRoute.get(
  '/:roleId',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      roleId: Joi.string().uuid().required,
    }),
  }),
  (req, res) => {
    return showRoleController.handle(req, res)
  },
)

rolesRoute.put(
  '/:roleId',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      roleId: Joi.string().uuid().required,
    }),
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required,
    }),
  }),
  (req, res) => {
    return updateRoleController.handle(req, res)
  },
)

rolesRoute.delete(
  '/:roleId',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      roleId: Joi.string().uuid().required,
    }),
  }),
  (req, res) => {
    return deleteRoleController.handle(req, res)
  },
)

export { rolesRoute }
