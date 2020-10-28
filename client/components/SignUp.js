import axios from 'axios';
import React, {Component} from 'react';
import validate from 'validate.js'
import {getUser} from '../redux/store'
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
      isGuest: false

    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // async verifyUserNameisUnique({userName}){
  //   console.log('hello')
  //   const user = await axios.get(`/api/users/${userName}`)
  //   console.log(user)
  //   if(user){return true}
  //   return false;
  // }

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
    if (validation !== undefined){alert('You did not enter a valid email')}
    //validate that username is not already taken
    // else if(!this.verifyUserNameisUnique(this.state.userName)){
    //   alert('The username you entered is already taken.  Please try again')
    // }
    else {
      const {data} = await axios.post('/api/address', this.state)
      await axios.post('/api/users', {...this.state, shippingAddressId: data.id})

      this.setState({
        userName: '',
        password: '',
        email: '',
        streetAddress: '',
        city: '',
        state: '',
        zipCode: ''
      })

      this.props.getUser();
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
            <label htmlFor = "userName" className = "signUpLabel">User Name:</label>
            <input name = "userName" className = "signUpInput" onChange = {handleChange} value = {this.state.userName} />

            <label htmlFor = "password" className = "signUpLabel">Password:</label>
            <input name = "password" className = "signUpInput" onChange = {handleChange} value = {this.state.password} />

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
  null,
  (dispatch) => {
    return {
    getUser: () => dispatch(getUser())
  }
}
)(SignUp)
