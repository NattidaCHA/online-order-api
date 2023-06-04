const mongoist = require('mongoist')
const Conf = require('../../config')
const db = mongoist(Conf.db.candidate, {
    useNewUrlParser: true
})


// Data for excel
const dataCollection = db.collection('data_order')

// create new db
const newDBOrderCollection = db.collection('order_list')

// create Product list
const _insert_produetCollection = db.collection('test_product')

// Data for Get api
const productCollection = db.collection('products')
const orderCollection = db.collection('_order_all')

//Cart
const cartCollection = db.collection('cart')

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
    getProductById: async (id) => {
        let doc = await productCollection.findOne({
            _id: id
        })
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
        let doc = await newDBOrderCollection.insert(data)
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
        let doc = await _insert_produetCollection.insert(data)
        return doc
    },
    insertCart: async (data) => {
        let doc = await cartCollection.insert(data)
        return doc
    },
    getCart: async (data) => {
        let doc = await cartCollection.findOne({
            status: {
                $in: ['create', 'pending']
            }
        })
        return doc
    },
    getTotalCartSucces: async () => {
        let doc = await cartCollection.find({
            status: 'confirm'
        })
        return doc
    },
    getCartById: async (id) => {
        let doc = await cartCollection.findOne({_id: mongoist.ObjectID(id)})
        return doc
    },
    getCartSuccess: async (pageInfo) => {
        const pageStart = (pageInfo.page - 1) * pageInfo.size
        let doc = await cartCollection.aggregate([{
                $match: {
                    status: 'confirm'
                }
            },
            {
                $sort: {
                    create_date: -1
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
    updateCart: async (data) => {
        let doc = await cartCollection.update({
            _id: mongoist.ObjectID(data._id)
        }, {
            $set: {
                status: data.status,
                cart: data.cart,
                update_date: data.update_date
            },
        }, {
            multi: true
        })
        return doc
    },
}

module.exports = modelUser