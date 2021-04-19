import swaggerJSDoc from 'swagger-jsdoc'

import { version } from '../../package.json'
import envVars from '../config/envVars'

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'NodeJS API Server Boilerplate',
      version,
      description: 'NodeJS API Server Boilerplate Documentation',
      license: {
        name: 'MIT',
        url:
          'https://github.com/frasnym/Express-API-TypeScript-Boilerplate/blob/main/LICENSE'
      }
    },
    servers: [
      {
        url: `http://localhost:${envVars.port}/v1`,
        description: 'Local server'
      }
    ]
  },
  apis: ['./src/docs/*.yaml', './src/routes/v1/*.ts']
}

export { options as swaggerJSDocOptions }
