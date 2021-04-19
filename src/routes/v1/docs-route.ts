import { Router } from 'express'
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'
import { swaggerJSDocOptions } from '../../docs/swagger-options'

const router = Router()

const specs = swaggerJSDoc(swaggerJSDocOptions)

router.use('/', swaggerUI.serve)
router.get(
  '/',
  swaggerUI.setup(specs, {
    explorer: true
  })
)

export { router as docsRoute }
