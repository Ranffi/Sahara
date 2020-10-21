const router = require('express').Router()
const bcrypt = require('bcrypt')
const { User, Book, Genre, Author, Cart } = require('../db');

router.get('/', async (req, res, next) => {
    try {
        res.send(await User.findAll(req.params.userId))
    }
    catch (err) {
        next(err)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const {userName, password} = req.body
        const hashedPw = await bcrypt.hash(password, 10)
        await User.create({
            userName,
            password : hashedPw
        })
        res.redirect('/api/books')
    }
    catch(err) {
        next(err)
    }
})

router.get('/:userId', async (req, res, next) => {
    try {
        res.send(await User.findByPk(req.params.userId, {
            include: { all: true, nested: true }
        }));
    }
    catch (err) {
        next(err)
    }
})

router.put('/:userId', async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.userId)
        //REMINDER : If we allow change of password with this route, we need to use bcrypt here as well
        await user.update(req.body)
        res.send(user);
    }
    catch (err) {
        next(err)
    }
})

router.delete('/:userId', async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.userId)
        await user.destroy();
        res.sendStatus(204)
    }
    catch (err) {
        next(err)
    }
})


router.post('/:userId/books/:bookId', async (req, res, next) => {
    try {
        res.send(await Cart.create({
            ...req.body,
            userId: req.params.userId,
            bookId: req.params.bookId
        }));
    }
    catch (err) {
        next(err)
    }
})

router.put('/:userId/books/:bookId', async (req, res, next) => {
    try {
        //this is written as if one row per product in cart
        //may need to specify put route to specific row in cart db
        let order = await Cart.findAll({
            where: {
                bookId: req.params.bookId,
                userId: req.params.userId
            }
        })
        await order[0].update(req.body);
        let cartOrder = await Cart.findAll({
            where: {
                bookId: req.params.bookId,
                userId: req.params.userId
            },
            include: { all: true, nested: true }
        })
        res.send(cartOrder[0]);
    }
    catch (err) {
        next(err)
    }
})

module.exports = router
