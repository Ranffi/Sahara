import axios from 'axios';
import React, {Component} from 'react';
import {getUser,getCartItems} from '../redux/store'
import { connect } from 'react-redux'

class Logout extends Component{
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit(){
    await axios.post('/api/logout')
    this.props.getUser()
    await this.props.getUser();
    await this.props.items(this.props.user.id)
    this.props.addClass()
  }

  render(){
    return (
          <ul onClick={() => this.handleSubmit()}> Log out</ul>
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
