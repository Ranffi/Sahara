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
router.delete('/:id', async (req,res,next) => {
    try{
        const { id } = req.params
        await CartItem.destroy({where:{id}})
        res.sendStatus(204);
    }catch(err){
        next(err)
    }
})
router.put('/:id', async (req,res,next) => {
    try{
        const { id } = req.params
        await CartItem.update({quantity:req.body.quantity},{where:{id}})
        res.sendStatus(204);
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