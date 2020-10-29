const router = require('express').Router()
const { OrderHistory} = require('../db');

router.post('/', async (req, res, next) => {
  await OrderHistory.create(req.body)
  res.redirect('/')
})

module.exports = router;
