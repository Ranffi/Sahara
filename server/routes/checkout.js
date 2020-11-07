const router = require('express').Router()
const stripe = require('stripe')('sk_test_51Hi510Gylr8S72ERgs6jnhGkUfiteVxYYgGFs3k1ujlcN0lyPz9Wc8HAkNNmIVZe1cDkIOG2Ry31UOiCbmT6TcZl00WhvRE4vi')
const uuid = require('uuid')
const Order = require('../db/models/OrderHistory')
// const Address = require('../db/models/Address')
const CartItems = require('../db/models/CartItem')
const Book = require('../db/models/Book')

router.post('/', async (req, res, next) => {
    try {
        const { token } = req.body
        const customer = await
            stripe.customers.create({
                email: token.email,
                source: token.id
            })

        const idempotencyKey = uuid.v4()
        await stripe.charges.create(
            {
                amount: token.totalPrice * 100,
                currency: 'usd',
                customer: customer.id,
                receipt_email: token.email,
                description: `Completed purchase`,
                shipping: {
                    name: token.card.name,
                    address: {
                        line1: token.card.address_line1,
                        line2: token.card.address_line2,
                        city: token.card.address_city,
                        country: token.card.address_country,
                        postal_code: token.card.address_zip,
                    }
                }

            },
            {
                idempotencyKey
            }
        )
            // const newAddress = await Address.findOrCreate({where:})
            const newOrder = await Order.create({
                shippingAddress: token.shippingAddress,
                subTotal: token.totalPrice * 1,
                quantity: token.cartItems.length,
                userId: token.cartItems[0].userId
            })
            await CartItems.update({orderHistoryId: newOrder.id}, {
                where: {
                    userId: token.cartItems[0].userId,
                    orderHistoryId: null
                }
            })
            const cartItemsToSend = await CartItems.findAll({
                where: {
                    orderHistoryId: null,
                    userId: token.cartItems[0].userId
                },
                include: [ Book ]
            })
        res.send(cartItemsToSend)
    }

    catch (e) {
        res.send('failure')
        next(e)
    }
})
module.exports = router
