/**
 * [1] Create New Candidate
 * @route GET /product
 * @group sales_order
 * @param {number} pageno.query: page nummber default ให้เป็น 1 -eg: 1,2,3
 * @param {number} pagesize.query: page size default ให้เป็น 10 -eg: 10,20,30
 * @returns {object} 200 - An object
 * @returns {Error}  default - Unexpected error
 * @returns {Error}  B50144 - Server error
 */


const Conf = require('../../config')
const saleOrderModel = require('../model/modelSaleOrder')
const {
  addComma
} = require('../utils/formatNumber')

async function Blogic(req, res, next) {
  try {

    let pageInfo = {
      page: parseInt(req.query.pageno) || 1,
      size: parseInt(req.query.pagesize) || 20
    }
    /* process */
    let products = await saleOrderModel.getProductlist(pageInfo)
    if (products.length > 0) {
      products.forEach(o => o.totalPc = addComma(o.totalPc))
      res.body = Conf.utils.outputBuilder(products, products.length, pageInfo)
    } else {
     
      throw new Error(`Product not found`)
    }
    next()
  } catch (e) {
    next(e)
  }
}
module.exports = Blogic