const _ = require('lodash')

const _package = require('../package.json')

console.log('Current ENV : ' + process.env.NODE_ENV)

if (process.env.NODE_ENV === 'production') {
  console.log('Loading Production Config.')
  module.exports = require('./prod')
} else if (process.env.NODE_ENV === 'development') {
  console.log('Loading Development Config')
  module.exports = require('./dev')
} else {
  module.exports = require('./prod')
  console.log('Loading Production Config by Default')
}

module.exports.package = _package
// module.exports.project.version = _package.version || 'v1'
module.exports.utils = {
  _,
  outputBuilder (Rows = [], totalRecord = 1, paging = { size: 99999, page: 1 }) {
    try {
      const totalPage = (Math.round(totalRecord / paging.size))
      const showRecord = {
        qnty: Rows.length,
        first: ((Number(paging.page) - 1) * paging.size) + 1,
        last: ((Number(paging.page) - 1) * paging.size) + Rows.length
      }
      const returnner = {
        pageno: Number(paging.page),
        pageSize: Number(paging.size),
        totalPage: totalPage,
        totalRecord: totalRecord,
        isNextPage: Number(paging.page) < totalPage,
        showRecord: showRecord,
        itemList: Rows
      }
      return returnner
    } catch (e) { return e }
  }
}
