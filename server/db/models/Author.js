const Sequelize = require('sequelize') //for things like Sequelize.STRING
const Op = Sequelize.Op;
const db = require('../db')

const Author = db.define('author', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}, {
    hooks: {
      beforeCreate: (author) => {
        author.firstName = author.firstName.split('').map( (elem,ind) => ind === 0 ? elem.toUpperCase() : elem.toLowerCase()).join('');
        author.lastName = author.lastName.split('').map( (elem,ind) => ind === 0 ? elem.toUpperCase() : elem.toLowerCase()).join('');
      }
    }
  })

Author.findOrCreateAuthor = async function(authorFirstName, authorlastName) {

    const checkAuthorArr = await Author.findAll({
        where: {
            firstName: {
                [Op.iLike]: authorFirstName
            },
            lastName: {
                [Op.iLike]: authorlastName
            },
        }
    });

    let newAuthor;

    if (checkAuthorArr.length === 0) {
        newAuthor = await Author.create({
            firstName: authorFirstName,
            lastName: authorlastName
        })
    } else {
        newAuthor = checkAuthorArr[0]
    }

    return newAuthor
}

module.exports = Author
