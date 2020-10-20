
import React, { Component } from "react"
import { connect } from "react-redux"
// import store, { } from "./store"
import {Link} from "react-router-dom"


class Cart extends Component{
    constructor(){
        super();
        this.state={
            newClasName:''
        }
        this.closeCart= this.closeCart.bind(this)
    }

    componentDidMount(){
        
        this.setState({newClasName: this.props.addClass})
    }
    componentDidUpdate(){
        if(this.state.newClasName !==this.props.addClass){
            this.setState({newClasName:this.props.addClass})
        }
    }


    closeCart(){
        console.log("---0000----",this.props.addClass);

        this.setState({newClasName:""}) 
      }

    render(){
        return (
            <div>
                <div className="cart-overlay ">
                </div>
                <div className={`cart ${this.state.newClasName}`} >
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





     