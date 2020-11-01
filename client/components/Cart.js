
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import {deleteCartItem, updateCartItem} from '../redux/store'

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
    }
    componentDidUpdate(){
        if (  this.state.cartItems.length !== this.props.cartItems.length){
            let sum = 0
            this.props.cartItems.forEach(element => {
                sum += element.book.price * element.quantity
            })
            sum = sum.toFixed(2) * 1
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
                            cartItems.sort((a, b) => a.id - b.id).map(item => {
                                return (
                                <div className="cart-item" key={item.id}>
                                    <img src={item.book.coverImageUrl} alt="product" />
                                    <div>
                                        <h4>{item.book.title}</h4>
                                        <h5>{(item.book.price * item.quantity).toFixed(2) * 1}</h5>
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
                        <h3> your total: $ <samp className="cart-total">{this.state.totalPrice}</samp></h3>
                        <Link to = '/checkout'><button className="checkout">Checkout</button></Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    ({cartItems, user}) => {
        return {
            cartItems,
            user
        }
    },
    (dispatch) => {
        return {
            deleteItem: (id, userId) => dispatch(deleteCartItem(id, userId)),
            update: (id, quantity, userId) => dispatch(updateCartItem(id, quantity, userId))
        }
    }
)(Cart)
