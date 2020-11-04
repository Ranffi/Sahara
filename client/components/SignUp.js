import axios from 'axios';
import React, {Component} from 'react';
import validate from 'validate.js'
import { connect } from 'react-redux'

class SignUp extends Component{
  constructor() {
    super()
    this.state = {
      userName: '',
      password: '',
      email: '',
      streetAddress: '',
      city: '',
      state: '',
      zipCode: '',
      firstName: '',
      lastName: '',
      isGuest: false

    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value
    })
  }

  async handleSubmit(ev){
    ev.preventDefault()
    //Validate if email is an email address
    const constraints = {
      from: {
        email: true
      }
    }
    const validation = validate({from: this.state.email}, constraints)
    if (validation !== undefined){ alert('You did not enter a valid email') }
    else {
      const {data} = await axios.post('/api/address', this.state)
      await axios.put(`/api/users/${this.props.id}`, {...this.state, shippingAddressId: data.id})

      this.setState({
        userName: '',
        password: '',
        email: '',
        streetAddress: '',
        city: '',
        state: '',
        zipCode: '',
        firstName: '',
        lastName: '',
        isGuest: false
      })
      this.props.getUser();
      this.props.history.push('/books')
    }
  }

  render(){
    const {handleChange, handleSubmit} = this;
    const usStates = [ 'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY' ]
    return (
      <>
        <h2>
          Create Your Account
        </h2>
        <form onSubmit = {handleSubmit} id = "signUpForm">
          <div id = "signUpUserInfo">
          <label htmlFor = "firstName" className = "signUpLabel">First Name:</label>
            <input name = "firstName" className = "signUpInput" onChange = {handleChange} value = {this.state.firstName} />

            <label htmlFor = "lastName" className = "signUpLabel">Last Name:</label>
            <input name = "lastName" className = "signUpInput" onChange = {handleChange} value = {this.state.lastName} />

            <label htmlFor = "userName" className = "signUpLabel">User Name:</label>
            <input name = "userName" className = "signUpInput" onChange = {handleChange} value = {this.state.userName} />

            <label htmlFor = "password" className = "signUpLabel">Password:</label>
            <input name = "password" type="password"  className = "signUpInput" onChange = {handleChange} value = {this.state.password} />

            <label htmlFor = "email" className = "signUpLabel">Email:</label>
            <input name = "email" className = "signUpInput" onChange = {handleChange} value = {this.state.email} />
          </div>
          <div id = "signUpAddress">
            <label htmlFor = "streetAddress" className = "signUpLabel">Street Address:</label>
            <input name = "streetAddress" className = "signUpInput" onChange = {handleChange} value = {this.state.streetAddress} />

            <label htmlFor = "city" className = "signUpLabel">City:</label>
            <input name = "city" className = "signUpInput" onChange = {handleChange} value = {this.state.city} />

            <label htmlFor = "state" className = "signUpLabel">State:</label>
            <select name="state" className = "signUpDrop" onChange = {handleChange}>
            {
              usStates.map(state => {
                return (
                  <option value = {state} key = {state}>{state}</option>
                )
              })
            }
            </select>

            <label htmlFor = "zipCode" className = "signUpLabel">Zip Code:</label>
            <input name = "zipCode" className = "signUpInput" onChange = {handleChange} value = {this.state.zipCode} />
          </div>
          <button type = "submit" id = "signUpSubmit">Create Account</button>

        </form>
      </>

    )
  }

}

export default connect(
  ({user}) => {
    return {
      user: user.user
    }
  },
  null
)(SignUp)
