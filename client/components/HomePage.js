import React from 'react';
import { connect } from 'react-redux'
import { getBooks } from '../redux/books'
import { Link } from 'react-router-dom'
import Footer from './Footer'
import {addCartItem} from '../redux/items'

class HomePage extends React.Component {

 componentDidMount() {
    window.scrollTo(0, 0)
  }
  render() {
      const {user} = this.props
    if (!this.props.books) return (<div>Loading...</div>)
    return (
      <div>
        <div className="picDiv home">
          <img className="pic" src="b7b36c8a-57d4-4463-80f4-93d66a362a38_200x200.png" />
        </div>
        <h1 className="bestSellerH2">Best Sellers</h1>
        <p className="bestSeller">From New York Times to International Best Sellers</p>
        <div className = "borderTop">
        <div className="homePageCon">
          {
            this.props.books.filter(book => book.featured).map(book => {
              return (
                <div className="bookContainer" key={book.id}>
                  <div className="img-container">
                    <Link to={`/books/${book.id}`}> <img src={book.coverImageUrl} alt="product" className="book-img" /></Link>
                    <button className="bag-btn" data-id={book.id} onClick={ () => this.props.item( book.id, user.id)}>
                      <i className="fas fa-shopping-cart" />
                  add to cart
                    </button>
                  </div>
                  <h3>{book.title}</h3>
                  <h4>by: {book.author.firstName} {book.author.lastName}</h4>
                  <h3>${book.price.toFixed(2)}</h3>
                </div>
              )
            })
          }
        </div>
        </div>
        <h1 className="bestSellerH2">On Sale</h1>
        <p className="bestSeller">Amazing reads at even better prices</p>
          <div className = "borderTop">
        <div className="homePageCon">
          {
            this.props.books.filter(book => book.onSale).map(book => {
              return (
                <div className="bookContainer" key={book.id}>
                  <div className="img-container">
                    <Link to={`/books/${book.id}`}> <img src={book.coverImageUrl} alt="product" className="book-img" /></Link>
                    <button className="bag-btn" data-id={book.id} onClick={() => this.props.item( book.id, user.id)}>
                      <i className="fas fa-shopping-cart" />
                  add to cart
                    </button>
                  </div>
                  <h3>{book.title}</h3>
                  <h4>by: {book.author.firstName} {book.author.lastName}</h4>
                  <h3><span>${(book.price * 0.5).toFixed(2)}</span> <span className = "onSale">${book.price.toFixed(2)}</span></h3>
                </div>
              )
            })
          }
        </div>

          </div>
          <Footer />
      </div>
    )

  }
}

export default connect(
  ({ books, user }) => ({
    books: books.books,
    user: user.user
  }),
  (dispatch) => ({
    item: (bookId, userId) => dispatch(addCartItem(bookId, userId))
  })
)(HomePage);
