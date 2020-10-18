const router = require("express").Router()
//import models from /db

router.use('/books', require('./books'))
//get '/' - all books
//get '/:id' - single book by id

router.use('/users', require('./users'))
//get '/:userId' - user by id (includes user's books)
//post '/:userId/books/:bookId' - add book to user's cart/order book
    //req.body - just needs { bought: true/false }
//put '/:userId/books/:bookId' - move book from cart to order history
    //req.body - just needs { bought: true/false }

//Questions
    //what do we want to do about multiple cases in cart? I.e. someone adds the same book to cart again, or buys multiple of the same book
        //should there be multiple rows in db? Or just a quantity field?
        //if quantity field, then does it make sense to have 2 possible rows per product- 1 in cart, 1 in order history?



router.use((req, res, next) => {
    const err = new Error('API route not found!')
    err.status = 404
    next(err)
    })

module.exports = router