const router = require('express').Router()
const bcrypt = require('bcrypt')
const { User } = require('../db');

router.post('/', async (req,res,next) => {
    const { userName, password } = req.body;

    const user = await User.findOne({where: { userName }})

    if (user) {
        const correctPassword = await bcrypt.compare(password, user.password)
        if (correctPassword) {
            res.sendStatus(200)
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