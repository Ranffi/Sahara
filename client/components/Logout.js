import axios from 'axios';
import React, {Component} from 'react';
import {logoutUser } from '../redux/user';
import {getCartItems} from '../redux/items'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

class Logout extends Component{
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit(){
    await this.props.logoutUser()
    await this.props.items(this.props.user.id)
    // this.props.addClass()
  }

  render(){
    return (
      <ul> <Link to="/" onClick={() => this.handleSubmit()}>Log out</Link> </ul>
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
    logoutUser: () => dispatch(logoutUser()),
    items: (id) => dispatch(getCartItems(id))
  }
}
)(Logout)
