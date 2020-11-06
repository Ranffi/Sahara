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
router.get('/author/:id', async (req, res, next) => {
    try {
        res.send(await Book.findAll({where: { authorId: req.params.id },
            include: [Author, Genre]}));
    }
    catch (err) {
        next(err)
    }
})
router.get('/genre/:id', async (req, res, next) => {
    try {
        res.send(await Book.findAll({where: { genreId: req.params.id },
            include: [Author, Genre]}));
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

router.post('/', async (req, res, next) => {
    try {
        const newAuthor = await Author.findOrCreateAuthor(req.body.authorFirstName, req.body.authorLastName)

        delete req.body.authorFirstName;
        delete req.body.authorLastName;

        const response = await Book.create({
            ...req.body,
            authorId: newAuthor.id
        });

        res.send(response);
    }
    catch (err) {
        next(err)
    }
})

router.put('/update/:bookId', async (req, res, next) => {
    try {
        const book = await Book.findByPk(req.params.bookId);
        let keys = Object.keys(req.body)

        if (keys.includes('authorFirstName') || keys.includes('authorLastName')) {
            const newAuthor = await Author.findOrCreateAuthor(req.body.authorFirstName, req.body.authorLastName)

            delete req.body.authorFirstName;
            delete req.body.authorLastName;

            res.send(await book.update({
                ...req.body,
                authorId: newAuthor.id
            }))
        }
        else {
            res.send( await book.update(req.body));
        }
    }
    catch (err) {
        next(err)
    }
})

router.delete('/:bookId', async (req, res, next) => {
    try {
        const findBook = await Book.findByPk(req.params.bookId);
        await findBook.destroy();
        res.sendStatus(204);
    }
    catch (err) {
        next(err);
    }
})


module.exports = router
