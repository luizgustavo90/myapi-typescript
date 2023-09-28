import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import multer from 'multer'
import uploadConfig from '@config/upload'
import { container } from 'tsyringe'
import { CreateUserController } from '@users/controllers/create-user-controller'
import { ListUsersController } from '@users/controllers/list-users-controller'
import { CreateLoginController } from '@users/controllers/create-login-controller'
import { isAuthenticated } from '@shared/http/middlewares/isAuthenticated'
import { UpdateAvatarController } from '@users/controllers/update-avatar-controller'
import { ShowProfileController } from '@users/controllers/show-profile-controller'

const usersRoute = Router()
const createUserController = container.resolve(CreateUserController)
const listUsersController = container.resolve(ListUsersController)
const createLoginController = container.resolve(CreateLoginController)
const updateAvatarController = container.resolve(UpdateAvatarController)
const showProfileController = container.resolve(ShowProfileController)
const updateProfileController = container.resolve(UpdateAvatarController)
const upload = multer(uploadConfig)

usersRoute.post(
  '/',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      isAdmin: Joi.boolean().required(),
      roleId: Joi.string().uuid().required(),
    }),
  }),
  (req, res) => {
    return createUserController.handle(req, res)
  },
)

usersRoute.get(
  '/',
  isAuthenticated,
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number(),
      limit: Joi.number(),
    }),
  }),
  (req, res) => {
    return listUsersController.handle(req, res)
  },
)

usersRoute.post(
  '/login',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
  }),
  (req, res) => {
    return createLoginController.handle(req, res)
  },
)

usersRoute.patch(
  '/avatar',
  isAuthenticated,
  upload.single('avatar'),
  (req, res) => {
    return updateAvatarController.handle(req, res)
  },
)

usersRoute.get('/profile', isAuthenticated, (req, res) => {
  return showProfileController.handle(req, res)
})

usersRoute.put(
  '/profile',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string().optional(),
      password_confirmation: Joi.string()
        .valid(Joi.ref('password'))
        .when('passsword', {
          is: Joi.exist(),
          then: Joi.required,
        }),
    }),
  }),
  (req, res) => {
    return updateProfileController.handle(req, res)
  },
)

export { usersRoute }
