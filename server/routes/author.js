const router = require('express').Router()
const { Author } = require('../db');

router.get('/', async (req, res, next) => {
    try {
        res.send(await Author.findAll())
    } catch (err){
        next(err)
    }
})

module.exports = router;
