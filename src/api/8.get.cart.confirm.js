/**
 * [1] Get Cart
 * @route GET /cart/history
 * @group cart_shopping
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
      size: parseInt(req.query.pagesize) || 10
    }
    /* process */
    let carts = await saleOrderModel.getCartSuccess(pageInfo)
    if (carts.length > 0) {
      res.body = Conf.utils.outputBuilder(carts, carts.length, pageInfo)
    } else {
      throw new Error(`Cart not found`)
    }
    next()
  } catch (e) {
    next(e)
  }
}
module.exports = Blogic