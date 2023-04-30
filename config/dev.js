const _package = require('../package.json')
const mongoist = require('mongoist')
const mongoConnectOption = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

const host = 'localhost:3000'
const port = 3000
const env = process.env.NODE_ENV
const appPrefix = '/sales_order/api'
module.exports = {
  project: {
    host: host,
    port: port,
    env: env
  },
  db: {
    candidate: mongoist('mongodb://localhost:27017/sales_order', mongoConnectOption),
  },
  router: {
    options: {
      api: {
        jspath: '../feed/',
        postprocess: require('./middleware/api.output.hanndler')
      },
      docs: {
        url: appPrefix + '/docs',
        docs: appPrefix + '/api-docs.json'
      },
      route: {
        url: appPrefix + '/docs',
        docs: appPrefix + '/api-docs.json'
      },
      swaggerDefinition: {
        info: {
          description: 'API ',
          title: _package.name,
          version: _package.version
        },
        host: host,
        basePath: appPrefix,
        produces: [
          'application/json'
        ],
        schemes: ['http'],
        securityDefinitions: {
            bearerAuth: {
              type: 'apiKey',
              name: 'Bearer',
              scheme: 'bearer',
              in: 'header',
            },
          },
          security: [
            {
              bearerAuth: [],
            },
          ],
      },
      basedir: __dirname, // app absolute path
      files: ['./src/api/**/*.js',
        './src/feed/**/*.js'
      ] // Path to the API handle folder
    }
  }
}