/**
 * [1] Get cart pending
 * @route GET /cart/pending
 * @group cart_shopping
 * @returns {object} 200 - An array list of updated status of selected candidate
 * @returns {Error}  default - Unexpected error
 * @returns {Error}  B50144 - Server error
 */

const Conf = require('../../config')
const {
  addComma
} = require('../utils/formatNumber')
const saleOrder = require('../model/modelSaleOrder')

async function Blogic(req, res, next) {
  try {

    /* process */
    let getCart = await saleOrder.getCart()
    if (getCart) {
        res.body = getCart
    } else {
      throw new Error(`Cart not found`)
    }
    next()
  } catch (e) {
    next(e)
  }
}

module.exports = Blogic