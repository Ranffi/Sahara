
import React, { Component } from "react"
import { connect } from "react-redux"
import { singleBook } from "../redux/store"

class SingleBook extends Component{
    constructor(){
        super();
        this.state = {
          book:''
        }
    }

    componentDidMount(){
        this.props.getbook(this.props.match.params.id)  
    }
    componentDidUpdate(){
        if(this.state.book === ""){
            this.setState({book:this.props.book})
            console.log('????', this.state.book.author);
        }
    }

    render(){
        const {book}=this.props
        console.log('---===---', this.state.book.author);
        return (
            <div className="singleBookMain">
                <div className="singleBookContainer">
                    <div className="img-container">
                        <img src={book.coverImageUrl} alt="product" className="singleBook-img"/>  
                    </div>
                    <div>
                        <h3>{book.title}</h3>
                        <h4>by: </h4>
                        <h3>${book.price}</h3>
                        <button className="bag-btn-sigleBook"  data-id={book.id}>
                        <i className="fas fa-shopping-cart"></i>
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
    ({book})=>({
        book
      }),
      (dispatch)=>({
        getbook: (id)=>dispatch(singleBook(id))
      })
)(SingleBook)





     