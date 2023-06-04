/**
 * [1] Create cart
 * @route PUT /update/cart/{cart_id}
 * @group cart_shopping
 * @param {string} cart_id.path.required - cart_id
 * @param {productBody[]} cart.body.required - Pre-sale Request information
 * @returns {object} 200 - An array list of updated status of selected candidate
 * @returns {Error}  default - Unexpected error
 * @returns {Error}  B50144 - Server error
 */

/**
 * @typedef productBody
 * @property {string} _id.required - product_id -eg: material_001307
 * @property {number} amount.required - amount -eg: 1
 */

const Conf = require('../../config')
const {
    addComma
} = require('../utils/formatNumber')
const saleOrder = require('../model/modelSaleOrder')

async function Blogic(req, res, next) {
    try {

        /* process */
        let cart_id = req.params.cart_id
        let product = req.body

        if(product.length < 1) {
            throw new Error(`No Data`)
        }

        let getCart = await saleOrder.getCartById(cart_id)
        if (getCart) {
            product.map(o => o.update_date = new Date())
            getCart.cart = product
            getCart.status = 'confirm'
            getCart.update_date = new Date()
            console.log(getCart)
            let updateCart = await saleOrder.updateCart(getCart)
            if (updateCart.ok === 1) {
                res.body = getCart
            } else {
                throw new Error(`Can't delete cart`)
            }
        
        } else {
            throw new Error(`Cart not found`)
        }
        next()
    } catch (e) {
        next(e)
    }
}

module.exports = Blogic