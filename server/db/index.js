//import your db
//import your models
// The purpose of this module is to bring your Sequelize instance (`db`) together
// with your models, for which you'll find some blank files in this directory:

const db = require('./db')
const Book = require('./models/Book')
const Author = require('./models/Author')
const User = require('./models/User')
const Genre = require('./models/Genre')
const CartItem = require('./models/CartItem')
const OrderHistory = require('./models/OrderHistory')
const itemsPurchased = require('./models/ItemsPurchased')

Book.belongsTo(Author)
Author.hasMany(Book)
//product belongs to a user
Book.belongsTo(User)
//user has many products
User.hasMany(Book)

//product belongs to a category
Book.belongsTo(Genre)
//category has many products
Genre.hasMany(Book)

CartItem.belongsTo(User)
User.hasMany(CartItem)

CartItem.belongsTo(Book)
Book.hasMany(CartItem)

OrderHistory.belongsTo(User)
User.hasMany(OrderHistory)

module.exports = {
  db,
  Book,
  Author,
  User,
  Genre,
  OrderHistory,
  itemsPurchased
}
