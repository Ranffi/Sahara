const router = require('express').Router()
const bcrypt = require('bcrypt')
const { User, Session} = require('../db');

router.post('/', async (req, res, next) => {
    const { userName, password } = req.body;
    const user = await User.findOne({where: { userName }})
    if (user) {
        const correctPassword = await bcrypt.compare(password, user.password)
        if (correctPassword) {
            const usersSession = await Session.findByPk(req.sid)
            await usersSession.setUser(user)
            res.redirect('/')
        }
        else {
            res.sendStatus(401);
        }
    }
    else {
        res.sendStatus(401);
    }
})

module.exports = router;
