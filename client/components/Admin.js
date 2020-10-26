import axios from 'axios';
import {connect} from 'react-redux';
import React, {Component} from 'react';

class Admin extends Component{
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

    //const newUser = await axios.post('/api/users', this.state)
    this.setState({
        userName: '',
        password: '',
        email: ''
    })
  }

  render(){
    const {handleChange, handleSubmit} = this;
    console.log('this should be the user', this.props.user)
    return (
      <div>
        <h2>
          Create Your Account
        </h2>
        <form onSubmit = {handleSubmit}>
          <label>User Name:</label>
          <input name = 'userName' onChange = {handleChange} value = {this.state.userName} />

          <label>Password:</label>
          <input name = 'password' onChange = {handleChange} value = {this.state.password} />

          <label>Email:</label>
          <input name = 'email' onChange = {handleChange} value = {this.state.email} />

          <button type = 'submit'>Create Account</button>
        </form>
      </div>
    )
  }

}

export default connect(
  ({user})=>({
    user
  }),
  null
)(Admin);
