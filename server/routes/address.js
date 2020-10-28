const router = require('express').Router()
const { Address } = require('../db');

router.get('/', async (req, res, next) => {
  try {
      res.send(await Address.findAll())
  }
  catch (err) {
      next(err)
  }
})

router.post('/', async (req, res, next) => {
  const {streetAddress, city, state, zipCode } = req.body
  try {
    const newAddress = await Address.create({streetAddress, city, state, zipCode})
    console.log(newAddress)
    res.send(newAddress);
  }
  catch (err) {
      next(err)
  }
})

module.exports = router
