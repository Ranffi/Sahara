const router = require('express').Router()
const { OrderHistory } = require('../db');

router.get('/:userId', async (req, res, next) => {

  const userOrders = await OrderHistory.findAll({
    where: {
      userId: req.params.userId
    },
    include: {all: true, nested: true}
  })
  res.send(userOrders);
})

module.exports = router;
