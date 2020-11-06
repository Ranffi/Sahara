const router = require('express').Router()
const bcrypt = require('bcrypt')
const { User, Cart } = require('../db');
const Session = require('../db/models/Session');

router.get('/get-user', (req, res, next) => {
    try {
        res.send(req.user)
    }
    catch (err) {
        next(err)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        if (req.user.id === Number(req.params.id) || req.user.adminStatus) {
            const {userName, password, firstName, lastName,  email, shippingAddressId, isGuest } = req.body
            const hashedPw = await bcrypt.hash(password, 10)
            const user = await User.findByPk(req.params.id);
            await user.update({
                userName,
                password: hashedPw,
                email,
                firstName,
                lastName,
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
        else {
            console.log('nice try')
        }
    }
    catch (err) {
        next(err)
    }
})

router.get('/', async (req, res, next) => {
    try {
        if (req.user.adminStatus) {
            const allUsers = await User.findAll( {where: { isGuest: false }});
            res.send(allUsers.map(user => {
                return {id: user.id, userName: user.userName, firstName: user.firstName, lastName: user.lastName}
            }))
        }
        else {
            res.send('nice try')
        }
    }
    catch (err) {
        next(err)
    }
})

router.get('/admins', async (req, res, next) => {
    try {
        if (req.user.adminStatus) {
            const allUsers = await User.findAll( {where: { adminStatus: true }});
            res.send(allUsers.map(user => {
                return {id: user.id, userName: user.userName, firstName: user.firstName, lastName: user.lastName}
            }))
        }
        else {
            res.send('nice try')
        }
    }
    catch (err) {
        next(err)
    }
})

router.delete('/:userId', async (req, res, next) => {
    try {
        if (req.user.id === Number(req.params.userId) || req.user.adminStatus) {
            const user = await User.findByPk(req.params.userId)
            await user.destroy();
            res.sendStatus(204)
        }
        else {
            console.log('nice try')
        }
    }
    catch (err) {
        next(err)
    }
})

router.put('/admin/:userId', async (req, res, next) => {
    try {
        if (req.user.adminStatus) {
            await User.update({adminStatus: req.body.adminStatus},
                {where: {id: req.params.userId}})
            res.sendStatus(204)
        }
        else {
            console.log('nice try')
        }
    }
    catch (err) {
        next(err)
    }
})


module.exports = router
