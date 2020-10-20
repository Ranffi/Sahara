
import React, { Component } from "react"
import { connect } from "react-redux"

class Cart extends Component{
    constructor(){
        super();
        this.state={
            newClasName:false
        }
        this.closeCart= this.closeCart.bind(this)
    }

    closeCart(){ 
        const value = document.querySelector('.cart').classList.contains('showCart')
        if (value){
            document.querySelector('.cart').classList.remove('showCart');
            this.props.addClass()
        }   
    }

    render(){
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
                    </div>
                    <div className="cart-footer">
                        <h3> your total: $ <samp className="cart-total">0</samp></h3>
                        <button className="clear-cart banner-btn">clear cart</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(
    ()=>{
        return {}
    },
    (dispatch) => {
        return {
        }
    }
)(Cart)





     