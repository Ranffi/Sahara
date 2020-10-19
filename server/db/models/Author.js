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
}, {
    hooks: {
      beforeCreate: (author, options) => {
        author.firstName = author.firstName.split('').map( (elem,ind) => ind == 0 ? elem.toUpperCase() : elem.toLowerCase());
        author.lastName = author.lastName.split('').map( (elem,ind) => ind == 0 ? elem.toUpperCase() : elem.toLowerCase());
      }
    }
  })

Author.findByNameCaseInsensitive = async function(firstName, lastName) {
    const checkAuthor = await Author.findAll({
        where: {
            firstName: {
                [Op.iLike]: req.body.authorFirstName
            },
            lastName: {
                [Op.iLike]: req.body.authorlastName
            },
        }
    });
    return checkAuthor;
}

Author.findOrCreateAuthor = async function (checkAuthorArr) {
    if (!checkAuthorArr.length) {
        const newAuthor = await Author.create({
            firstName: req.body.authorFirstName,
            lastName: req.body.authorlastName
        })
    } else {
        const newAuthor = checkAuthorArr[0]
    }
    return newAuthor
}

module.exports = Author