const Conf = require('./config')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const expressRouterGen = require('express-route-by-jsdoc')
const cors = require('cors')
const app = express()

// Transform Clean Data
const cleanDataOrder = require('./src/transform-data/transform-clean-data')
// Transform Data Product list
const product = require('./src/transform-data/transform-product-list')


async function main() {
  app.set('case sensitive routing', true)

  app.use(bodyParser.json({
    limit: '1000kb'
  }))
  app.use(bodyParser.urlencoded({
    extended: false
  }))

  app.use(cookieParser())

  // Access-Control-Allow-Origin
  app.use(cors())

  // No-Cache
  app.use(function (req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate')
    res.header('Expires', '-1')
    res.header('Pragma', 'no-cache')
    next()
  })

  Conf.router.options.basedir = __dirname
  expressRouterGen(app, Conf.router.options)

  app.listen(3000, () => {})
}

main().then(o => {

  /* function for transform Clean */
  // clean_Data()

  /* function for transform product */
  // transform_product()


  console.log(
    '\x1b[31m%s\x1b[0m%s\x1b[31m%s\x1b[0m%s\x1b[31m%s\x1b[0m',
    Conf.package.name,
    ' Server ',
    Conf.project.env,
    ' started on port ..',
    Conf.project.port
  )
}).catch(e => {
  console.log('something  error')
  console.log(e)
})

process.once('unhandledRejection', error => {
  // Will print "unhandledRejection err is not defined"

  console.log('unhandledRejection', error.message)
  console.error(error)
  process.exit(0)
})

process.once('uncaughtException', error => {
  // Will print "unhandledRejection err is not defined"
  console.log('uncaughtException', error.message)
  console.error(error)

  process.exit(0)
})

async function clean_Data() {
  await cleanDataOrder.clean_data().then(o => {})
    .catch(e => {
      console.log(e)
    })
}


async function transform_product() {
  await product.transform_data().then(o => {})
    .catch(e => {
      console.log(e)
    })
}