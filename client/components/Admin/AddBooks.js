import axios from 'axios';
import {connect} from 'react-redux';
import React, {Component} from 'react';
import { toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

class AddBooks extends Component{
  constructor() {
    super()
    this.state = {
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
      genreId: 1
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(ev) {
    const value = ev.target.type === 'checkbox' ? ev.target.checked : ev.target.value;
    this.setState({
      [ev.target.name]: value
    })
  }

  async handleSubmit(ev){
    ev.preventDefault()
 console.log(this.state.genreId);

    await axios.post(`/api/books`, {...this.state})
    toast.success('Book successfully added');

    this.setState({
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
      genreId: 1
    })

  }

  render(){
    const {handleChange, handleSubmit} = this;
    const { title, authorFirstName, authorLastName, price, description, coverImageUrl, quantityInStock, rating, featured, onSale, genreId } = this.state

    return (
      <div>
        <form onSubmit = {handleSubmit} >
        <div id = "signUpUserInfo">
          <label htmlFor = "title" className = "signUpLabel">Title:</label>
          <input name = "title" className = "signUpInput" onChange = {handleChange} value = {title} required />

          <label htmlFor = "authorFirstName" className = "signUpLabel">Author First Name:</label>
          <input name = "authorFirstName" className = "signUpInput" onChange = {handleChange} value = {authorFirstName} required />

          <label htmlFor = "authorLastName" className = "signUpLabel">Author Last Name:</label>
          <input name = "authorLastName" className = "signUpInput" onChange = {handleChange} value = {authorLastName} required />

          <div className="input-icon">
            <label htmlFor = "price" className = "signUpLabel">Price:</label>
            <input name = "price" className = "signUpInput" onChange = {handleChange} value = {price} required />
            <i>$</i>
          </div>
          <label htmlFor = "title" className = "rating">Genre:</label>
          <select name="genreId" id="ganreList" onChange={handleChange}>
            {
              this.props.genre.map( genr => {
                  return (<option value={genr.id} key={genr.id}>{genr.name}</option>)
              })
            }
          </select>
          <label htmlFor = "coverImageUrl" className = "signUpLabel">Image URL:</label>
          <input name = "coverImageUrl" className = "signUpInput" onChange = {handleChange} value = {coverImageUrl} required />

          <div className="adminCloseEnded adminNums">
            <label htmlFor = "quantityInStock" className = "signUpLabel">In stock:</label>
            <input name = "quantityInStock" id="inStock" type="number" min="0" step="1" className = "signUpInput" onChange = {handleChange} value = {quantityInStock} required />

            <label htmlFor = "title" className = "rating">Rating (1-5):</label>
            <input name = "rating" type="number" min="1" max="5" step="1" className = "signUpInput" onChange = {handleChange} value = {rating} required />
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
          <button type = "submit" id = "signUpSubmit">Add Book</button>
        </form>
      </div>
    )
  }

}

export default connect(
  ({books}) => ({
    genre: books.genre
  }),
  null
)(AddBooks);
