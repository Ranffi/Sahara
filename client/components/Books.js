import React, {Component} from 'react';
import {connect} from 'react-redux'
import {getBooks, addCartItem} from '../redux/store'
import {Link} from 'react-router-dom'
class Books extends Component{
  constructor(){
    super();
    this.state = {

    }
    this.addToCart = this.addToCart.bind(this)
  }

  componentDidMount(){
    this.props.Books()
  }

  addToCart(bookId){
    this.props.item(bookId)
  }

  render(){
    const {books} = this.props
    return (
    <div className="products-center">
      {
        books.map(book => {
          return (
            <div className="bookContainer" key={book.id}>
              <div className="img-container">
              <Link to={`/books/${book.id}`}> <img src={book.coverImageUrl} alt="product" className="book-img" /></Link>
                  <button className="bag-btn"  data-id={book.id} onClick={() => this.addToCart(book.id)}>
                  <i className="fas fa-shopping-cart" />
                  add to cart
                  </button>
              </div>
                <h3>{book.title}</h3>
                <h4>by: {book.author.firstName} {book.author.lastName}</h4>
                <h3>${book.price}</h3>
            </div>
          )
        })
      }
    </div>
  )
}
}

export default connect(
  ({books}) => ({
    books
  }),
  (dispatch) => ({
    Books: () => dispatch(getBooks()),
    item: (bookId) => dispatch(addCartItem(bookId))
  })
)(Books);
