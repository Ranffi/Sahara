import React, { Component } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import Cart from './Cart'
import Sanduich from './sanduich'
import {getBooks, getAuthors, getAuthorBooks, getGenre, getGenreBooks, singleBook} from '../redux/books'

class NavBar extends Component{
  constructor(){
    super();
    this.state = {
      name: false,
      value: '',
      choice: 'Books'
    }
    this.addClass = this.addClass.bind(this)
    this.searchChenge = this.searchChenge.bind(this)
    this.searchBy = this.searchBy.bind(this)
    this.emtyValue = this.emtyValue.bind(this)
}
componentDidMount(){
  this.props.getAuthors()
  this.props.getGenre()
}

searchChenge(ev){
  this.setState({value: ev.target.value})
}

handleSubmit(ev){
  ev.preventDefault()

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
    } else {
      this.props.getSingelbook(id)
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
    if (!books) return (<div>Loading...</div>)
    return (
      <div>
        <nav>
          <div>
            {
              !user.isGuest ?
              <Sanduich />
              : ''
            }
          </div>
          <div id = "navLeftContainer">
            <Link className = "navLink" to = "/">Home</Link>
            <Link className = "navLink" to = "/about">About</Link>
            <Link className = "navLink" to = "/books" onClick={() => this.props.getBook()}>Books</Link>
          </div>
          <div id = "navCenterContainer">
          <select className="searchDropdown" onChange={this.searchBy}  >
              <option value="Books">Books</option>
              <option value="Author">Author</option>
              <option value="Genre">Genre</option>
          </select>
            <form onSubmit={this.handleSubmit}>
            <input type="text" placeholder="Search..." name="search" value={this.state.value} onChange={this.searchChenge} autoComplete="off" />
            <button type="submit"><i className="fa fa-search" /></button>
            </form>
          </div>
          <div id ="navRightContainer">
            {
              user.isGuest ?
              <div className="loginContainer">
                <Link className = "navLink" to = "/login">Log In</Link>
                <Link className = "navLink" to = "/signUp">Sign Up</Link>
              </div>
              :
              <div className="logoutContainer">
                <h4>Welcome, {user.firstName} </h4>
              </div>
            }
          </div>
          <div className="cart-btn" onClick={ () => this.addClass()}>
              <span className="nav-icon" >
                  <i className="fas fa-cart-plus" />
              </span>
              <div className="cart-items">{cartItems ? cartItems.length : 0}</div>
          </div>
        </nav>
        <Cart hideClass={name} addClass={this.addClass} />
        <ul id="myUL" className={value !== '' ? '' : 'hidden'}>
          {
            choice === 'Books' ?
            books.map( book => {
              if (book.title.toUpperCase().indexOf(filter) > -1 && filter !== '') {
                  return (
                    <Link to={`/books/${book.id}`} key ={book.id} onClick={() => this.emtyValue(book.id)} >{book.title}</Link>
                  )
                }
              }) :
              choice === 'Author' ?
              authors.map( author => {
                if (author.firstName.toUpperCase().indexOf(filter) > -1 || author.lastName.toUpperCase().indexOf(filter) > -1 && filter !== '') {
                    return (
                      <Link to ="/books" key ={author.id} onClick={() => this.emtyValue(author.id, choice)} >{author.firstName} {author.lastName}</Link>
                    )
                  }
                }) :
                genre.map( element => {
                  if (element.name.toUpperCase().indexOf(filter) > -1 && filter !== '') {
                      return (
                        <Link to="/books" key ={element.id} onClick={() => this.emtyValue(element.id, choice)} >{element.name}</Link>
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
({books, items, user}) => {return {
  books: books.books,
  cartItems: items.cartItems,
  authors: books.authors,
  genre: books.genre,
  user: user.user
}
},
(dispatch) => {return {
  getBook: () => dispatch(getBooks()),
  getAuthors: () => dispatch(getAuthors()),
  authorBooks: (id) => dispatch(getAuthorBooks(id)),
  getGenre: () => dispatch(getGenre()),
  genreBooks: (id) => dispatch(getGenreBooks(id)),
  getSingelbook: (id) => dispatch(singleBook(id))
}}
)(NavBar)
