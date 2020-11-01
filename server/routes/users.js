const router = require('express').Router()
const bcrypt = require('bcrypt')
const { User, Cart } = require('../db');
const Session = require('../db/models/Session');

router.get('/whoami', (req, res) => {
    if (req.user) {
        res.send(`Welcome back ${req.user.userName}`)
    } else {
        res.send('you are not logged in')
    }
})

router.get('/get-user', (req, res, next) => {
    try {
        //console.log(req.user)
        res.send(req.user)
    }
    catch (err) {
        next(err)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const {userName, password, email, shippingAddressId, isGuest } = req.body
        const hashedPw = await bcrypt.hash(password, 10)
        const user = await User.findByPk(req.params.id);
        await user.update({
            userName,
            password: hashedPw,
            email,
            shippingAddressId,
            isGuest
        })
        await Session.update({
            userId: user.id
        },
        {
            where: {id: req.cookies.sid}
        })
        res.send(user)
    }
    catch (err) {
        next(err)
    }
})

// router.get('/:userId', async (req, res, next) => {
//     try {
//         res.send(await User.findByPk(req.params.userId, {
//             include: { all: true, nested: true }
//         }));
//     }
//     catch (err) {
//         next(err)
//     }
// })

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
