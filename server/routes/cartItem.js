const router = require('express').Router()
const { CartItem, Book, User  } = require('../db');


router.post('/', async (req,res,next) => {
    try{
        const { bookId } = req.body;
        const data = await CartItem.create({bookId})
        res.status(200).send(data)
    }catch(err){
        next(err)
    }
})

router.get('/', async (req,res,next) => {
    try{
        res.send(await CartItem.findAll({include: [ Book, User]}))
    }catch(err){
        next(err)
    }
})

module.exports = router;