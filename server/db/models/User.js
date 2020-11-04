const Sequelize = require('sequelize') //for things like Sequelize.STRING
const db = require('../db')

const User = db.define('user', {
    userName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    },
    //this is for now, we need to hash it and make it more secure
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    adminStatus: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    email: {
        type: Sequelize.STRING,
        validate: {
            isEmail: true
        },
        defaultValue: 'guest@guest.com'
    },
    isGuest: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    }
})

//define any class or instance methods

//export your model

module.exports = User
