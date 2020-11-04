const router = require('express').Router()
//import models from /db

router.use('/books', require('./books'))
router.use('/users', require('./users'))
router.use('/login', require('./login'))
router.use('/logout', require('./logout'))
router.use('/cartItem', require('./cartItem'))
router.use('/author', require('./author'))
router.use('/address', require('./address'))
router.use('/orderHistory', require('./orderHistory'))
router.use('/genre', require('./genre'))
router.use('/checkout', require('./checkout'))

router.use((req, res, next) => {
    const err = new Error('API route not found!')
    err.status = 404
    next(err)
    })

module.exports = router
