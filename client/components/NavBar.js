import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import Cart from './Cart'
import Sanduich from './sanduich'
import {getBooks, getCartItems, getAuthors, getAuthorBooks, getGenre, getGenreBooks, getUser} from '../redux/store'
import { async } from 'validate.js'

class NavBar extends Component{
  constructor(){
    super();
    this.state = {
      name: false,
      value: '',
      choice: 'Books',
      user:{
        id:0
      }
    }
    this.addClass = this.addClass.bind(this)
    this.searchChenge = this.searchChenge.bind(this)
    this.searchBy = this.searchBy.bind(this)
    this.emtyValue = this.emtyValue.bind(this)
}
 async componentDidMount(){
  this.props.getBook()
  this.props.getAuthors()
  this.props.getGenre()
  await this.props.getUser()
  await this.props.items(this.props.user.id)
  console.log(this.props.user.id);
  
}

searchChenge(ev){
  this.setState({value: ev.target.value})
}

findElement(){

}
  searchBy(ev){
    this.setState({choice: ev.target.value})
  }
  emtyValue(id, value){
    this.setState({value: ''})
    if (value === 'Author' ){
      this.props.authorBooks(id)
    } else if (value === 'Genre' ){
      this.props.genreBooks(id)
    }
  }
  addClass(){
    // eslint-disable-next-line react/no-access-state-in-setstate
    this.setState({name: !this.state.name})
  }
  render(){
    const filter = this.state.value.toLocaleUpperCase()
    const {books, cartItems, authors, genre, user} = this.props
    const {value, choice, name} = this.state
    return (
      <div>
        <nav>
          <div>
            <Sanduich />
          </div>
          <div id = "navLeftContainer">
            <Link className = "navLink" to = "/">Home</Link>
            <Link className = "navLink" to = "/books" onClick={() => this.props.getBook()}>Books</Link>
            <Link className = "navLink" to = "/">About</Link>
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
              <div className="cart-items">{cartItems.length}</div>
          </div>
        </nav>
        <Cart hideClass={name} addClass={this.addClass} />
        <ul id="myUL" className={value !== '' ? '' : 'hidden'}>
          {
            choice === 'Books' ?
            books.map( book => {
              if (book.title.toUpperCase().indexOf(filter) > -1 && filter !== '') {
                  return (
                    <Link to={`/books/${book.id}`} key ={book.id} onClick={() => this.emtyValue()} >{book.title}</Link>
                  )
                }
              }) :
              choice === 'Author' ?
              authors.map( author => {
                if (author.firstName.toUpperCase().indexOf(filter) > -1 || author.lastName.toUpperCase().indexOf(filter) > -1 && filter !== '') {
                    return (
                      <a key ={author.id} onClick={() => this.emtyValue(author.id, choice)} >{author.firstName} {author.lastName}</a>
                    )
                  }
                }) :
                genre.map( element => {
                  if (element.name.toUpperCase().indexOf(filter) > -1 && filter !== '') {
                      return (
                        <a key ={element.id} onClick={() => this.emtyValue(element.id, choice)} >{element.name}</a>
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
({books, cartItems, authors, genre, user}) => {return {
  books,
  cartItems,
  authors,
  genre,
  user
}
},
(dispatch) => {return {
  getBook: () => dispatch(getBooks()),
  items: (id) => dispatch(getCartItems(id)),
  getAuthors: () => dispatch(getAuthors()),
  authorBooks: (id) => dispatch(getAuthorBooks(id)),
  getGenre: () => dispatch(getGenre()),
  genreBooks: (id) => dispatch(getGenreBooks(id)),
  getUser: () => dispatch(getUser())
}}
)(NavBar)
