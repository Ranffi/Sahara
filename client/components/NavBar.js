import React, { Component } from "react"
import { connect } from "react-redux"
import {Link} from "react-router-dom"
import Cart from "./Cart"
import {getBooks} from "../redux/store"

class NavBar extends Component{
  constructor(){
    super();
    this.state={
      name: false,
      value:''
    }
    this.addClass=  this.addClass.bind(this)
    this.searchChenge=this.searchChenge.bind(this)
}
componentDidMount(){
  this.props.getBook()
}

searchChenge(ev){
  this.setState({value: ev.target.value})
}

findElement(ev){
  ev.preventDefault()
  // this.setState({value:})
  console.log(this.state.value);
}



  addClass(){
    this.setState({name:!this.state.name})
  }
  render(){
    const filter= this.state.value.toLocaleUpperCase()
    const {books}=this.props

    return (
      <div>
        <nav>
          <div id = 'navLeftContainer'>
            <Link className = 'navLink' to = '/'>Home</Link>
            <Link className = 'navLink' to = '/books'>Books</Link>
            <Link className = 'navLink' to = '/'>About</Link>
          </div>
          <div id = 'navCenterContainer'>
            <select className='searchDropdown'>
              <option value="All">All</option>
              <option value="Books">Books</option>
              <option value="Author">Author</option>
              <option value="Genre">Genre</option>
            </select>
            <form onSubmit={this.findElement}>
            <input type="text" placeholder="Search..." name="search" value={this.state.value} onChange={this.searchChenge}/>
            <button type="submit"><i className="fa fa-search"></i></button>
            </form>
          </div>
          <div id = 'navRightContainer'>
            <Link className = 'navLink' to = '/'>Log In</Link>
            <Link className = 'navLink' to = '/signUp'>Sign Up</Link>
        </div>
        <div className="cart-btn" onClick={()=>this.addClass()}>
                <span className="nav-icon" >
                    <i className="fas fa-cart-plus"></i>
                </span>
                <div className="cart-items">0</div>
          </div>
        </nav>
        <Cart hideClass={this.state.name} addClass={this.addClass}/>
        <ul id="myUL" >
                {
                   books.map( book =>{
                    if (filter === ''){
                    }else if (book.title.toUpperCase().indexOf(filter) > -1) {
                      return (
                        <Link to={`/books/${book.id}`} key ={book.id} ><li>{book.title}</li></Link>
                      )
                    }
                  })
                }
              </ul>
      </div>
    )
  }
}

export default connect(
({books}) => {return {
  books
}
},
(dispatch) => {return {
  getBook: ()=>dispatch(getBooks())
}})(NavBar)
