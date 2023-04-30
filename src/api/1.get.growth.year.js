/**
 * [1] List Candidate
 * @route GET /growth_year
 * @group sales_order
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
    let year = await saleOrder.queryYear()
    if (year) {

      let growth = await saleOrder.queryProductGrowth(year)
      let data = []
      if (growth.length > 0) {
        let total = 0
        let totalAmount = []
        let year = []
        growth.forEach(o => {
          total += o.totalPc;
          totalAmount.push(parseInt(o.totalPc))
          year.push(o._id)
        })

        data.push({
          total: addComma(total),
          year: year,
          totalPc: totalAmount
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