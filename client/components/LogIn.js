import axios from 'axios';
import React, {Component} from 'react';
import {getUser} from '../redux/store'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'


class LogIn extends Component{
  constructor() {
    super()
    this.state = {
      userName: '',
      password: ''
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
    let res = await axios.post('/api/login', this.state)
    console.log('----->', res);

    this.setState({
    userName: '',
    password: ''
    })
    if (res){
      await this.props.getUser();
      this.props.history.push('/')
    } else {
      toast.error('Username Or Password is incorrect');
    }
  }

  render(){
    const {handleChange, handleSubmit} = this;
    return (
      <>
        <h2>
          Log In Page
        </h2>
        <form onSubmit = {handleSubmit} id = "logInForm">
          <label>User Name:</label>
          <input name ="userName" className = "logInInput" onChange = {handleChange} value = {this.state.userName} />

          <label>Password:</label>
          <input name ="password" className = "logInInput" onChange = {handleChange} value = {this.state.password} />

          <button type ="submit" id = "logInButton" >Log In</button>

        </form>
      </>

    )
  }

}

export default connect(
  ({user}) => {return {
      user
    }
  },
  (dispatch) => {
    return {
    getUser: () => dispatch(getUser())
  }
}
)(LogIn)
