/**
 * [1] List Candidate
 * @route GET /actual_target
 * @group sales_order
 * @returns {object} 200 - An array list of updated status of selected candidate
 * @returns {Error}  default - Unexpected error
 * @returns {Error}  B50144 - Server error
 */

const Conf = require('../../config')
const saleOrder = require('../model/modelSaleOrder')
const {
    addComma
} = require('../utils/formatNumber')

async function Blogic(req, res, next) {
    try {
        /* process */
        let year = await saleOrder.queryYear()
        if (year.length > 0) {
            let growth = await saleOrder.queryProductGrowth(year)
            let data = []
            if (growth) {
                let total = 0;
                growth.forEach(o => {
                    total += o.totalPc;
                });

                let target = 1000000
                let actual = []
                let _target = []
                let year = []
                for (let i = 0; i < growth.length; i++) {
                    growth[i].totalPc = parseInt(growth[i].totalPc)
                    growth[i].target = target
                    target = target + 500000
                    actual.push(growth[i].totalPc)
                    _target.push(growth[i].target)
                    year.push(growth[i]._id)
                }
                data.push({
                    actual: actual,
                    target: _target,
                    year: year,
                    total: addComma(total)
                })
                res.body = data[0]
            } else {
                throw new Error(`Data not found`)
            }
        } else {
            throw new Error(`Year not found`)
        }
        next()
    } catch (e) {
        next(e)
    }
}

module.exports = Blogic