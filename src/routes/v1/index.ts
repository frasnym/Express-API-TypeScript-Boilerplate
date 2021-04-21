import { Router } from 'express'
import envVars from '../../config/envVars'
import { authRoute } from './auth-route'
import { docsRoute } from './docs-route'
import { userRoute } from './user-route'

const router = Router()

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute
  },
  {
    path: '/users',
    route: userRoute
  }
]

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute
  }
]

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route)
})

if (envVars.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route)
  })
}

export { router }
