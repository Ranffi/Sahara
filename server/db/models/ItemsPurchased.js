const Sequelize = require("sequelize") 
const db = require("../db")

const itemsPurchased = db.define('itemsPurchased', {
    quantity: {
        type: Sequelize.INTEGER,
    }
})

module.exports = itemsPurchased
