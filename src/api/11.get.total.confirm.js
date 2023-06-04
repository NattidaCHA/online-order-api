/**
 * [1] Get Total Product
 * @route GET /total_cart/success
 * @group cart_shopping
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

        let products = await saleOrderModel.getTotalCartSucces()
        let total = products.length ? products.length : 0
        res.body = {
            total: total
        }
        next()
    } catch (e) {
        next(e)
    }
}
module.exports = Blogic