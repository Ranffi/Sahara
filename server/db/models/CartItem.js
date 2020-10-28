const Sequelize = require('sequelize')
const db = require('../db')

<<<<<<< HEAD
const CartItem = db.define('cartItem' , {
    quantity : {
        type : Sequelize.INTEGER,
        allowNull : false,
        defaultValue : 1
=======
const CartItem = db.define('cartItem', {
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
>>>>>>> 89debfce6f9ad62ae298cdb0c62e1111973cbe3e
    }
})

module.exports = CartItem
