const router = require('express').Router()
const { Book, Author, Genre } = require('../db');

router.get('/', async (req, res, next) => {
    try {
        res.send(await Book.findAll({
            include: [Author, Genre]
        }));
    }
    catch (err) {
        next(err)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        res.send(await Book.findByPk(req.params.id, {
            include: [Author, Genre]
        }));
    }
    catch (err) {
        next(err)
    }
})

module.exports = router