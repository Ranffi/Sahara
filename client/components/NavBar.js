import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import Cart from './Cart'
import {getBooks, getUser} from '../redux/store'

class NavBar extends Component{
  constructor(){
    super();
    this.state = {
      name: false,
      value: '',
      choice: 'All'
    }
    this.addClass = this.addClass.bind(this)
    this.searchChenge = this.searchChenge.bind(this)
    this.searchBy = this.searchBy.bind(this)
}
componentDidMount(){
  this.props.getBook()
  this.props.getUser()
}

searchChenge(ev){
  this.setState({value: ev.target.value})
}

findElement(ev){

}
  searchBy(ev){
    this.setState({choice: ev.target.value})
  }
  addClass(){
    this.setState({name: !this.state.name})
  }
  render(){
    const filter = this.state.value.toLocaleUpperCase()
    const {books} = this.props
    const {value, choice} = this.state

    return (
      <div>
        <nav>
          <div id = "navLeftContainer">
            <Link className = "navLink" to = "/">Home</Link>
            <Link className = "navLink" to = "/books">Books</Link>
            <Link className = "navLink" to = "/about">About</Link>
          </div>
          <div id = "navCenterContainer">
          <select className="searchDropdown" onChange={this.searchBy}  >
              <option value="Books">Books</option>
              <option value="Author">Author</option>
              <option value="Genre">Genre</option>
          </select>
            <form onSubmit={this.findElement}>
            <input type="text" placeholder="Search..." name="search" value={this.state.value} onChange={this.searchChenge} />
            <button type="submit"><i className="fa fa-search" /></button>
            </form>
          </div>
          <div id ="navRightContainer">
            <Link className = "navLink" to = "/login">Log In</Link>
            <Link className = "navLink" to = "/signUp">Sign Up</Link>
            <Link className = "navLink" to = "/logout">logout</Link>
          </div>
          <div className="cart-btn" onClick={ () => this.addClass()}>
              <span className="nav-icon" >
                  <i className="fas fa-cart-plus" />
              </span>
              <div className="cart-items">0</div>
          </div>
        </nav>
        <Cart hideClass={this.state.name} addClass={this.addClass} />
        <ul id="myUL" className={this.state.value !== '' ? '' : 'hidden'}>
          {
            books.map( book => {
              if (book.title.toUpperCase().indexOf(filter) > -1 && filter !== '') {
                  return (
                    <Link to={`/books/${book.id}`} key ={book.id} onClick={ console.log("this.setState({value:''}") }>{book.title}</Link>
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
  getBook: () => dispatch(getBooks()),
  getUser: () => dispatch(getUser())
}})(NavBar)
