const router = require('express').Router()
const { itemsPurchased, OrderHistory } = require('../db');

router.post('/', async (req, res, next) => {
  try {
    await itemsPurchased.create(req.body)
    res.redirect('/')
  }
  catch (err){
    next(err)
  }

})

router.get('/:id', async(req, res, next) => {
  try {
    await itemsPurchased.findAll({
      where: {
        id: req.params.id
      },
      include: OrderHistory
    })
  }
  catch (err) {
    next(err)
  }
})

module.exports = router;
