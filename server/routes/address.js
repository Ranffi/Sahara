const router = require('express').Router()
const { Address } = require('../db');

router.get('/:id', async (req, res, next) => {
  try {
      res.send(await Address.findAll(
        {
          where: {id: req.params.id}
        }
      ))
  }
  catch (err) {
      next(err)
  }
})

router.post('/', async (req, res, next) => {
  const {streetAddress, city, state, zipCode } = req.body
  try {
    const newAddress = await Address.create({streetAddress, city, state, zipCode})
    res.send(newAddress);
  }
  catch (err) {
      next(err)
  }
})

router.put('/', async (req, res, next) => {
  const {streetAddress, city, state, zipCode, id } = req.body
  try {
    const newAddress = await Address.update({streetAddress, city, state, zipCode},
      {where: { id: id }})
      res.send(newAddress);
  }
  catch (err) {
      next(err)
  }
})

module.exports = router
