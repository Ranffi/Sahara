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
const Session = require('./models/Session')
const Address = require('./models/Address')

//Product associations
Book.belongsTo(Author)
Author.hasMany(Book)
Book.belongsTo(Genre)
Genre.hasMany(Book)

//Items in cart for a user
CartItem.belongsTo(User)
User.hasMany(CartItem)
CartItem.belongsTo(Book)
Book.hasMany(CartItem)
CartItem.belongsTo(OrderHistory)
OrderHistory.hasMany(CartItem)

//Order history for user & details of that order with items purchased
OrderHistory.belongsTo(User)
User.hasMany(OrderHistory)

//Sessions
Session.belongsTo(User);
User.hasMany(Session);

//Address associations to User
User.belongsTo(Address, {as: 'shippingAddress'})

module.exports = {
  db,
  Book,
  Author,
  User,
  Genre,
  OrderHistory,
  Session,
  CartItem,
  Address
}
