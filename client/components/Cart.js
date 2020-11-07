
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import {deleteCartItem, updateCartItem, updateCartItems} from '../redux/items'
import StripeCheckout from 'react-stripe-checkout'
import { toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure()


class Cart extends Component{
    constructor(){
        super();
        this.state = {
            totalPrice: 0,
            cartItems: []
        }
        this.closeCart = this.closeCart.bind(this)
        this.increasePrice = this.increasePrice.bind(this)
        this.decreasePrice = this.decreasePrice.bind(this)
        this.handleToken = this.handleToken.bind(this)
    }
    componentDidUpdate(){
        if (this.state.cartItems.length !== this.props.cartItems.length){
            let sum = 0
            this.props.cartItems.forEach(element => {
                sum += element.book.price * element.quantity
            })
        this.setState({totalPrice: sum, cartItems: this.props.cartItems})
        }
    }

    async increasePrice(price, id, quantity, userId){
        quantity += 1
        await this.props.update(id, quantity, userId)
        // eslint-disable-next-line react/no-access-state-in-setstate
        let sum = this.state.totalPrice + price
        sum = sum.toFixed(2) * 1;
        this.setState({totalPrice: sum})
    }
   async  decreasePrice(price, id, quantity, userId){
        if (quantity > 1){
            quantity -= 1;
           await this.props.update(id, quantity, userId)
            // eslint-disable-next-line react/no-access-state-in-setstate
            let sum = this.state.totalPrice - price
            sum = sum.toFixed(2) * 1;
            this.setState({totalPrice: sum})
        }
    }

    async handleToken(token) {
        token.totalPrice = this.state.totalPrice.toFixed(2)
        token.cartItems = this.state.cartItems
         try {
             await this.props.checkOut({token});
             toast.success('Success! Check email for details');
         }
         catch {
             toast.error('Something went wrong');
         }
     }


    closeCart(){
        const value = document.querySelector('.cart').classList.contains('showCart')
        if (value){
            document.querySelector('.cart').classList.remove('showCart');
            this.props.addClass()
        }
    }

    render(){
        const {cartItems, user} = this.props
        return (
            <div>
                <div className="cart-overlay " />
                <div className={`cart ${this.props.hideClass ? 'showCart' : ''}`} >
                    <span className="close-cart" onClick={() => this.closeCart()}>
                        <i className="fas fa-window-close" />
                    </span>
                    <h2>your cart</h2>
                    <div className="cart-content">
                        {
                            !!cartItems && cartItems.sort((a, b) => a.id - b.id).map(item => {
                                return (
                                <div className="cart-item" key={item.id}>
                                    <img src={item.book.coverImageUrl} alt="product" />
                                    <div>
                                        <h4>{item.book.title}</h4>
                                        <h5>${(item.book.price * item.quantity).toFixed(2)}</h5>
                                        <span className="remove-item" data-id={item.id} onClick={() => this.props.deleteItem(item.id, user.id)}>remove</span>
                                    </div>
                                    <div>
                                        <i className="fas fa-chevron-up" data-id={item.id} onClick={() => this.increasePrice(item.book.price, item.id, item.quantity, user.id)} />
                                        <p className="item-amount">{item.quantity}</p>
                                        <i className="fas fa-chevron-down" data-id={item.id} id={item.quantity === 1 ? 'grayDownBtn' : ''} onClick={() => this.decreasePrice(item.book.price, item.id, item.quantity, user.id)} />
                                    </div>`
                                </div>
                                )
                            })
                        }
                    </div>
                    <div className="cart-footer">
                        <h3>Your Total: $ <samp className="cart-total">{this.state.totalPrice.toFixed(2)}</samp></h3>
                        {/* <Link to = '/checkout'><button className="checkout">Checkout</button></Link> */}
                        <StripeCheckout
                        stripeKey = "pk_test_51Hi510Gylr8S72ER7rkiS3xd0GEGxvRu1tVQwi9VqRu3IbCftd7oLoEJFnATk5QMKmeFyyKpyV9yswzBI5Ek5LPF00M9MRxTW4"
                        token = {this.handleToken}
                        billingAddress
                        shippingAddress
                        amount = {this.state.totalPrice * 100}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    ({items, user}) => ({
        cartItems: items.cartItems,
        user: user.user
      }),
    (dispatch) => {
        return {
            deleteItem: (id, userId) => dispatch(deleteCartItem(id, userId)),
            checkOut: (token) => dispatch(updateCartItems(token)),
            update: (id, quantity, userId) => dispatch(updateCartItem(id, quantity, userId))
        }
    }
)(Cart)
