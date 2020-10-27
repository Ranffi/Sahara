
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { singleBook } from '../redux/store'

class SingleBook extends Component{

    componentDidMount(){
        this.props.getbook(this.props.match.params.id)
    }

    render(){
        const {book} = this.props
        return (
            <div className="singleBookMain">
                <div className="singleBookContainer">
                    <div className="img-container">
                        <img src={book.coverImageUrl} alt="product" className="singleBook-img" />
                    </div>
                    <div>
                        <h3>{book.title}</h3>
                        <h4>by: Author</h4>
                        <h3>${book.price}</h3>
                        <button className="bag-btn-sigleBook"  data-id={book.id}>
                        <i className="fas fa-shopping-cart" />
                        add to cart
                        </button>
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
    ({book}) => ({
        book
      }),
      (dispatch) => ({
        getbook: (id) => dispatch(singleBook(id))
      })
)(SingleBook)

