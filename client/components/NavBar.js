import React, { Component } from "react"
import { connect } from "react-redux"
import {Link} from "react-router-dom"
import Cart from "./Cart"

class NavBar extends Component{
  constructor(){
    super();
    this.state={
      name: false
    }
    this.addClass=  this.addClass.bind(this)
}

  addClass(){
    this.setState({name:!this.state.name})   
  }
  render(){
    return (
      <div>
        <nav>
          <div id = 'navLeftContainer'>
            <Link className = 'navLink' to = '/'>Home</Link>
            <Link className = 'navLink' to = '/books'>Books</Link>
            {/* <Link className = 'navLink' to = '/'>Cart</Link> */}
            <Link className = 'navLink' to = '/'>About</Link>
          </div>
          <div id = 'navCenterContainer'> 
            <select >
              <option value="All">All</option>
              <option value="Books">Books</option>
              <option value="Author">Author</option>
              <option value="Genre">Genre</option>
            </select>
            <form >
            <input type="text" placeholder="Search.." name="search"/>
              <button type="submit"><i className="fa fa-search"></i></button>
            </form>
          </div>
          <div id = 'navRightContainer'>
            <Link className = 'navLink' to = '/'>Log In</Link>
            <Link className = 'navLink' to = '/'>Sign Up</Link>
        </div>
        <div className="cart-btn" onClick={()=>this.addClass()}>
                <span className="nav-icon" >
                    <i className="fas fa-cart-plus"></i>
                </span>
                <div className="cart-items">0</div>
          </div>
        </nav>
        <Cart hideClass={this.state.name} addClass={this.addClass}/>
      </div>
    )
  }
}

export default connect(() => {return {}},() => {return {}})(NavBar)
