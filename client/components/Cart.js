
import React, { Component } from "react"
import { connect } from "react-redux"
import {getCartItems} from "../redux/store"

class Cart extends Component{
    constructor(){
        super();
        this.state={
            newClasName:false,
            totalPrice:0,
            quantity:{}
        }
        this.closeCart= this.closeCart.bind(this)
        this.increasePrice = this.increasePrice.bind(this)
        this.decreasePrice = this.decreasePrice.bind(this)
    }
    componentDidMount(){
        this.props.items()
    }

    componentDidUpdate(){
        if(this.state.totalPrice === 0){
            let sum=0
            const obj={}
            this.props.cartItems.forEach(element => {
                sum += element.book.price
                const id=element.id
                obj[id]=1
            });
            this.setState({totalPrice: sum, quantity:obj })
        }
    }

    increasePrice(price){
        let sum= this.state.totalPrice + price
        this.setState({totalPrice:sum})
    }
    decreasePrice(price){

        let sum=this.state.totalPrice - price
        this.setState({totalPrice:sum})
    }


    closeCart(){ 
        const value = document.querySelector('.cart').classList.contains('showCart')
        if (value){
            document.querySelector('.cart').classList.remove('showCart');
            this.props.addClass()
        }   
    }

    render(){
            const {quantity}=this.state
            const {cartItems}=this.props
        return (
            <div>
                <div className="cart-overlay ">
                </div>
                <div className={`cart ${this.props.hideClass? "showCart": ''}`} >
                    <span className="close-cart" onClick={()=>this.closeCart()}>
                        <i className="fas fa-window-close"></i>
                    </span>
                    <h2>your cart</h2>
                    <div className="cart-content">
                        {
                            cartItems.map(item =>{
                                return(
                                <div className='cart-item' key={item.id}>
                                    <img src={item.book.coverImageUrl} alt="product"/>
                                    <div>
                                        <h4>{item.book.title}</h4>
                                        <h5>{item.book.price}</h5>
                                        <span className="remove-item" data-id={item.id}>remove</span>
                                    </div>
                                    <div>
                                        <i className="fas fa-chevron-up" data-id={item.id} onClick={()=>this.increasePrice(item.book.price)}></i>
                                        <p className="item-amount">{quantity[item.id]}</p>
                                        <i className="fas fa-chevron-down" data-id={item.id} onClick={()=>this.decreasePrice(item.book.price)}></i>
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
    ({cartItems})=>{
        return {
            cartItems
        }
    },
    (dispatch) => {
        return {
            items: ()=> dispatch(getCartItems())
        }
    }
)(Cart)