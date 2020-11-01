const router = require('express').Router()
const { Genre } = require('../db');

router.get('/', async (req, res, next) => {
    try {
        res.send(await Genre.findAll())
    } catch (err){
        next(err)
    }
})

module.exports = router;
