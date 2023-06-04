/**
 * [1] Create cart
 * @route POST /create/cart
 * @group cart_shopping
 * @param {productBody.model} productBody.body.required - Pre-sale Request information
 * @returns {object} 200 - An array list of updated status of selected candidate
 * @returns {Error}  default - Unexpected error
 * @returns {Error}  B50144 - Server error
 */

/**
 * @typedef productBody
 * @property {string} _id.required - product_id -eg: material_001307
 * @property {number} amount - amount -eg: 1
 */

const Conf = require('../../config')
const {
    addComma
} = require('../utils/formatNumber')
const saleOrder = require('../model/modelSaleOrder')

async function Blogic(req, res, next) {
    try {

        /* process */
        let body = req.body
        //Get Year
        let getCart = await saleOrder.getCart()
        if (!getCart) {
            let getProduct = await saleOrder.getProductById(body._id)
            if (getProduct) {
                let cartSelect = []
                getProduct.amount = body.amount ? parseInt(body.amount) : 0
                getProduct.update_date = new Date()
                cartSelect.push(getProduct)
                let data = {
                    status: 'pending',
                    cart: cartSelect,
                    create_date: new Date(),
                }
                let createCart = await saleOrder.insertCart(data)
                if (createCart) {
                    res.body = data
                } else {
                    throw new Error(`Can't create cart`)
                }
            } else {
                throw new Error(`Product not found`)
            }
        } else {
            let index = getCart.cart.findIndex(o => o._id == body._id)
            let productData = getCart.cart[index]
            if (productData) {
                productData.amount = body.amount ? productData.amount + parseInt(body.amount) : 0
                productData.update_date = new Date()
                getCart.cart.splice(index, 1)
                getCart.status = 'pending'
                getCart.update_date = new Date()
                getCart.cart.push(productData)
            } else {
                let getProduct = await saleOrder.getProductById(body._id)
                if (getProduct) {
                    getProduct.amount = body.amount ? parseInt(body.amount) : 0
                    getProduct.update_date = new Date()
                    getCart.status = 'pending'
                    getCart.update_date = new Date()
                    getCart.cart.push(getProduct)
                } else {
                    throw new Error(`Product not found`)
                }
            }
            let updateCart = await saleOrder.updateCart(getCart)
            if (updateCart.ok === 1) {
                res.body = getCart
            } else {
                throw new Error(`Can't update cart`)
            }
        }
        next()
    } catch (e) {
        next(e)
    }
}

module.exports = Blogic