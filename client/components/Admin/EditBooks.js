import axios from 'axios';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import { singleBook, updateBook, deleteBook, getBooks} from '../../redux/books';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
toast.configure()

class EditBooks extends Component{
  constructor() {
    super()
    this.state = {
      id: 0,
      title: '',
      authorFirstName: '',
      authorLastName: '',
      price: '',
      description: '',
      coverImageUrl: '',
      quantityInStock: 1,
      rating: 3,
      featured: false,
      onSale: false,
      genreId: 0
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeBook = this.changeBook.bind(this);
    this.changeGenre = this.changeGenre.bind(this);
    this.deleteBook = this.deleteBook.bind(this)
  }

  handleChange(ev) {
    const value = ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value;
    this.setState({
      [ev.target.name]: value
    })
  }

  async handleSubmit(ev){
    ev.preventDefault()
    await this.props.updateBook({...this.state})
    toast.success(`${this.state.title} updated!`)
  }

  async changeBook(ev) {
    await this.props.getBook(ev.target.value)
    const {id, author, title, price, description, coverImageUrl, quantityInStock, rating, featured, onSale, genreId} = this.props.book
    this.setState({
        id,
        title,
        authorFirstName: author.firstName,
        authorLastName: author.lastName,
        price,
        description,
        coverImageUrl,
        quantityInStock,
        rating,
        featured,
        onSale,
        genreId
    })
  }
  deleteBook(id){
    this.props.deleteBook(id)
    this.props.getAllBooks()
    toast.success(`${this.state.title} deleted!`)
    this.setState({
      id: 0,
      title: '',
      authorFirstName: '',
      authorLastName: '',
      price: '',
      description: '',
      coverImageUrl: '',
      quantityInStock: 1,
      rating: 3,
      featured: false,
      onSale: false,
      genreId: 0
    })
  }
  changeGenre(ev){
    this.setState({genreId: ev.target.value * 1})
  }

  render(){
    const {handleChange, handleSubmit} = this;
    const { title, authorFirstName, authorLastName, price, description, coverImageUrl, quantityInStock, rating, featured, onSale, genreId} = this.state
    return (
      <div>
        <br />
        <select name="bookList" id="bookList" onChange={this.changeBook}>
            {this.props.books.map( book => {
                return (<option value={book.id} key={book.id}>{`${book.title}`}</option>)
            })}
        </select>
        <hr />
        <form onSubmit = {handleSubmit} >
        <div id = "signUpUserInfo">
          <label htmlFor = "title" className = "signUpLabel">Title:</label>
          <input name = "title" className = "signUpInput" onChange = {handleChange} value = {title} />

          <label htmlFor = "authorFirstName" className = "signUpLabel">Author First Name:</label>
          <input name = "authorFirstName" className = "signUpInput" onChange = {handleChange} value = {authorFirstName} />

          <label htmlFor = "authorLastName" className = "signUpLabel">Author Last Name:</label>
          <input name = "authorLastName" className = "signUpInput" onChange = {handleChange} value = {authorLastName} />

          <div className="input-icon">
            <label htmlFor = "price" className = "signUpLabel">Price:</label>
            <input name = "price" className = "signUpInput" onChange = {handleChange} value = {price} />
            <i>$</i>
          </div>
          <label htmlFor = "title" className = "rating">Genre:</label>
          <select name="ganreList" id="ganreList" onChange={this.changeGenre}>
            { this.props.genre.map( genr => {
              if (genr.id === genreId){
                return (<option value={genr.id} key={genr.id} selected>{genr.name}</option>)
              } else {
                return (<option value={genr.id} key={genr.id}>{genr.name}</option>)
                }
            })}
          </select>
          <label htmlFor = "coverImageURL" className = "signUpLabel">Image URL:</label>
          <input name = "coverImageURL" className = "signUpInput" onChange = {handleChange} value = {coverImageUrl} />

          <div className="adminCloseEnded adminNums">
            <label htmlFor = "quantityInStock" className = "signUpLabel">In stock:</label>
            <input name = "quantityInStock" id="inStock" type="number" min="0" step="1" className = "signUpInput" onChange = {handleChange} value = {quantityInStock} />

            <label htmlFor = "title" className = "rating">Rating (1-5):</label>
            <input name = "rating" type="number" min="1" max="5" step="1" className = "signUpInput" onChange = {handleChange} value = {rating} />
          </div>
          <div className="adminCloseEnded adminChecks">
            <input name = "featured" type="checkbox" className = "signUpInput" onChange = {handleChange} checked={featured} />
            <label htmlFor = "featured" className = "signUpLabel">Featured</label>

            <input name = "onSale" type="checkbox" className = "signUpInput" onChange = {handleChange} checked={onSale} />
            <label htmlFor = "onSale" className = "signUpLabel">On Sale</label>

          </div>

          <label htmlFor = "description" className = "signUpLabel">Description:</label>
          <textarea name = "description" className = "signUpInput" onChange = {handleChange} value = {description} />
        </div>
          <button type = "submit" id = "editBook">Edit Book</button>
        </form>
        <button className='deleteBookBtn' onClick={() => this.deleteBook(this.state.id)}>Delete Book</button>
      </div>
    )
  }
}

export default connect(
    ({books}) => ({
        book: books.book,
        books: books.books,
        genre: books.genre
      }),
      (dispatch) => ({
        getAllBooks: () => dispatch(getBooks()),
        getBook: (id) => dispatch(singleBook(id)),
        updateBook: (id) => dispatch(updateBook(id)),
        deleteBook: (id) => dispatch(deleteBook(id))
      })
)(EditBooks);
