//import your db
//import your models
// The purpose of this module is to bring your Sequelize instance (`db`) together
// with your models, for which you'll find some blank files in this directory:

const db = require('./db')
const Book = require('./models/Book')
const Author = require('./models/Author')
const Users = require('./models/User')
const Gener = require('./models/Genre')


module.exports = {
  db,
  Book,
  Author,
  Users,
  Gener
}