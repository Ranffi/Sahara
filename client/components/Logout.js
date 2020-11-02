import axios from 'axios';
import React, {Component} from 'react';
import {getUser, getCartItems} from '../redux/store'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

class Logout extends Component{
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit(){
    await axios.post('/api/logout')
    await this.props.getUser();
    await this.props.items(this.props.user.id)
    this.props.addClass()
  }

  render(){
    return (
      <ul> <Link to="/" onClick={() => this.handleSubmit()}>Log out</Link> </ul>
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
    getUser: () => dispatch(getUser()),
    items: (id) => dispatch(getCartItems(id))
  }
}
)(Logout)
