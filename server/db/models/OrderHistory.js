const Sequelize = require('sequelize')
const db = require('../db')

const OrderHistory = db.define('orderHistory', {
    shippingAddress: {
        type: Sequelize.TEXT
    },
    subTotal: {
        type: Sequelize.FLOAT
    },
    quantity: {
        type: Sequelize.INTEGER
    },
    status: {
        type: Sequelize.STRING
    }
})

module.exports = OrderHistory
