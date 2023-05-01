const mongoist = require('mongoist')
const Conf = require('../../config')
const db = mongoist(Conf.db.candidate, {
    useNewUrlParser: true
})


// Data for excel
const dataCollection = db.collection('data_order')

// create new db
//const newDBOrderCollection = db.collection('order_list')

// create Product list
//const _insert_produetCollection = db.collection('test_product')

// Data for Get api
const productCollection = db.collection('products')
const orderCollection = db.collection('_order_all')



const modelUser = {
    // api 
    getDataOrder: async () => {
        let doc = await dataCollection.find({})
        return doc
    },
    getTotalProduct: async () => {
        let doc = await productCollection.find({})
        return doc
    },
    getProductlist: async (pageInfo) => {
        const pageStart = (pageInfo.page - 1) * pageInfo.size
        let doc = await productCollection.aggregate([{
                $project: {
                    _id: 1,
                    totalPc: 1
                }
            },
            {
                $sort: {
                    totalPc: -1
                }
            },
            {
                $skip: pageStart
            },
            {
                $limit: pageInfo.size
            }
        ])
        return doc
    },
    getOrderData: async () => {
        let doc = await orderCollection.find({})
        return doc
    },
    queryProductGrowth: async (year) => {
        let doc = await orderCollection.aggregate([{
                $match: {
                    year: {
                        $in: year
                    }
                }

            },
            {
                $group: {
                    _id: "$year",
                    totalPc: {
                        $sum: '$Pc'
                    }
                }
            },
            {
                $sort: {
                    _id: 1
                }
            }

        ])
        return doc
    },
    queryYear: async () => {
        let year = []
        const order = await orderCollection.find({})
        order.forEach(o => {
            if (!year.includes(o.year) && o.year) {
                year.push(o.year)
            }
        })
        return year
    },
    queryProduct: async () => {
        let products = []
        const order = await orderCollection.find({})
        order.forEach(o => {
            if (!products.includes(o.material) && o.material) {
                products.push(o.material)
            }
        })
        return products
    },

    // Clean and New DB order
    insertOrderList: async (data) => {
        let doc = await orderCollection.insert(data)
        return doc
    },
    // for Test Transform Product 
    findProduct: async (data) => {
        const product = await orderCollection.aggregate([{
                $match: {
                    material: {
                        $in: data
                    }
                }

            },

            {
                $group: {
                    _id: "$material",
                    totalPc: {
                        $sum: '$Pc'
                    }
                }
            },
        ])

        return product
    },

    insertProduct: async (data) => {
        let doc = await productCollection.insert(data)
        return doc
    }

}

module.exports = modelUser