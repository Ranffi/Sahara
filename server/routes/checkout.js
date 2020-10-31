const router = require('express').Router()
const stripe = require('stripe')('sk_test_51Hi510Gylr8S72ERgs6jnhGkUfiteVxYYgGFs3k1ujlcN0lyPz9Wc8HAkNNmIVZe1cDkIOG2Ry31UOiCbmT6TcZl00WhvRE4vi')
const uuid = require('uuid')

router.post('/', async (req, res, next) => {
    let err;
    let status;

    try {

        const { token } = req.body
        console.log(token)
        const customer = await
            stripe.customers.create({
                email: token.email,
                source: token.id
            })

            // const idempotency_key = uuid.v4()
        //     const charge = await stripe.charges.create(
        //         {
        //             amount :

        //         }
        //     )
        // }
    }
    catch (e) {
        next(e)
    }
})
module.exports = router
