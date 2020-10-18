const Sequelize = require("sequelize") //for things like Sequelize.STRING
const db = require("../db")

const Author = db.define('author' , {
    firstName : {
        type : Sequelize.STRING,
        allowNull : false,
    },
    lastName : {
        type : Sequelize.STRING,
        allowNull : false,
    },
})

module.exports = Author