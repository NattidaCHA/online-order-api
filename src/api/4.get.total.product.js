/**
 * [1] Get Total Product
 * @route GET /total_product
 * @group sales_order
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

        let products = await saleOrderModel.getTotalProduct()
        let total = products.length ? products.length : '0'
        res.body = {
            total: addComma(total)
        }
        next()
    } catch (e) {
        next(e)
    }
}
module.exports = Blogic