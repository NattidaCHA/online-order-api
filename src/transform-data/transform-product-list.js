const saleOrder = require('../model/modelSaleOrder')

async function transform_data() {

    //find material all
    console.log('Start Transform')
    const data = await saleOrder.queryProduct()
    console.log('Get Id Success')
    // insert data in db
    const insertProduct = await saleOrder.findProduct(data)
    console.log('Insert Data')
    insertProduct.forEach(async (o) => {
        await saleOrder.insertProduct(o)
        console.log(o._id)
    })
    console.log('End Transform')
}

module.exports = {
    'transform_data': transform_data
}