const router = require('express').Router()
//import models from /db

router.use('/books', require('./books'))
//get '/' - all books
//get '/:id' - single book by id
//post '/' - add book (only admin will be doing this)
    //req.body - needs all fields in Book DB schema,
    //except instead of authorId,
    //send authorFirstName and authorLastName (don't need to format them)
//put as well

router.use('/users', require('./users'))
//get '/:userId' - user by id (includes user's books)
//post '/:userId/books/:bookId' - add book to user's cart/order book
    //req.body - just needs { quantity: number }
//put '/:userId/books/:bookId' - move book from cart to order history
    //req.body - just needs { bought: true/false }

router.use('/login', require('./login'))
router.use('/logout', require('./logout'))


router.use('/cartItem', require('./cartItem'))
router.use('/author', require('./author'))
router.use('/address', require('./address'))
router.use('/genre', require('./genre'))


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
