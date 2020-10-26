import React,{Component} from 'react';
import {connect} from "react-redux"
import {getBooks, addCartItem,getCartItems} from "../redux/store"
import {Link} from "react-router-dom"
class Books extends Component{
  constructor(){
    super();
    this.state = {
      itemsArr:[]
    }
    this.addToCart = this.addToCart.bind(this)
  }

  componentDidMount(){
    this.props.Books()
    this.props.itemsOnCart()
  }
  componentDidUpdate(){
    if(this.state.itemsArr.length !== this.props.cartItems.length){
      const arr= this.props.cartItems.map(item=>{
        return item.book.id
      })
      this.setState({itemsArr:arr})
    }
  }
  addToCart(bookId){
    this.props.item(bookId)
  }

  render(){
    const { itemsArr }=this.state
    const {books,cartItems}=this.props

    
    return (
    <div className="products-center">
      {
        books.map(book=>{
          return (
            <div className="bookContainer" key={book.id}>
              <div className="img-container">
              <Link to={`/books/${book.id}`}> <img src={book.coverImageUrl} alt="product" className="book-img"/></Link>
                   
                  {
                    itemsArr.indexOf(book.id) === -1 ? 
                    <button className="bag-btn"  data-id={book.id} onClick={()=>this.addToCart(book.id)}>
                    <i className="fas fa-shopping-cart"></i>
                    add to cart
                    </button>: <button className="in-bag-btn"  data-id={book.id} >
                    <i className="fas fa-shopping-cart"></i>
                    in cart
                    </button>
                  }
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
  ({books,cartItems})=>({
    books,
    cartItems
  }),
  (dispatch)=>({
    Books: ()=>dispatch(getBooks()),
  itemsOnCart: ()=> dispatch(getCartItems()),
  item: (bookId)=>dispatch(addCartItem(bookId))
  })
)(Books);
