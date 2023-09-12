import { Router } from 'express'
import { rolesRoute } from '@roles/http/routes/roles.routes'
import { usersRoute } from '@users/http/routes/user.routes'

const routes = Router()

routes.get('/', () => (req, res) => {
  return res.json({ message: 'Hello World' })
})

routes.use('/users', usersRoute)
routes.use('/roles', rolesRoute)

export { routes }
