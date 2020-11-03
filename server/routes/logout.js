const router = require('express').Router()
const {Session } = require('../db');

router.post('/', async (req, res, next) => {
    try {
    const session = await Session.findOne({
        where: {
            id: req.sid
        }
    })

    res.clearCookie('sid', session.id, {
        path: '/'
    })
    await session.destroy()

    res.redirect('/')
}
catch (err) {
    next(err)
}
})

module.exports = router;
