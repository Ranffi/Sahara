const Sequelize = require('sequelize')
const db = require('../db')


const Book = db.define('book', {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.FLOAT,
    },
    description: {
        type: Sequelize.TEXT
    },
    coverImageUrl: {
        type: Sequelize.STRING
    },
    quantityInStock: {
        type: Sequelize.INTEGER
    },
    rating: {
        type: Sequelize.INTEGER,
        validate: {
            min: 0,
            max: 5
        },
        defaultValue: 5
    },
    featured: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },

    onSale: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
})

module.exports = Book
