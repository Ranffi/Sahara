import axios from 'axios';
import React, {Component} from 'react';
import {logoutUser } from '../redux/user';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

class Logout extends Component{
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit(){
    await this.props.logoutUser()
  }

  render(){
    return (
       <Link to="/" onClick={() => this.handleSubmit()}><ul>Log out </ul></Link>
    )
  }

}

export default connect(
  ({user}) => {return {
    user: user.user
    }
  },
  (dispatch) => {
    return {
    logoutUser: () => dispatch(logoutUser())
  }
}
)(Logout)
