import axios from 'axios';
import React, {Component} from 'react';
import validate from 'validate.js'

class SignUp extends Component{
  constructor() {
    super()
    this.state = {
      userName: '',
      password: '',
      email: '',

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
    if(validation !== undefined){alert('You did not enter a valid email')}
    //validate that username is not already taken
    // else if(!this.verifyUserNameisUnique(this.state.userName)){
    //   alert('The username you entered is already taken.  Please try again')
    // }
    else{
      const newUser = await axios.post('/api/users', this.state)
      this.setState({
        userName: '',
        password: '',
        email: ''
      })
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
        <form onSubmit = {handleSubmit}>
          <label for = "userName">User Name:</label>
          <input name = "userName" onChange = {handleChange} value = {this.state.userName} />

          <label for = "password">Password:</label>
          <input name = "password" onChange = {handleChange} value = {this.state.password} />

          <label htmlFor = "email">Email:</label>
          <input name = "email" onChange = {handleChange} value = {this.state.email} />

          <label htmlFor = "streetAddress">Street Address:</label>
          <input name = "streetAddress" onChange = {handleChange} value = {this.state.streetAddress} />

          <label htmlFor = "city">City:</label>
          <input name = "city" onChange = {handleChange} value = {this.state.city} />

          <label htmlFor = "state">State:</label>
          {
            usStates.map(state => {
              console.log(state)
            })
          }
          <select name="cars" id="cars" />

          <label htmlFor = "zipCode">Zip Code:</label>
          <input name = "zipCode" onChange = {handleChange} value = {this.state.zipCode} />

          <button type = "submit">Create Account</button>

        </form>
      </>

    )
  }

}

export default SignUp
