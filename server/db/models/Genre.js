const Sequelize = require('sequelize') //for things like Sequelize.STRING
const db = require('../db')

const Genre = db.define('genre', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    }
})

module.exports = Genre
