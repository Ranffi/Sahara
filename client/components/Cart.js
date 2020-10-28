
import React, { Component } from "react"
import { connect } from "react-redux"
import {getCartItems, deleteCartItem,updateCartItem} from "../redux/store"

class Cart extends Component{
    constructor(){
        super();
        this.state={
            newClasName:false,
            totalPrice:0
        }
        this.closeCart = this.closeCart.bind(this)
        this.increasePrice = this.increasePrice.bind(this)
        this.decreasePrice = this.decreasePrice.bind(this)
    }
    componentDidMount(){
        this.props.items()
    }
    componentDidUpdate(){
        if ( 0 === this.state.totalPrice && this.props.cartItems.length !==0){
            let sum = 0
            this.props.cartItems.forEach(element => {
                sum+=element.book.price * element.quantity
            })
        this.setState({totalPrice:sum})   
        }
    }

    increasePrice(price,id,quantity){
        quantity+=1
        this.props.update(id,quantity)
        let sum= this.state.totalPrice + price
        this.setState({totalPrice:sum})
    }
    decreasePrice(price,id,quantity){
        if (quantity > 1){
            quantity-=1;
            this.props.update(id,quantity)
            let sum=this.state.totalPrice - price
            this.setState({totalPrice:sum})
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
            const {cartItems}=this.props
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
                            cartItems.map(item => {
                                return (
                                <div className="cart-item" key={item.id}>
                                    <img src={item.book.coverImageUrl} alt="product" />
                                    <div>
                                        <h4>{item.book.title}</h4>
                                        <h5>{item.book.price * item.quantity}</h5>
                                        <span className="remove-item" data-id={item.id} onClick={()=> this.props.deleteItem(item.id)}>remove</span>
                                    </div>
                                    <div>
                                        <i className="fas fa-chevron-up" data-id={item.id} onClick={()=>this.increasePrice(item.book.price, item.id, item.quantity)}></i>
                                        <p className="item-amount">{item.quantity}</p>
                                        <i className="fas fa-chevron-down" data-id={item.id} id={item.quantity===1? "grayDownBtn":''} onClick={()=>this.decreasePrice(item.book.price, item.id, item.quantity)}></i>
                                    </div>`
                                </div>
                                )
                            })
                        }
                    </div>
                    <div className="cart-footer">
                        <h3> your total: $ <samp className="cart-total">{this.state.totalPrice}</samp></h3>
                        <button className="clear-cart banner-btn">clear cart</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    ({cartItems}) => {
        return {
            cartItems
        }
    },
    (dispatch) => {
        return {
            items: ()=> dispatch(getCartItems()),
            deleteItem: (id)=>dispatch(deleteCartItem(id)),
            update: (id,quantity)=>dispatch(updateCartItem(id,quantity))
        }
    }
)(Cart)
