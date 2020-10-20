import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class SignUp extends Component{
  constructor() {
    super()
    this.state = {
      userName: '',
      password: '',
      email: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(ev) {
    this.setState({
      [ev.target.name]: ev.target.value
    })
  }

  handleSubmit(ev){
    ev.preventDefault()
    console.log('submitted')
  }

  render(){
    const {handleChange, handleSubmit} = this;
    return (
      <>
        <h1>
          Create Your Account
        </h1>
        <form onSubmit = {handleSubmit}>
          <label>User Name:</label>
          <input name = 'userName' onChange = {handleChange}/>

          <label>Password:</label>
          <input name = 'password' onChange = {handleChange}/>

          <label>Email:</label>
          <input name = 'email' onChange = {handleChange}/>

          <button type = 'submit'>Create Account</button>

        </form>
      </>

    )
  }

}

export default SignUp
