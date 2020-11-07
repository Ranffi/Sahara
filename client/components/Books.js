import React, {Component} from 'react';
import {connect} from 'react-redux'
import {getBooks} from '../redux/books'
import {getUser } from '../redux/user';
import {getCartItems, addCartItem} from '../redux/items'
import {Link} from 'react-router-dom'
class Books extends Component{

  componentDidMount(){
    // this.props.Books()
    window.scrollTo(0, 0)
  }

  render(){
    const {books, user, cartItems} = this.props
    return (
    <div className="products-center">
      {
        books.map(book => {
          return (
            <div className="bookContainer" key={book.id}>
              <div className="img-container">
              <Link to={`/books/${book.id}`}> <img src={book.coverImageUrl} alt="product" className="book-img" /></Link>
                  {
                    cartItems.map(item => item.bookId).indexOf(book.id) === -1 ?
                    // eslint-disable-next-line react/button-has-type
                    <button className="bag-btn"  data-id={book.id} onClick={() => this.props.item( book.id, user.id)}>
                    {/* eslint-disable-next-line react/jsx-child-element-spacing */}
                    <i className="fas fa-shopping-cart" />
                    add to cart
                    </button> :
                    // eslint-disable-next-line react/button-has-type
                    <button className="in-bag-btn"  data-id={book.id} >
                      {/* eslint-disable-next-line react/jsx-child-element-spacing */}
                      <i className="fas fa-shopping-cart" />
                      in cart
                    </button>
                  }
              </div>
                <h3>{book.title}</h3>
                <h4>by: {book.author.firstName} {book.author.lastName}</h4>
                <h3>${book.price.toFixed(2)}</h3>
            </div>
          )
        })
      }
    </div>
  )
}
}

export default connect(
  ({books, items, user}) => ({
    books: books.books,
    cartItems: items.cartItems,
    user: user.user
  }),
  (dispatch) => ({
    Books: () => dispatch(getBooks()),
    itemsOnCart: (id) => dispatch(getCartItems(id)),
    getUser: () => dispatch(getUser()),
    item: (bookId, userId) => dispatch(addCartItem(bookId, userId))
  })
)(Books);
