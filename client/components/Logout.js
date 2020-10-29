import axios from 'axios';
import React, {Component} from 'react';
import {getUser} from '../redux/store'
import { connect } from 'react-redux'

class Logout extends Component{
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async handleSubmit(ev){
    ev.preventDefault()
    const newUser = await axios.post('/api/logout')
    this.props.getUser()
    console.log('xxxxxxxxxxxxxxxx', newUser);
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
  null,
  (dispatch) => {
    return {
    getUser: () => dispatch(getUser())
  }
}
)(Logout)
