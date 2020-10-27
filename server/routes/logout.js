const router = require('express').Router()
const {Session } = require('../db');

router.post('/', async (req, res, next) => {
    try {
    console.log('did we make it here')
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
