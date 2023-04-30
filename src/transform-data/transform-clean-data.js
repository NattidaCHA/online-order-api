const saleOrder = require('../model/modelSaleOrder')

async function cleanData() {

    console.log('Start Clean Data')
    const data = await saleOrder.getDataOrder()
    console.log('Proccess')

    for (let o of data) {
        if (o.Pc) {
            o.Pc = parseInt(o.Pc.replace(/[^\w\s]/gi, ''))
        } else {
            o.Pc = 0
        }

        await saleOrder.insertOrderList(o)
    }
    console.log('End Clean Data')
}

module.exports = {
    'clean_data': cleanData
}