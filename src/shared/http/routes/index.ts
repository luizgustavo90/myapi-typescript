import { Router } from 'express'
import { rolesRoute } from '@roles/http/routes/roles.routes'

const routes = Router()

routes.get('/', () => (req, res) => {
  return res.json({ message: 'Hello World' })
})

routes.use('/roles', rolesRoute)

export { routes }
