import React from 'react'
import axios from 'axios'
// import Toast from 'react-bootstrap/Toast'
// import ToastHeader from 'react-bootstrap/ToastHeader'
// import ToastBody from 'react-bootstrap/ToastBody'
import { toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { connect } from 'react-redux'
import {deleteCartItem, updateCartItem, getUser} from '../redux/store'
import StripeCheckout from 'react-stripe-checkout'
toast.configure()
class Checkout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            totalPrice: 0,
            cart: [],
        }
        this.handleToken = this.handleToken.bind(this)
    }
      componentDidMount() {
        this.props.getUser()
        // const cartItems = (await axios.get(`/api/cartItem/${(this.props.user.id)}`)).data
        // const price = cartItems.reduce((total, item) => {
        //     return total + item.book.price
        // }, 0)
        // this.setState({cart: cartItems, totalPrice: price.toFixed(2)})
    }
    async componentDidUpdate() {
        if (this.state.cart.length !== this.props.cartItems.length) {
            const cartItems = (await axios.get(`/api/cartItem/${this.props.user.id}`)).data
            console.log(cartItems)
            const price = cartItems.reduce((total, item) => {
                return total + item.book.price
            }, 0)
            this.setState({cart: cartItems, totalPrice: price.toFixed(2)})
        }
    }
   async handleToken(token) {
       token.totalPrice = this.state.totalPrice
       token.cartItems = this.state.cart
        const res = await axios.post('api/checkout', {token})
        console.log('we made it here!!!!!!!!!!!!!!!!!!!!!')
        // const { status } = res.data;
        console.log('Response:', res.data);
        if (res.data === 'success') {
            console.log('we made it here!!!!!!!!!!!!!!!!!!!!!')
          toast.success('Success! Check email for details');
        } else {
          toast.error('Something went wrong');
        }
    }

    render() {
        return (
            <div>
            <h1>CheckoutPage</h1>
            <h2>Total price : {this.state.totalPrice}</h2>
            <ul>
            {this.state.cart
            .map(item => {
                return (
                    <li key={item.id} >{item.book.title} cost ${item.book.price}</li>
                )
            })
            }
            </ul>
            <StripeCheckout
            stripeKey = "pk_test_51Hi510Gylr8S72ER7rkiS3xd0GEGxvRu1tVQwi9VqRu3IbCftd7oLoEJFnATk5QMKmeFyyKpyV9yswzBI5Ek5LPF00M9MRxTW4"
            token = {this.handleToken}
            billingAddress
            shippingAddress
            amount = {this.state.totalPrice * 100}

            />
            </div>
        )
    }
}
export default connect(
    ({cartItems, user, books}) => {
        return {
            cartItems,
            user,
            books
        }
    },
    (dispatch) => {
        return {
            deleteItem: (id, userId) => dispatch(deleteCartItem(id, userId)),
            getUser: () => dispatch(getUser()),
            update: (id, quantity, userId) => dispatch(updateCartItem(id, quantity, userId))
        }
    }
)(Checkout)
