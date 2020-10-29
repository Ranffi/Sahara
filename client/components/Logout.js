import axios from 'axios';
import React, {Component} from 'react';
import {getUser,getCartItems} from '../redux/store'
import { connect } from 'react-redux'

class Logout extends Component{
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit(ev){
    ev.preventDefault()
    await axios.post('/api/logout')
    this.props.getUser()
    await this.props.getUser();
    await this.props.items(this.props.user.id)
  }

  render(){
    const {handleSubmit} = this;
    return (
      <div>
        <h2>Log out!</h2>
        <form onSubmit = {handleSubmit}>
          <button type ="submit">Log out</button>
        </form>
      </div>

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
