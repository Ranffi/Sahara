
import React, { Component } from 'react'
import { connect } from 'react-redux'
import {singleBook} from '../redux/books'
import {addCartItem} from '../redux/items'

class SingleBook extends Component{
    constructor(){
        super();
        this.state = {
          book: '',
          firstName: '',
          lastName: '',
          itemsArr: []
        }
    }

   async componentDidMount(){
       await this.props.getbook(this.props.match.params.id)
    }
    componentDidUpdate(){
        if (this.state.book === '' || this.state.itemsArr.length !== this.props.cartItems.length){
            const arr = this.props.cartItems.map(item => {
                return item.book.id
              })
            this.setState({
                book: this.props.book,
                firstName: this.props.book.author.firstName,
                lastName: this.props.book.author.lastName,
                itemsArr: arr })
        }
    }

    render(){
        const {itemsArr} = this.state
        const {book, user} = this.props
        const {firstName, lastName} = this.state;
        if (!book) return (<div>Loading...</div>)
        return (
            <div className="singleBookMain">
                <div className="singleBookContainer">
                    <div className="img-container">
                        <img src={book.coverImageUrl} alt="product" className="singleBook-img" />
                    </div>
                    <div>
                        <h3>{book.title}</h3>
                        <h4>by: {firstName} {lastName}</h4>
                        <h3>${book.price && book.price.toFixed(2)}</h3>
                        {
                        itemsArr.indexOf(book.id) === -1 ?
                          // eslint-disable-next-line react/button-has-type
                        <button className="bag-btn-sigleBook"  data-id={book.id} onClick={() => this.props.item( book.id, user.id)}>
                         {/* eslint-disable-next-line react/jsx-child-element-spacing */}
                        <i className="fas fa-shopping-cart" />
                        Add To Cart
                        </button> :
                          // eslint-disable-next-line react/button-has-type
                        <button className="bag-btn-sigleBook"  data-id={book.id}>
                         {/* eslint-disable-next-line react/jsx-child-element-spacing */}
                        <i className="fas fa-shopping-cart" />
                        In Cart
                        </button>
                    }
                    </div>
                </div>
                    Overview
                    <div className="singleBook-description">
                    <p>{book.description}</p>
                    </div>
            </div>
        )
    }
}

export default connect(
    ({books, items, user}) => ({
        book: books.book,
        cartItems: items.cartItems,
        user: user.user
      }),
      (dispatch) => ({
        getbook: (id) => dispatch(singleBook(id)),
        item: (bookId, userId) => dispatch(addCartItem(bookId, userId))
      })
)(SingleBook)

