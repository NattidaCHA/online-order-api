/**
 * [1] Create cart
 * @route DELETE /cart/{cart_id}/product/{product_id}
 * @group cart_shopping
 * @param {string} cart_id.path.required - cart_id
 * @param {string} product_id.path.required - product_id
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
        let cart_id = req.params.cart_id
        let product_id = req.params.product_id

        let getCart = await saleOrder.getCartById(cart_id)
        if (getCart) {
            let index = getCart.cart.findIndex(o => o._id == product_id)
            let productData = getCart.cart[index]
            if (productData == undefined || productData == null || index < 0) {
                res.body = getCart
            } else {
                getCart.cart.splice(index, 1)
                getCart.update_date = new Date()
                let updateCart = await saleOrder.updateCart(getCart)
                if (updateCart.ok === 1) {
                    res.body = getCart
                } else {
                    throw new Error(`Can't delete cart`)
                }
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